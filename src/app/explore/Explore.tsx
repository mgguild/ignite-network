"use client";

import { useEffect, useRef, useState } from "react";
// import { data } from "./data";
import ExploreMobile from "./ExploreMobile";
import Image from "next/image";

interface CryptoData {
    id: string;
    asset: string;
    logo: string;
    price?: string;
    apy?: string;
    commission?: string;
    product?: string;
    ecosystem?: string;
    ecosystemLink?: string;
    stakingLink?: string;
}

const Explore: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<CryptoData[]>([]);
    const [hasMounted, setHasMounted] = useState(false);
    const cryptoDataFetched = useRef(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (cryptoDataFetched.current) {
            return;
        }
        cryptoDataFetched.current = true;
        fetchCryptoData();
    });

    const fetchCryptoData = async () => {
        console.log(`Fetching crypto data...`);
        setIsLoading(true);
        
        
        try {
            const dbResponse = await fetch(`/api/fetch-crypto-data-from-db`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const dbResult = await dbResponse.json();
            console.log(`Fetched data from DB:`, dbResult);
            
            if (!dbResult.tokens || !Array.isArray(dbResult.tokens)) {
                throw new Error("Invalid data format received from database");
            }
            
            setData(dbResult.tokens);
            
            const cryptoAmount = 1;
            const fiatSymbol = 'usd';
            
            const response = await fetch(`/api/fetch-crypto-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cryptoAmount,
                    cryptoData: dbResult.tokens,
                    fiatSymbol,
                }),
            });
        
            const result = await response.json();

            if (response.ok) {
                const cryptoPriceMap = result.cryptoData.reduce((acc: Record<string, { id: string; current_price: number }>, crypto: { id: string; current_price: number }) => {
                    acc[crypto.id] = crypto;
                    return acc;
                }, {});
                
                setData(prevData => prevData.map(item => {
                    if (item.id && cryptoPriceMap[item.id]) {
                        if (cryptoPriceMap[item.id].current_price != null) {
                            return {
                                ...item,
                                price: `$${cryptoPriceMap[item.id].current_price.toFixed(2)}`
                            };
                        }
                    }
                    return {
                        ...item,
                    };
                }));
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

    if (!hasMounted) return null;

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (isMobile) return <ExploreMobile />;

    return (
        <section
            id="explore"
            className="explore bg-gray-900 min-h-screen flex flex-col items-center justify-center p-8 py-32 pt-46 "
        >
            <div className="max-w-7xl mx-auto">
                <div
                    className="bg-[url('/cloud.png')] bg-cover bg-center bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-8"
                >
                    <h2 className="text-6xl font-bold mb-4 text-teal">Explore</h2>
                    <p className="text-gray-300">
                        Ignite Network empowers users to participate in securing multiple blockchain while earning
                        passive income. Explore a wide range of staking, nodes, and validator opportunities across top
                        chains like NEAR and Ronin, among others. Our platform is built both for retail investors and
                        institutions, offering easy delegation. Enjoy high-yield staking with low commission fees and
                        institutional-grade security – so you earn more while your crypto assets remain safe.
                    </p>
                </div>
                <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
                    <div className="overflow-x-auto md:overflow-x-visible">
                        <table className="table-auto w-full text-center text-gray-300">
                            <thead className="bg-gray-700 text-teal-400 text-lg justify-start">
                                <tr>
                                    <th className="px-4 py-2">Asset</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">APY</th>
                                    <th className="px-4 py-2">Uptime</th>
                                    <th className="px-4 py-2">Product</th>
                                    <th className="px-4 py-2">Ecosystem</th>
                                    <th className="px-4 py-2">Yield</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="px-4 py-2 flex items-center">
                                            <Image
                                                src={
                                                    typeof row.logo === "string" && row.logo.trim().length > 0
                                                        ? row.logo
                                                        : "/placeholder.png"
                                                }
                                                alt={`${row.asset} logo`}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 mr-2"
                                            />
                                            {row.asset}
                                        </td>
                                    
                                        <td className="px-4 py-2">{isLoading ? "Loading" : row.price ? row.price : "-"}</td>
                                        <td className="px-4 py-2">{isLoading ? "Loading" : row.apy ? row.apy : "-"}</td>
                                        <td className="px-4 py-2">{isLoading ? "Loading" : row.commission ? row.commission : "-"}</td>
                                        <td className="px-4 py-2">
                                            <span className="bg-gray-700 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                                {row.product}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 flex items-center justify-center">
                                            <a href={row.ecosystemLink} target="_blank" rel="noopener noreferrer">
                                                <Image
                                                    src={
                                                        typeof row.ecosystem === "string" && row.ecosystem.trim().length > 0
                                                            ? row.ecosystem
                                                            : "/placeholder.png"
                                                    }
                                                    alt={`${row.asset} ecosystem`}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 mr-2"
                                                />
                                            </a>
                                        </td>
                                        <td className="px-4 py-2">
                                            <a
                                                href={row.stakingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-teal-700 hover:bg-black text-white font-bold py-1 px-4 rounded-lg transition duration-300"
                                            >
                                                Stake
                                            </a>
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