
'use client'

import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Alert from '@/components/alert'
import Card from '@/components/card'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/catalyst/description-list'
import Divider from '@/components/catalyst/divider'
import Heading from '@/components/catalyst/heading'

import { Schema, amplifyClient } from '@/lib/amplify-client'
import { D4hApi } from '@/lib/d4h-api/client'

import { MemberResponse } from '@/lib/d4h-api/member-response'


export default function PersonalDetailsSection() {

    const accessKeysQuery = useQuery({ queryKey: ['d4hAccessKeys'], queryFn: async () => {
        const { data: accessKeys } = await amplifyClient.models.D4HAccessKey.list()
        return accessKeys
    }})

    const accessKey = accessKeysQuery.data?.find(accessKey => accessKey.primary)

    const memberQuery = D4hApi.useQuery('get', '/v3/{context}/{contextId}/members/{member}', 
        {
            params: {
                path: { context: 'team', contextId: accessKey?.teamId!!, member: accessKey?.memberId!! }
            },
            headers: {
                Authorization: `Bearer ${accessKey?.key}`
            }
        },
        {
            enabled: accessKey != undefined
        }
    )

    const member = memberQuery.data as (MemberResponse | undefined)

    return <section>
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <Heading level={2}>Personal</Heading>
                <p className="mt-2 text-sm text-gray-700">
                    Your basic personal details as configured on D4H.
                </p>
            </div>
        </div>
        {(accessKeysQuery.isPending || memberQuery.isPending) && <div role="status" className="max-w-full h-20 mt-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"/>}
        {(accessKeysQuery.isSuccess && !accessKey) && <Alert className="mt-4" severity="warning" title="Not Connected">
            A configured primary D4H access key is required to fetch this data.
        </Alert>}
        {member && <Card className="mt-4 px-4">
            <DescriptionList>
                <DescriptionTerm>Name</DescriptionTerm>
                <DescriptionDetails>{member.name}</DescriptionDetails>
                <DescriptionTerm>Email</DescriptionTerm>
                <DescriptionDetails>{member.email.value}</DescriptionDetails>
                <DescriptionTerm>Phone (Mobile)</DescriptionTerm>
                <DescriptionDetails>{member.mobile.phone}</DescriptionDetails>
            </DescriptionList>
        </Card>}
        
    </section>
}