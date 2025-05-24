import React from 'react';
import Link from 'next/link';
import { investedNodes } from './investedNodes';
import Image from 'next/image';

const Nodes: React.FC = () => {
    return (
        <div className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-evenly mb-8">
                <div className="flex items-center justify-center md:justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mr-0 sm:mr-8">
                        Mining we’ve operated
                    </h2>
                    <div className="hidden md:block h-15 w-1 bg-black rounded"></div>
                </div>
                <div className="mt-4 text-black text-lg max-w-xl text-center md:text-left">
                    We invest in and operate mining nodes to participate in the global network and promote the long-term growth of highly promising projects.
                </div>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                    {investedNodes.map((node) => (
                        <Link
                            key={node.id}
                            href={node.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-teal-800 rounded-xl shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105 w-36 h-36 sm:w-44 sm:h-48"
                        >
                            <Image
                                src={node.logo}
                                alt={node.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 sm:w-30 sm:h-30 object-contain mb-2"
                            />
                            <span className="text-teal-800 font-semibold text-xs text-center break-words">{node.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Nodes;