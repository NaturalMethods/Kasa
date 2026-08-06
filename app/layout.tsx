import "./globals.css"
import UserProvider from "@/contexts/UserProvider";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";
import React from "react";
import Header from "@/components/layout/Header";
import {MessageProvider} from "@/contexts/MessageContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    display: "swap",
});

export default function RootLayout({children}: { children: React.ReactNode }) {

  return (
      <html lang="fr">
      <body>
        <UserProvider>
            <MessageProvider>
                <Header/>
                {children}
                <Footer/>
            </MessageProvider>
        </UserProvider>
      </body>
      </html>
  )
}