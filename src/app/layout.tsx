
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'

import ConfigureAmplifyClientSide from '@/components/catalyst/configure-amplify'
import Sidebar from '@/components/sidebar'

import './globals.css'

const inter = Inter({ 
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter'
})

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mon'
})

export const metadata: Metadata = {
    title: "RT+",
    description: "Response Team Utilities",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en-nz" className={`${inter.variable} ${roboto_mono.variable} h-full bg-gray-50`}>
        <body className="h-full">
            <ConfigureAmplifyClientSide>
                <Sidebar/>
                <main className="lg:pl-72 py-4">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </ConfigureAmplifyClientSide>
        </body>
    </html>
}
