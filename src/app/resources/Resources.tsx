import React from 'react';

const Resources: React.FC = () => {
    return (
        <section
            id="resources"
            className="relative min-h-screen bg-gray-900 text-white flex flex-col justify-center py-16"
        >
            {/* Background Image with Blur */}
            <div
                className="absolute inset-0 bg-[url('/resources.png')] bg-cover bg-center filter blur-[2px]"
                aria-hidden="true"
            ></div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-around items-center bg-white/50 p-6 rounded-lg shadow-lg">
                    <h1 className="text-8xl font-bold text-teal-600 drop-shadow-sm mb-6 md:mb-0">Blog</h1>
                    <div className="bg-black drop-shadow-xl h-[3px] w-12 sm:w-[6px] sm:h-40 mx-1 rounded-full"></div>
                    <p className="text-lg text-black md:ml-8 max-w-xl">
                        Stay informed and ahead of the curve with the Ignite Network Blog. Our team shares the latest industry news, technology updates, and validator insights to help you make informed decisions and deepen your understanding of the staking ecosystem. Here’s a glimpse at what we’re writing about:
                    </p>
                </div>
                {/* Blog Posts */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <li className="relative bg-gray-800 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Navigating the Next Bull Run: Staking Strategies for Retail and Institutional Investors
                            </h3>
                            <p className="text-gray-400 mb-4">
                                An analysis of market trends and how staking can optimize your crypto portfolio.
                            </p>
                        </div>
                    </li>
                    <li className="relative bg-gray-800 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Under the Hood: How Ignite Achieves 99.9% Uptime
                            </h3>
                            <p className="text-gray-400 mb-4">
                                A technical look at our infrastructure and the security practices keeping your funds safe.
                            </p>
                        </div>
                    </li>
                    <li className="relative bg-gray-800 bg-opacity-90 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Network Spotlight: Staking on NEAR vs. Ronin
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Comparing opportunities, APYs, and tips for two of our most popular supported chains.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Resources;