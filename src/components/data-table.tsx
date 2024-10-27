
import clsx from 'clsx'
import React from 'react'

import { Column, flexRender, Table as TanstackTable } from '@tanstack/react-table'

import { ArrowLongDownIcon, ArrowLongUpIcon, CheckIcon, EllipsisVerticalIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import Button from './catalyst/button'
import { Checkbox } from './catalyst/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderProps, TableProps, TableRow } from './catalyst/table'
import { Dropdown, DropdownButton, DropdownHeader, DropdownHeading, DropdownItem, DropdownLabel, DropdownMenu, DropdownSection } from './catalyst/dropdown'


export type DataTableProps<T> = { 
    table: TanstackTable<T>
} & TableProps

export function DataTable<T>({ table, ...props }: DataTableProps<T>) {

    const { grouping } = table.getState()

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
                {headerGroup.headers.map(header => {
                    const columnDef = header.column.columnDef
                    return <ColumnHeader
                        key={header.id} 
                        column={header.column}
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

                    return <TableCell key={cell.id} align={columnDef.meta?.align}>
                        {flexRender(columnDef.cell, cell.getContext())}
                    </TableCell>
                    })}
            </TableRow>
            })}
        </TableBody>
    </Table>
}

export type ColumnHeaderProps = {
    column: Column<any, any>
 } & TableHeaderProps

export function ColumnHeader({ className, children, column, ...props }: ColumnHeaderProps) {

    const isSorted = column.getIsSorted()

    return <TableHeader {...props}>
            <div className={clsx(
                'w-full flex items-center justify-between',
                className,
            )}>
                <div>{children}</div>
                <Dropdown>
                    <DropdownButton as={Button} plain className="-m-2 -mr-4">
                        <EllipsisVerticalIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end" className="divide-y divide-zinc-950/10">
                        <DropdownHeader>
                        <div className="pr-6">
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">Column</div>
                            <div className="text-sm/7 font-semibold text-zinc-800 dark:text-white">{column.id}</div>
                        </div>
                        </DropdownHeader>
                        {column.getCanSort() && <>
                            <DropdownSection>
                                <DropdownHeading>Sort</DropdownHeading>
                                <DropdownItem onClick={() => column.toggleSorting(false)}>
                                    <ArrowLongUpIcon/>
                                    <DropdownLabel>Ascending</DropdownLabel>
                                    {isSorted == 'asc' && <CheckIcon/>}
                                </DropdownItem>
                                <DropdownItem onClick={() => column.toggleSorting(true)}>
                                    <ArrowLongDownIcon/>
                                    <DropdownLabel>Descending</DropdownLabel>
                                    {isSorted == 'desc' && <CheckIcon/>}
                                </DropdownItem>
                            </DropdownSection>
                        </>}
                        { column.getCanHide() && <DropdownSection>
                            { column.getCanHide() && <DropdownItem onClick={() => column.toggleVisibility()}>
                                <EyeSlashIcon/>
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