

export default function Footer() {
    return (
        <footer
            className="relative bg-[url('/darkteal.png')] bg-cover bg-center bg-gray-900 text-white py-12"
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* Follow Us Section */}
                    <div className="flex justify-center items-center gap-8 py-1">
                        {/* Ignite Network Logo */}
                        <a href="/" className="block p-2 rounded">
                            <img
                                src="/Ignite-Neworkwhite.png"
                                alt="Ignite Network Logo"
                                className="h-12 w-auto"
                            />
                        </a>
                        {/* Divider */}
                        <div className="h-12 w-px bg-white mx-4" />
                        {/* X (Twitter) Logo */}
                        <a
                            href="https://x.com/ignitenetworkai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block  p-2 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="white"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                        </a>
                    </div>
                    {/* Footer Bottom */}
                    <div className="mt-8 border-t border-white pt-4 text-center text-white text-sm">
                        <p>&copy; 2025 Ignite Network. All rights reserved.</p>
                    </div>
            </div>
        </footer>
    );
}