import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "../config/fonts";
import { Providers } from "../components/providers/Providers";


export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: 'Home - Teslo | Shop'
  },
  description: "Tienda virtual de productos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
