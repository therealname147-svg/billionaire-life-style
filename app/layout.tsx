import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Billionaire Life Style", description: "A persistent virtual life in Lagos and beyond." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}