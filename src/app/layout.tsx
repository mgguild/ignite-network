import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Ignite Network",
  description: "Ignite Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Navbar />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

