'use client'


import { useQueries, useQuery } from '@tanstack/react-query'
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import Card from '@/components/card'
import Heading from '@/components/heading'
import { MemberStatus } from '@/components/member-status'
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'

import { amplifyClient } from '@/lib/amplify-client'
import { D4hApi } from '@/lib/d4h-api/client'
import { MemberResponse } from '@/lib/d4h-api/member-response'
import { useMemo } from 'react'

const columnHelper = createColumnHelper<MemberResponse>()

export default function PersonnelPage() {

    const accessKeysQuery = useQuery({ queryKey: ['d4hAccessKeys'], queryFn: async () => {
        const { data: accessKeys } = await amplifyClient.models.D4HAccessKey.list()
        return accessKeys
    }})

    const accessKeys = accessKeysQuery.data ?? []

    function getTeamName(teamId: number) {
        for(let accessKey of accessKeys) {
            if(accessKey.teamId == teamId) return accessKey.teamName.replace("NZ Response Team", "NZRT")
        }
        return ""
    }

    const membersQuery = useQueries({
        queries: accessKeys.map(accessKey => 
            D4hApi.queryOptions('get', '/v3/{context}/{contextId}/members', 
                {
                    params: { 
                        path: { context: 'team', contextId: accessKey?.teamId!! },
                        query: { status: ['OPERATIONAL', 'NON_OPERATIONAL'] }
                    },
                    headers: { Authorization: `Bearer ${accessKey?.key}` },
                }
            )
        ),
        combine: (queryResults) => {

            const isError = queryResults.some(qr => qr.isError)
            const isPending = queryResults.some(qr => qr.isPending)
            const isSuccess = queryResults.every(qr => qr.isSuccess)
            
            if(isSuccess) {
                const members: MemberResponse[] = []
                for(let result of queryResults) {
                    members.push(...(result.data as { results: MemberResponse[] }).results)
                }
                return {
                    data: members,
                    isError, isPending, isSuccess
                }
               
            } else {
                return {
                    data: [],
                    isError, isPending, isSuccess
                }
            }
        },
    })

    const columns = useMemo(() => [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.getValue(),
            sortingFn: 'alphanumeric'
        }),
        columnHelper.accessor('owner.id', {
            header: 'Team',
            cell: info => {
                const teamId = info.getValue()
                for(let accessKey of accessKeys) {
                    if(accessKey.teamId == teamId) return accessKey.teamName.replace("NZ Response Team", "NZRT")
                }
                return ""
            }
        }),
        columnHelper.accessor('position', {
            header: 'Position',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('status', {
            header: 'Operational',
            cell: info => <MemberStatus status={info.getValue()}/>,
            enableSorting: false,
            meta: {
                align: 'center'
            }
    
        })
    ], [accessKeys])

    const table = useReactTable({ 
        data: membersQuery.data, 
        columns, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            sorting: [
                { id: 'name', desc: false }
            ]
        }
    })

    return <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        <Heading level={1}>Personnel</Heading>
        { (accessKeysQuery.isPending || membersQuery.isPending) && <div role="status" className="max-w-full h-20 mt-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"/>}
        { (accessKeysQuery.isSuccess && membersQuery.isSuccess) && membersQuery.data && <Card className="mt-4 px-4">
            <Table dense striped>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            const columnDef = header.column.columnDef
                            return <TableHeader 
                                key={header.id} 
                                order={header.column.getCanSort() ? 'ascending' : undefined}
                                align={columnDef.meta?.align}
                            >
                                {header.isPlaceholder ? null : flexRender(columnDef.header, header.getContext())}
                            </TableHeader>
                        })}
                    </TableRow>)}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map(row => <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => {
                            const columnDef = cell.column.columnDef
                            return <TableCell 
                                key={cell.id}
                                align={columnDef.meta?.align}
                            >
                                {flexRender(columnDef.cell, cell.getContext())}
                            </TableCell>
                        })}
                    </TableRow>)}
                </TableBody>
            </Table>
        </Card>}
    </div>
}
