import React from 'react';
import { data } from './data'; // Adjust the path based on the file location

const Explore: React.FC = () => {
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
                                        <td className="px-4 py-2">{row.price}</td>
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