import { montserrat } from "@/fonts";
import "./globals.css";
import Header from "@/components/Header";
import CryptoContext from "@/context/CryptoContext";

export const metadata = {
  title: "Crypto Tracker",
  description: "Track crypto cryptocurrencies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className=" bg-[#14161a] text-white min-h-screen">
        <CryptoContext>
          <Header />
          {children}
        </CryptoContext>
      </body>
    </html>
  );
}
