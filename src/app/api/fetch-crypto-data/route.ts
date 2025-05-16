import { NextRequest } from 'next/server';
import axios from 'axios';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};
const CACHE_REFRESH = 60 * 60 * 1000; // 1 hour refresh threshold

// Adding this to handle rate-limiting
async function retryRequest(retries: number, delay: number, cryptoIds: string[], vsCurrency: string) {
    const cacheKey = `${vsCurrency}-${cryptoIds.sort().join(',')}`;
    
    const cacheEntry = cache[cacheKey];
    const now = Date.now();
    
    if (cacheEntry && (now - cacheEntry.timestamp < CACHE_REFRESH)) {
        console.log('Returning cached data (less than 1 hour old)');
        return { data: cacheEntry.data };
    }
    
    console.log('Cache missing or older than 1 hour - fetching fresh data');
    return await fetchFreshData(cacheKey, retries, delay, cryptoIds, vsCurrency);
}

async function fetchFreshData(cacheKey: string, retries: number, delay: number, 
    cryptoIds: string[], vsCurrency: string) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
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
        const { cryptoAmount, cryptoSymbol, fiatSymbol } = await req.json();

        if (!cryptoAmount || !cryptoSymbol || !fiatSymbol) {
            return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400 });
        }

        const cryptoIds = Array.isArray(cryptoSymbol) ? cryptoSymbol : [cryptoSymbol];
        const retries = 3;
        const delay = 5000;
        const response = await retryRequest(retries, delay, cryptoIds, fiatSymbol.toLowerCase());

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