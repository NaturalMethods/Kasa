import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import React from "react"

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full bg-lightOrange pt-25 min-h-screen flex flex-col">

            <Header/>

            <main className="flex-1 flex flex-col">
                {children}
            </main>

            <Footer/>

        </div>
    )
}