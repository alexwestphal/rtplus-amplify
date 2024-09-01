'use client'

import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'

export default function Logout() {
    const router = useRouter()

    async function handleLogout() {
        await signOut()
        router.push('/login')
    }

    return <button
        className="px-2 bg-white text-black"
        onClick={handleLogout}
    >Sign out</button>
}