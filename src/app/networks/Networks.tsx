import React from 'react';
import { networks } from './networkData';

const Networks: React.FC = () => {
    return (
        <section
            id="networks"
            className="py-12 bg-[url('/tealll.png')] bg-cover bg-center bg-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-22">
               <div className="text-center mb-8">
                    {/* Gradient Text for Title */}
                    <h1 className="text-7xl font-bold bg-gradient-to-r from-black to-teal-500 bg-clip-text text-transparent">
                        Networks
                    </h1>
                    <p className="text-black mt-2 text-lg">
                        Unlock passive income through staking.
                    </p>
                    <p className="text-black mt-2 italic">
                        We partner with over 10 vetted Proof-of-Stake networks, ensuring security and reliability. Stake on any network below and start earning rewards today.
                    </p>
                </div>
                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {networks.slice(0, 9).map((network) => (
                        <div
                            key={network.id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-bg-black-900"
                        >
                            <img
                                src={network.logo}
                                alt={`${network.name} logo`}
                                className="w-16 h-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-900">{network.name}</h3>
                            <p className="text-sm text-gray-500">{network.symbol}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    {/* Optional Button */}
                    {/* <button className="text-red-600 font-semibold hover:underline">
                        View all
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default Networks;