'use client'

import { Amplify } from 'aws-amplify'

import { Authenticator } from '@aws-amplify/ui-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import outputs from '@/../amplify_outputs.json'

Amplify.configure(outputs, { ssr: true })

const queryClient = new QueryClient()

export default function ConfigureAmplifyClientSide({ children }: { children: React.ReactNode }) {
    return <Authenticator.Provider>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </Authenticator.Provider>
}