/**
 * Table related components derived from Catalyst UI.
 */

'use client'

import clsx from 'clsx'
import type React from 'react'
import { createContext, useContext, useState } from 'react'

import { ArrowLongDownIcon, ArrowLongUpIcon, Bars3BottomRightIcon, CheckIcon, ChevronDownIcon, EllipsisVerticalIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import { Column } from '@tanstack/react-table'

import { Dropdown, DropdownButton, DropdownDivider, DropdownHeader, DropdownHeading, DropdownItem, DropdownLabel, DropdownMenu, DropdownSecondaryIcon, DropdownSection } from './dropdown'
import Link from './link'
import Button from './button'


const TableContext = createContext<{ bleed: boolean; dense: boolean; grid: boolean; striped: boolean }>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
})


type TableProps = { bleed?: boolean; dense?: boolean; grid?: boolean; striped?: boolean } & React.ComponentPropsWithoutRef<'div'>

/**
 * Table component that extends the JSX `<table>` element.
 * 
 * @param bleed - Whether the table should bleed into the gutter.
 * @param dense - Whether the table should use condensed spacing.
 * @param grid - Whether to display vertical grid lines.
 * @param striped - Whether to display striped table rows.
 */
export default function Table({
    bleed = false, dense = false, grid = false, striped = false,
    className, children, ...props
}: TableProps) {
    return <TableContext.Provider value={{ bleed, dense, grid, striped } as React.ContextType<typeof TableContext>}>
        <div className="flow-root">
            <div {...props} className={clsx(className, '-mx-[--gutter] overflow-x-auto whitespace-nowrap')}>
            <div className={clsx('inline-block min-w-full align-middle', !bleed && 'sm:px-[--gutter]')}>
                <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">{children}</table>
            </div>
            </div>
        </div>
    </TableContext.Provider>
}


/**
 * TableHead component that extends the JSX `<thead>` element.
 */
export function TableHead({ className, ...props }: React.ComponentPropsWithoutRef<'thead'>) {
    return <thead {...props} className={clsx(className, 'text-zinc-500 dark:text-zinc-400')} />
}


/**
 * TableBody component that extends the JSX `<tbody>` element.
 */
export function TableBody(props: React.ComponentPropsWithoutRef<'tbody'>) {
    return <tbody {...props} />
}


const TableRowContext = createContext<{ href?: string; target?: string; title?: string }>({
    href: undefined,
    target: undefined,
    title: undefined,
})

type TableRowProps = { href?: string; target?: string; title?: string } & React.ComponentPropsWithoutRef<'tr'>

/**
 * TableRow component that extends the JSX `<tr>` component.
 * 
 * @param href - The URL for the row when used as a link.
 * @param target - The target for the row when used as a link.
 * @param title - The title for the row when used as a link.
 */
export function TableRow({ href, target, title, className, ...props }: TableRowProps) {
    let { striped } = useContext(TableContext)

    return <TableRowContext.Provider value={{ href, target, title } as React.ContextType<typeof TableRowContext>}>
        <tr
            {...props}
            className={clsx(
            className,
                href && 'has-[[data-row-link][data-focus]]:outline has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%]',
                striped && 'even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5%]',
                href && striped && 'hover:bg-zinc-950/5 dark:hover:bg-white/5',
                href && !striped && 'hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]'
            )}
        />
    </TableRowContext.Provider>
}

type TableHeaderProps = { align?: 'left' | 'right' | 'center' } & React.ComponentPropsWithoutRef<'th'>

/**
 * TableHeader component that extends the JSX `<th>` element.
 */
export function TableHeader({ align, children, className, ...props }: TableHeaderProps) {
    let { bleed, grid } = useContext(TableContext)

    return <th
        {...props}
        className={clsx(
            className,
            'border-b border-b-zinc-950/10 font-medium dark:border-b-white/10',
            'px-4 py-2', //'first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
            grid && 'border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5',
            !bleed && 'sm:first:pl-1 sm:last:pr-1',
            
        )}
    >
        <div className={clsx(
            'flex',
            align == 'left' && 'justify-start',
            align == 'center' && 'justify-center',
            align == 'right' && 'justify-end'
        )}>
            {children}
        </div>
    </th>
}

type ColumnHeaderProps = {
    column: Column<any, any>
    onToggleGrouping: () => void
 } & React.ComponentPropsWithoutRef<'th'>

export function ColumnHeader({ children, className, column, onToggleGrouping, ...props }: ColumnHeaderProps) {
    let { bleed, grid } = useContext(TableContext)

    const isSorted = column.getIsSorted()

    return <th
            {...props}
            className={clsx(
                className,
                'border-b border-b-zinc-950/10 font-medium dark:border-b-white/10',
                grid && 'border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5',
            )}
        >
            <div className={clsx(
                'w-full flex items-center justify-between',
                'pl-4 pr-2 py-1',
            )}>
                <div>{children}</div>
                <Dropdown>
                    <DropdownButton as={Button} plain>
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
                                <DropdownItem onClick={() => column.toggleSorting()}>
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
                        { (column.getCanHide() || column.getCanGroup()) && <DropdownSection>
                            { column.getCanGroup() && <DropdownItem onClick={onToggleGrouping}>
                                <Bars3BottomRightIcon/>
                                <DropdownLabel>Group by</DropdownLabel>
                                {column.getIsGrouped() && <CheckIcon/>}
                            </DropdownItem>}
                            { column.getCanHide() && <DropdownItem onClick={() => column.toggleVisibility()}>
                                <EyeSlashIcon/>
                                <DropdownLabel>Hide Column</DropdownLabel>
                            </DropdownItem>}
                        </DropdownSection>}
                    </DropdownMenu>
                </Dropdown>
            </div>
            
    </th>

    return <Dropdown
        as="th" 
        {...props}
        className={clsx(
            className,
            'border-b border-b-zinc-950/10 font-medium dark:border-b-white/10',
            //'px-4 py-2', //'first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
            grid && 'border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5',
        )}
    >
        <DropdownButton className={clsx(
            'w-full flex items-center justify-between',
            'px-4 py-2',
            'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
        )}>
            <div>{children}</div>
            <EllipsisVerticalIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
        </DropdownButton>
       
    </Dropdown>
}

export type TableCellProps = React.ComponentPropsWithoutRef<'td'>

/**
 * TableCell component that extends the JSX `td` element.
 */
export function TableCell({ className, children, ...props }: TableCellProps) {
    let { bleed, dense, grid, striped } = useContext(TableContext)
    let { href, target, title } = useContext(TableRowContext)
    let [cellRef, setCellRef] = useState<HTMLElement | null>(null)

    return <td
        ref={href ? setCellRef : undefined}
        {...props}
        className={clsx(
            className,
            'relative px-4', //'first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
            !striped && 'border-b border-zinc-950/5 dark:border-white/5',
            grid && 'border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5',
            dense ? 'py-2.5' : 'py-4',
            !bleed && 'sm:first:pl-1 sm:last:pr-1'
        )}
        >
        {href && <Link
            data-row-link
            href={href}
            target={target}
            aria-label={title}
            tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
            className="absolute inset-0 focus:outline-none"
        />}
        {children}
    </td>
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