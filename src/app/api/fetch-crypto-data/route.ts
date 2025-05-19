import { NextRequest } from 'next/server';
import axios from 'axios';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};
const CACHE_REFRESH = 60 * 60 * 1000; // 1 hour refresh threshold

interface CryptoDataItem {
    id: string;
    asset: string;
}

// Adding this to handle rate-limiting
async function retryRequest(retries: number, delay: number, cryptoData: CryptoDataItem[], vsCurrency: string) {
    // Extract IDs and sort them for consistent caching
    const cryptoIds = cryptoData.map(item => item.id).filter(Boolean).sort();
    const cacheKey = `${vsCurrency}-${cryptoIds.join(',')}`;
    
    const cacheEntry = cache[cacheKey];
    const now = Date.now();
    
    if (cacheEntry && (now - cacheEntry.timestamp < CACHE_REFRESH)) {
        console.log('Returning cached data (less than 1 hour old)');
        return { data: cacheEntry.data };
    }
    
    console.log('Cache missing or older than 1 hour - fetching fresh data');
    return await fetchFreshData(cacheKey, retries, delay, cryptoData, vsCurrency);
}

async function fetchFreshData(cacheKey: string, retries: number, delay: number, 
    cryptoData: CryptoDataItem[], vsCurrency: string) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            // Extract crypto IDs here, only at the time of the API call
            const cryptoIds = cryptoData.map(item => item.id).filter(Boolean);
            
            const apiKey = process.env.COINGECKO_API_KEY;
            const baseUrl = 'https://api.coingecko.com/api/v3/coins/markets';
            
            const response = await axios.get(baseUrl, {
                headers: apiKey ? {
                    'x-cg-demo-api-key': apiKey
                } : undefined,
                params: {
                    vs_currency: vsCurrency,
                    ids: cryptoIds.join(','),
                    symbols: cryptoIds.join(','),
                    order: 'id_asc',
                    include_tokens: 'all',
                    per_page: 100,
                    price_change_percentage: '24h',
                    locale: 'en',
                },
            });
            
            const totalTokensFetched = response.data.length;
            console.log(`Number of crypto tokens returned: ${totalTokensFetched}`);

            // Check if response contains all requested tokens and if they have prices
            const missingTokens = cryptoIds.filter(id => !response.data.some((item: { id: string }) => item.id === id));
            if (missingTokens.length > 0) {
                console.error(`Missing tokens in response: ${missingTokens.join(', ')}`);
            }
            const missingPrices = response.data.filter((item: { current_price: number }) => item.current_price == null);
            if (missingPrices.length > 0) {
                console.error(`Missing prices in response: ${missingPrices.map((item: { id: string }) => item.id).join(', ')}`);
            }

            // Get all the `asset` values from the tokens that are missing and the tokens with missing prices
            const missingAssets = cryptoData.filter(item => 
                missingTokens.includes(item.id) || 
                missingPrices.some((priceItem: { id: string }) => priceItem.id === item.id)
            ).map(item => item.asset);
            if (missingAssets.length > 0) {
                console.error(`Missing assets in response: ${missingAssets.join(', ')}`);
            }

            if (missingAssets.length > 0) {
                const cmcResults: Array<{
                    id: string;
                    symbol: string;
                    name: string;
                    current_price: number;
                    last_updated: string;
                    _source: string;
                }> = [];
                
                for (const asset of missingAssets) {
                    try {
                        const missingCryptoData = cryptoData.find(item => item.asset === asset);
                        if (!missingCryptoData) continue;

                        let cmcId = null;
                        switch (asset) {
                            case 'SOPH':
                                cmcId = '32087';
                                break;
                            case 'HYC':
                                cmcId = '27892';
                                break;
                            default:
                                break;
                        }

                        const cmcResponse = await axios.get('https://pro-api.coinmarketcap.com/v2/tools/price-conversion', {
                            headers: {
                                'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
                                'Accept': 'application/json',
                            },
                            params: {
                                amount: 1,
                                id: cmcId === null ? null : cmcId,
                                symbol: cmcId === null ? asset : null, 
                                convert: vsCurrency.toUpperCase(),
                            },
                        });

                        if (cmcResponse.data && cmcResponse.data.data) {
                            const cmcData = cmcResponse.data.data;
                            
                            // Handle case when cmcData is an array (multiple matches for the symbol)
                            const dataItems = Array.isArray(cmcData) ? cmcData : [cmcData];
                            
                            // Use the first matching item (most relevant)
                            for (const item of dataItems) {
                                const targetCurrency = vsCurrency.toUpperCase();
                                if (item.quote && item.quote[targetCurrency]?.price) {
                                    const price = item.quote[targetCurrency].price;
                                    
                                    const formattedData = {
                                        id: missingCryptoData.id,
                                        symbol: item.symbol.toLowerCase(),
                                        name: item.name,
                                        current_price: price,
                                        last_updated: item.last_updated,
                                        _source: 'coinmarketcap' // metadata to identify source
                                    };
                                    
                                    cmcResults.push(formattedData);
                                    console.log(`Added fallback price for ${asset} from CoinMarketCap`);
                                    break; // Use only the first valid result
                                }
                            }
                        }
                    } catch (error) {
                        if (axios.isAxiosError(error) && error.response?.status === 429) {
                            console.log(`Rate limit hit for CoinMarketCap. Retrying in ${delay}ms...`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                        } else {
                            console.error(`Error fetching data from CoinMarketCap for ${asset}:`, error);
                        }
                    }
                }
                
                // Append CoinMarketCap results to CoinGecko response
                if (cmcResults.length > 0) {
                    // Remove any entries in response.data that match the IDs we're adding from CMC, just in case
                    response.data = response.data.filter((item: { id: string }) => 
                        !cmcResults.some(cmcItem => cmcItem.id === item.id));
                    
                    response.data = [...response.data, ...cmcResults];
                    console.log(`Added ${cmcResults.length} tokens from CoinMarketCap fallback`);
                }
            }

            // Store in cache
            cache[cacheKey] = {
                data: response.data,
                timestamp: Date.now()
            };

            return response;

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                console.log(`Failed to fetch crypto market data. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }

    throw new Error('Failed after many retries');
}

export async function POST(req: NextRequest) {
    try {
        const { cryptoAmount, cryptoData, fiatSymbol } = await req.json();

        if (!cryptoAmount || !cryptoData || !fiatSymbol) {
            return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400 });
        }

        // Extract crypto IDs during the API call, not here
        const retries = 3;
        const delay = 5000;
        const response = await retryRequest(retries, delay, cryptoData, fiatSymbol.toLowerCase());

        const { data } = response;

        if (data && data.length > 0) {
            return new Response(
                JSON.stringify({ 
                    cryptoData: data,
                    fiatSymbol
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(JSON.stringify({ error: `Unable to find data for the requested cryptocurrencies in ${fiatSymbol}` }), { status: 500 });
        }
    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(JSON.stringify({ error: `Server error: Unable to process the request. ${error instanceof Error ? error.message : 'Unknown error'}` }), { status: 500 });
    }
}