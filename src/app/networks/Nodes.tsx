import React from 'react';
import Link from 'next/link';
import { investedNodes } from './investedNodes';
import Image from 'next/image';

const Nodes: React.FC = () => {
    return (
        <div className="mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-evenly mb-8">
                <div className="flex items-center justify-center md:justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mr-8">
                        Mining we’ve operated
                    </h2>
                    <div className="hidden md:block h-15 w-1 bg-black rounded"></div>
                </div>
                <div className="mt-4 text-black text-lg max-w-xl">
                    We invest in and operate mining nodes to participate in the global network and promote the long-term growth of highly promising projects.
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4" style={{ width: 420 }}>
                    {investedNodes.map((node) => (
                        <Link
                            key={node.id}
                            href={node.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-teal-800 rounded-xl shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105"
                            style={{ width: 190, height: 200 }}
                        >
                            <Image
                                src={node.logo}
                                alt={node.name}
                                width={120}
                                height={120}
                                className="w-30 h-30 object-contain mb-2"
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