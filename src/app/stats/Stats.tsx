import React from 'react';

const Stats: React.FC = () => {
    return (
            <section
                id="stats"
                className="relative min-h-screen bg-[url('/stats.png')] bg-cover bg-center bg-gray-900 flex flex-col items-center justify-center py-16 overflow-hidden"
                >
                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-6xl font-bold text-teal-300 mb-4">Ignite by the Numbers:</h1>
                    <h3 className="text-lg text-gray-400 mb-12">
                        Ignite Network metrics highlight our reliability and leadership in blockchain validation:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <BoxStat
                            title="Total Value Staked"
                            description="Over $10M"
                        />
                        <BoxStat
                            title="APY Range"
                            description="~5% – 20%"
                        />
                        <BoxStat
                            title="Uptime"
                            description="99.9%+"
                        />
                        <BoxStat
                            title="Blocks Validated"
                            description="10M+ Blocks"
                        />
                    </div>
                </div>
            </section>
            );
        };

interface BoxStatProps {
    title: string;
    description: string;
}

const BoxStat: React.FC<BoxStatProps> = ({ title, description }) => {
    return (
        <div className="relative bg-gray-800 text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700 hover:border-teal-400">
            <p className="text-3xl font-bold mb-4">{description}</p>
            <p className="text-xl">{title}</p> 
        </div>
    );
};

export default Stats;