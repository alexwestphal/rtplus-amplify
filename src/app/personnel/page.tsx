'use client'

import React, { useMemo, useState } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { useQueries, useQuery } from '@tanstack/react-query'
import { ColumnDef, createColumnHelper, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getSortedRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table'

import Button from '@/components/catalyst/button'
import Card from '@/components/card'
import { DataTable, TableControls } from '@/components/data-table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown'
import Heading from '@/components/catalyst/heading'
import Input, { InputGroup } from '@/components/catalyst/input'
import { EmailLink, PhoneLink } from '@/components/link'
import { MemberStatus } from '@/components/member-status'
import { Skeleton } from '@/components/skeleton'

import { amplifyClient } from '@/lib/amplify-client'
import { D4hApi } from '@/lib/d4h-api/client'
import { MemberResponse } from '@/lib/d4h-api/member-response'



const columnHelper = createColumnHelper<MemberResponse>()

export default function PersonnelPage() {

    const accessKeysQuery = useQuery({ queryKey: ['d4hAccessKeys'], queryFn: async () => {
        const { data: accessKeys } = await amplifyClient.models.D4HAccessKey.list()
        return accessKeys
    }})

    const accessKeys = accessKeysQuery.data ?? []

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

    function getTeamName(teamId: number) {
        for(let accessKey of accessKeys) {
            if(accessKey.teamId == teamId) return accessKey.teamName.replace("NZ Response Team", "NZRT")
        }
        return ""
    }

    const columns = useMemo(() => [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.getValue(),
            sortingFn: 'alphanumeric',
            enableGlobalFilter: true,
            enableHiding: false,
            enableGrouping: false,
            enableSorting: true,
        }),
        columnHelper.accessor('owner.id', {
            id: 'team',
            header: 'Team',
            cell: info => getTeamName(info.getValue()),
            enableGlobalFilter: false,
            enableGrouping: true,
            enableSorting: true,
        }),
        columnHelper.accessor('position', {
            id: 'position',
            header: 'Position',
            cell: info => info.getValue(),
            enableGlobalFilter: true,
            enableGrouping: true,
            enableSorting: true,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => <MemberStatus status={info.getValue()}/>,
            enableGlobalFilter: false,
            enableGrouping: true,
            enableSorting: false,
            meta: {
                align: 'center'
            },
        }),
        columnHelper.accessor('email.value', {
            id: 'email',
            header: 'Email',
            cell: info => <EmailLink email={info.getValue()}/>,
            enableGlobalFilter: true,
            enableSorting: false,
            enableGrouping: false,
        }),
        columnHelper.accessor('mobile.phone', {
            id: 'phone',
            header: 'Phone',
            cell: info => <PhoneLink phoneNumber={info.getValue()}/>,
            enableGlobalFilter: false,
            enableGrouping: false,
            enableSorting: false,
            
        })
    ] satisfies ColumnDef<MemberResponse, any>[], [accessKeys])

    const table = useReactTable({ 
        columns, 
        data: membersQuery.data,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(), 
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        initialState: {
            columnVisibility: {
                name: true, team: true,
                position: true, operational: true,
                email: false, phone: false
            },
            expanded: true,
            globalFilter: "",
            grouping: [],
            sorting: [
                { id: 'name', desc: false }
            ],
        },
    })

    return <div className="mx-auto max-w-7xl">
        <Heading level={1}>Personnel</Heading>
        <p className="mt-2 text-sm text-gray-700">
            A list of all the personnel available to you via your configured D4H API Keys.
        </p>
        { (accessKeysQuery.isPending || membersQuery.isPending) && <Skeleton className="mt-4">Fetching Personnel</Skeleton>}
        { (accessKeysQuery.isSuccess && membersQuery.isSuccess) && membersQuery.data && <>
            <TableControls>
                <InputGroup className="w-96">
                    <MagnifyingGlassIcon/>
                    <Input
                        name="search" 
                        placeholder="Search&hellip;" 
                        aria-label="Search"
                        value={table.getState().globalFilter}
                        onChange={ev => table.setGlobalFilter(String(ev.target.value))}
                    />
                </InputGroup>
                <Dropdown>
                    <DropdownButton as={Button} color="white">
                        Columns
                        <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                        {table.getAllColumns().map(column => {
                            
                            return column.getCanHide() ? <DropdownItem 
                                key={column.id} 
                                onClick={() => column.toggleVisibility()}
                            >
                                {column.columnDef.header as string}
                                {column.getIsVisible() && <CheckIcon/>}
                            </DropdownItem> : null
                        })}
                    </DropdownMenu>
                </Dropdown>
                <Button onClick={() => { table.reset() }}>Reset</Button>
            </TableControls>
            <Card className="px-6 sm:px-8">
                <DataTable table={table} dense bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"/>
            </Card>
        </>}
    </div>
}
