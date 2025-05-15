"use client";

import { useEffect, useRef, useState } from "react";
import { data } from "./data";

const Explore: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cryptoDataFetched = useRef(false);

    useEffect(() => {
        if (cryptoDataFetched.current) {
            return;
        }
        fetchCryptoData();

    }, []);

    const fetchCryptoData = async () => {
    setIsLoading(true);
    
    try {
        const cryptoSymbol = data.map((item) => item.id);
            
        const cryptoAmount = 1;
        const fiatSymbol = 'usd';
        
        const response = await fetch(`/api/fetch-crypto-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cryptoAmount,
                cryptoSymbol,
                fiatSymbol
            }),
        });
    
        const result = await response.json();

        if (response.ok) {
            const cryptoPriceMap = result.cryptoData.reduce((acc: Record<string, { id: string; current_price: number }>, crypto: { id: string; current_price: number }) => {
                acc[crypto.id] = crypto;
                return acc;
            }, {});
            
            // Update data fetched from data.ts with current prices from API
            data.forEach((item) => {
                if (cryptoPriceMap[item.id]) {
                    item.price = `$${cryptoPriceMap[item.id].current_price.toFixed(2)}`;
                }
            });
            
            console.log(`Updated data:`, data);

            cryptoDataFetched.current = true;
        } else {
            console.error(`Failed to fetch data for crypto data:`, result.error);
        }
        
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching crypto data:", error.message);
        } else {
            console.error("Unknown error occurred while fetching crypto data");
        }
    } finally {
        setIsLoading(false);
    }
};

    return (
        <section id="/" className="explore bg-gray-900 min-h-screen flex flex-col items-center justify-center p-8 py-32">
            <div className="max-w-7xl mx-auto">
               <div
                    className="bg-[url('/cloud.png')] bg-cover bg-center bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-8 "
                >
                    <h2 className="text-6xl font-bold mb-4 text-teal">Explore</h2>
                    <p className="text-gray-300">
                        Ignite Network empowers users to participate in securing multiple blockchain while earning passive income. Explore a wide range of staking, nodes, and validator opportunities across top chains like NEAR and Ronin, among others. Our platform is built both for retail investors and institutions, offering easy delegation. Enjoy high-yield staking with low commission fees and institutional-grade security – so you earn more while your crypto assets remain safe.
                    </p>
                </div>
                <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left text-gray-300">
                            <thead className="bg-gray-700 text-teal-400 text-lg">
                                <tr>
                                    <th className="px-4 py-2">Asset</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">APY</th>
                                    <th className="px-4 py-2">Commission</th>
                                    <th className="px-4 py-2">Product</th>
                                    <th className="px-4 py-2">Ecosystem</th>
                                    <th className="px-4 py-2">Yield</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="px-4 py-2">{row.asset}</td>
                                        <td className="px-4 py-2">{isLoading ? 'Loading..' : row.price}</td>
                                        <td className="px-4 py-2">{row.apy}</td>
                                        <td className="px-4 py-2">{row.commission}</td>
                                        <td className="px-4 py-2">{row.product}</td>
                                        <td className="px-4 py-2">{row.ecosystem}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-teal-700 hover:bg-black text-white font-bold py-1 px-4 rounded">
                                                Stake
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Explore;