import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer
            className="relative bg-[url('/darkteal.png')] bg-cover bg-center bg-gray-900 text-white py-12"
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* Follow Us Section */}
                    <div className="flex justify-center items-center gap-8 py-1">
                        {/* Ignite Network Logo */}
                        <Link href="/" className="block p-2 rounded">
                            <Image
                                src="/Ignite-Neworkwhite.png"
                                alt="Ignite Network Logo"
                                width={90}
                                height={48}
                                className="h-12 w-auto"
                            />
                        </Link>
                        {/* Divider */}
                        <div className="h-12 w-px bg-white mx-4" />
                        {/* X (Twitter) Logo */}
                        <Link
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
                        </Link>
                        {/* Facebook Logo */}
                        <Link
                            href="https://www.facebook.com/profile.php?id=61576739602771i"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="white"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                            </svg>
                        </Link>
                    </div>
                    {/* Footer Bottom */}
                    <div className="mt-8 border-t border-white pt-4 text-center text-white text-sm">
                        <p>&copy; 2025 Ignite Network. All rights reserved.</p>
                    </div>
            </div>
        </footer>
    );
}