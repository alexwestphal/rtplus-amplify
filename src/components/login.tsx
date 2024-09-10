'use client'

import { AuthUser } from 'aws-amplify/auth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

import { withAuthenticator } from '@aws-amplify/ui-react'

import '@aws-amplify/ui-react/styles.css'

export interface LoginProps {
    user?: AuthUser
}

function Login({ user }: LoginProps) {
    useEffect(() => {
        if(user) redirect("/")
    }, [user])
    return null
}

export default withAuthenticator(Login)