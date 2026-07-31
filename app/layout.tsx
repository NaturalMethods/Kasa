import "./globals.css"
import UserProvider from "@/contexts/UserProvider";
import { Inter } from "next/font/google";

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
            {children}
        </UserProvider>
      </body>
      </html>
  )
}