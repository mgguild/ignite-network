import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTelegram,
    faDiscord,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer
            className="relative bg-[url('/darkteal.png')] bg-cover bg-center bg-gray-900 text-white py-12"
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Follow Us Section */}
                <div className="flex flex-col justify-center items-center mb-8">
                    {/* <h3 className="text-xl font-semibold mb-4 text-center">Follow Us</h3> */}
                       {/* Logo Below Follow Us */}
                      <div className="mt-0">
                        <a href="/" className="block">
                            <img
                                src="/Ignite-Neworkwhite.png" // Replace with the path to your logo
                                alt="Logo"
                                className="w-40 h-auto"
                            />
                        </a>
                    </div>
                    {/* <div className="flex justify-center space-x-6 text-gray-400">
                        <a
                            className="text-white px-4 py-4"
                            href=""
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-facebook"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                        </a>
                        <a
                            className="text-white px-4 py-4"
                            href=""
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-twitter-x"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                        </a>
                        <a
                            className="text-white px-4 py-4"
                            href="mailto:astraxinvestment@gmail.com"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-envelope-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                        </a>
                    </div> */}
                </div>
                {/* Footer Bottom */}
                <div className="mt-8 border-t border-white pt-4 text-center text-white text-sm">
                    <p>&copy; 2025 Ignite Network. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}