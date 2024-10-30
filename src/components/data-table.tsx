
import clsx from 'clsx'
import { ArrowDownAZIcon, ArrowDownZAIcon, CheckIcon, ChevronsUpDownIcon, EllipsisVerticalIcon, EyeOffIcon, GroupIcon, UngroupIcon } from 'lucide-react'
import React from 'react'

import { Column, flexRender, Table as TanstackTable } from '@tanstack/react-table'

import { Button, IconButton } from './catalyst/button'
import { Checkbox } from './catalyst/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderProps, TableProps, TableRow } from './catalyst/table'
import { Dropdown, DropdownButton, DropdownHeader, DropdownHeading, DropdownItem, DropdownLabel, DropdownMenu, DropdownSection } from './catalyst/dropdown'


export type DataTableProps<T> = { 
    table: TanstackTable<T>
} & TableProps

export function DataTable<T>({ table, ...props }: DataTableProps<T>) {

    return <Table {...props}>
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
                {headerGroup.headers.map(header => <ColumnHeader
                    key={header.id} 
                    table={table} 
                    column={header.column}
                >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </ColumnHeader>)}
            </TableRow>)}
        </TableHead>
        <TableBody>

            {table.getRowModel().rows.map(row => {

                return <TableRow key={row.id}>
                    <TableCell>
                        <Checkbox
                            checked={row.getIsSomeSelected() || row.getIsSelected()}
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
                                colSpan={table.getVisibleFlatColumns().length}
                            >
                                <div className={clsx(
                                    'flex items-center',
                                    'font-bold'
                                )}>
                                    {cell.getValue() == '' ? <span className="italic">EMPTY</span> : flexRender(columnDef.cell, cell.getContext()) }
                                    <div className="grow"/>
                                    
                                    <div>( {row.subRows.length} )</div>
                                    <Button plain className="ml-2 -mr-2" onClick={() => row.toggleExpanded()}>
                                        <ChevronsUpDownIcon data-slot="icon" className="size-5 text-gray-400 group-hover:text-gray-500"/>
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
}

export type ColumnHeaderProps = {
    table: TanstackTable<any>,
    column: Column<any, any>
 } & TableHeaderProps

export function ColumnHeader({ className, children, column, table, ...props }: ColumnHeaderProps) {

    const isSorted = column.getIsSorted()

    return <TableHeader {...props}>
            <div className={clsx(
                'w-full flex items-center justify-between',
                className,
            )}>
                <div>{children}</div>
                <Dropdown>
                    <DropdownButton as={IconButton} className="-m-2 -mr-4">
                        <EllipsisVerticalIcon data-slot="icon" />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end" className="divide-y divide-zinc-950/10">
                        <DropdownHeader>
                            <div className="text-center text-sm text-zinc-800 dark:text-white">Column Options</div>
                        </DropdownHeader>
                        {column.getCanSort() && <>
                            <DropdownSection>
                                <DropdownHeading>Sort</DropdownHeading>
                                <DropdownItem onClick={() => column.toggleSorting()}>
                                    <ArrowDownAZIcon data-slot="icon"/>
                                    <DropdownLabel>Ascending</DropdownLabel>
                                    {isSorted == 'asc' && <CheckIcon data-slot="icon"/>}
                                </DropdownItem>
                                <DropdownItem onClick={() => column.toggleSorting(true)}>
                                    <ArrowDownZAIcon data-slot="icon"/>
                                    <DropdownLabel>Descending</DropdownLabel>
                                    {isSorted == 'desc' && <CheckIcon data-slot="icon"/>}
                                </DropdownItem>
                            </DropdownSection>
                        </>}
                        { (column.getCanHide() || column.getCanGroup()) && <DropdownSection>
                            { column.getCanGroup() && <DropdownItem 
                                onClick={() => table.setGrouping(column.getIsGrouped() ? [] : [column.id])}
                            >
                                {column.getIsGrouped() ? <UngroupIcon data-slot="icon"/> : <GroupIcon data-slot="icon"/>}
                                <DropdownLabel>Group by</DropdownLabel>
                                {column.getIsGrouped() && <CheckIcon/>}
                            </DropdownItem>}
                            { column.getCanHide() && <DropdownItem onClick={() => column.toggleVisibility()}>
                                <EyeOffIcon data-slot="icon"/>
                                <DropdownLabel>Hide Column</DropdownLabel>
                            </DropdownItem>}
                        </DropdownSection>}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </TableHeader>
}


export type TableControls = React.ComponentPropsWithoutRef<'div'>

export function TableControls({className, ...props}: TableControls) {
    return <div
        {...props}
        className={clsx(className, 
            'mt-4 mb-2',
            'flex gap-2',
        )}
    />
}