import "./globals.css";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata = {
  title: "Planner & Journal Generator",
  description: "Generate planner/journal prompts with styles, themes, fonts, and formats."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${space.variable}`}>
        {children}
      </body>
    </html>
  );
}
