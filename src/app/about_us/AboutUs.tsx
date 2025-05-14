import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <section
            id="about_us"
            className="relative bg-gray-900 text-white min-h-screen flex flex-col justify-center"
        >
            {/* Background Image with Blur */}
            <div
                className="absolute inset-0 bg-[url('/Artboard1about_bg.png')] bg-cover bg-center filter blur-[2.5px]"
                aria-hidden="true"
            ></div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    {/* About Text */}
                    <h2 className="text-7xl font-bold text-center text-teal-500">About Us</h2>
                </div>
                <div className="border-t border-white my-8"></div>
                <div className="flex flex-col md:flex-row items-center md:items-center">
                    {/* Left Column: Image */}
                    <div className="flex flex-col items-center md:items-center md:w-2/3">
                        <img
                            src="/Ignite-Neworkwhite.png"
                            alt="Profile"
                            className="w-[100rem] h-auto rounded-full mb-4"
                        />
                    </div>

                    {/* Right Column: Description */}
                    <div className="md:w-4/5 md:pl-8 mt-8 md:mt-16">
                        <div>
                            <p className="text-lg text-white mb-4">
                                Since our founding in 2023, Ignite Network has been driven by a passion for decentralization and a commitment to excellence. Our mission is to secure blockchain networks and empower their users with reliable and secure validation services.
                            </p>
                            <p className="text-lg text-white mb-4">
                                Our team is composed of seasoned blockchain engineers, and passionate crypto enthusiasts dedicated to running institutional-grade infrastructure with an uncompromising focus on security and performance.
                            </p>
                            <p className="text-lg text-white">
                                At Ignite, we don’t just operate validators– we partner with our delegators or stakers and the wider community users to ignite the future of finance together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;