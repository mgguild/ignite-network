"use client";

import { data } from "./data";

const ExploreMobile: React.FC = () => {
    return (
        <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 pt-32">
            <div className="w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-teal text-center">Explore</h2>
                <p className="text-gray-300 text-center mb-6 text-sm">
                    Ignite Network empowers users to participate in securing multiple blockchain while earning passive income. Explore a wide range of staking, nodes, and validator opportunities across top chains like NEAR and Ronin, among others.
                </p>
                <div className="flex flex-col gap-4">
                    {data.map((row, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-0 overflow-hidden"
                        >
                            {/* Header with logo and asset */}
                            <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
                                <img src={row.logo} alt={row.asset} className="w-8 h-8 rounded" />
                                <span className="font-semibold text-white text-lg">{row.asset}</span>
                                <a
                                    href={row.ecosystemLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto"
                                >
                                    <img src={row.ecosystem} alt={`${row.asset} ecosystem`} className="w-6 h-6" />
                                </a>
                            </div>
                            {/* Table-like fields */}
                            <div className="divide-y divide-gray-700">
                                <div className="flex justify-between px-4 py-2">
                                    <span className="text-gray-400">Price</span>
                                    <span className="text-white">{row.price ?? '-'}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2">
                                    <span className="text-gray-400">APY</span>
                                    <span className="text-white">{row.apy}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2">
                                    <span className="text-gray-400">Estimated APY</span>
                                    <span className="text-white">{row.estimatedApy ?? '-'}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2">
                                    <span className="text-gray-400">Uptime</span>
                                    <span className="text-white">{row.commission}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2">
                                    <span className="text-gray-400">Product</span>
                                    <span>
                                        <span className="bg-gray-700 text-white px-2 py-0.5 rounded-full text-xs">
                                            {row.product}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <a
                                href={row.stakingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-teal-700 hover:bg-black text-white font-bold py-2 px-4 text-center rounded-b-xl transition duration-300"
                            >
                                Stake
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreMobile;