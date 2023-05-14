import { montserrat } from "@/fonts";
import "./globals.css";
import Header from "@/components/Header";
import ReduxProvider from "@/redux/ReduxProvider";

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
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
