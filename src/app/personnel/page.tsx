'use client'

import clsx from 'clsx'
import React, { useMemo, useState } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

import { useQueries, useQuery } from '@tanstack/react-query'
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, getExpandedRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getGroupedRowModel, getSortedRowModel, InitialTableState, RowSelectionState, useReactTable } from '@tanstack/react-table'

import Button from '@/components/catalyst/button'
import Card from '@/components/card'
import { Checkbox } from '@/components/catalyst/checkbox'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/catalyst/dropdown'
import Heading from '@/components/catalyst/heading'
import Input, { InputGroup } from '@/components/catalyst/input'
import { EmailLink, PhoneLink } from '@/components/link'
import { MemberStatus } from '@/components/member-status'
import { Skeleton } from '@/components/skeleton'
import Table, { ColumnHeader, TableBody, TableCell, TableControls, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'

import { amplifyClient } from '@/lib/amplify-client'
import { D4hApi } from '@/lib/d4h-api/client'
import { MemberResponse } from '@/lib/d4h-api/member-response'




const columnHelper = createColumnHelper<MemberResponse>()

export default function PersonnelPage() {

    const [globalFilter, setGlobalFilter] = useState("")
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

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
            cell: info => {
                const teamId = info.getValue()
                for(let accessKey of accessKeys) {
                    if(accessKey.teamId == teamId) return accessKey.teamName.replace("NZ Response Team", "NZRT")
                }
                return ""
            },
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
            grouping: [],
            sorting: [
                { id: 'name', desc: false }
            ],
        },
        state: {
            globalFilter,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection
    })

    return <div className="mx-auto max-w-7xl">
        <Heading level={1}>Personnel</Heading>
        <p className="mt-2 text-sm text-gray-700">
            A list of all the personnel across the teams.
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
                        value={globalFilter}
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
                <Button disabled onClick={() => { table.reset() }}>Reset</Button>
            </TableControls>
            <Card className="px-6 sm:px-8">
                <Table dense bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => <TableRow key={headerGroup.id} className="divide-x divide-x-gray-400">
                            <TableHeader>
                                <Checkbox
                                    color="zinc"
                                    checked={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()}
                                    indeterminate={table.getIsSomeRowsSelected()}
                                    onChange={(checked) => table.toggleAllRowsSelected(checked)}
                                />
                            </TableHeader>
                            {headerGroup.headers.map(header => {
                                const columnDef = header.column.columnDef
                                return <ColumnHeader
                                    key={header.id} 
                                    column={header.column}
                                    onToggleGrouping={() => 
                                        table.setGrouping(prev => prev.length == 0 ? [header.column.id] : [])
                                    }
                                >
                                    {header.isPlaceholder ? null : flexRender(columnDef.header, header.getContext())}
                                </ColumnHeader>
                            })}
                        </TableRow>)}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {

                            return <TableRow key={row.id}>
                                <TableCell>
                                <Checkbox
                                    checked={row.getIsSelected()}
                                    disabled={!row.getCanSelect()}
                                    indeterminate={row.getIsSomeSelected()}
                                    onChange={row.getToggleSelectedHandler()}
                                />
                                </TableCell>
                                {row.getVisibleCells().map(cell => {
                                    const columnDef = cell.column.columnDef
                                    
                                    if(cell.getIsGrouped()) {
                                        return <TableCell 
                                            key={cell.id}
                                            className="border-b border-b-gray-500"
                                            colSpan={table.getVisibleFlatColumns().length - cell.column.getIndex()}
                                        >
                                            <div className={clsx(
                                                'flex items-center',
                                                'font-bold'
                                            )}>
                                                {cell.getValue() == '' ? <span className="italic">EMPTY</span> : flexRender(columnDef.cell, cell.getContext()) }
                                                <div className="grow"/>
                                                
                                                <div>( {row.subRows.length} )</div>
                                                <Button plain className="ml-2 -mr-2" onClick={() => row.toggleExpanded()}>
                                                    {row.getIsExpanded()
                                                        ? <ChevronUpIcon className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                                        : <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"/>
                                                    }
                                                </Button>
                                            </div>
                                        </TableCell>

                                    } else if(cell.getIsAggregated()) {
                                        return null

                                    } else if(cell.getIsPlaceholder()) {
                                        return <TableCell key={columnDef.id}/>

                                    } else {
                                        return <TableCell key={cell.id} align={columnDef.meta?.align}>
                                            {flexRender(columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    }
                                })}
                        </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Card>
        </>}
    </div>
}
