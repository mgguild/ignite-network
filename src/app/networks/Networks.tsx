import React from 'react';
import Link from 'next/link';
import { networks } from './networkData';
import Nodes from './Nodes';
import Image from 'next/image';

const Networks: React.FC = () => {
    return (
        <section
            id="networks"
            className="py-12 bg-[url('/tealll.png')] bg-cover bg-center bg-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-8 py-22">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 justify-center">
                    {networks.slice(0, 12).map((network) => (
                        <Link
                            key={network.id}
                            href={network.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg w-full max-w-[270px] min-h-[180px]"
                        >
                            <Image
                                src={network.logo}
                                alt={`${network.name} logo`}
                                width={64}
                                height={64}
                                className="mb-4"
                            />
                            <h3 className="text-lg font-bold text-gray-900">{network.name}</h3>
                            <p className="text-sm text-gray-500">{network.symbol}</p>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    {/* Optional Button */}
                    {/* <button className="text-red-600 font-semibold hover:underline">
                        View all
                    </button> */}
                </div>
            </div>
            <Nodes />
        </section>
    );
};

export default Networks;