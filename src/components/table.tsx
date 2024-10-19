/**
 * Table related components derived from Catalyst UI.
 */

'use client'

import clsx from 'clsx'
import type React from 'react'
import { createContext, useContext, useState } from 'react'

import Link from './link'

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

type TableHeaderProps = { align?: 'left' | 'right' | 'center', order?: 'ascending' | "descending" | "none", } & React.ComponentPropsWithoutRef<'th'>

/**
 * TableHeader component that extends the JSX `<th>` element.
 */
export function TableHeader({ align, children, className, order, ...props }: TableHeaderProps) {
    let { bleed, grid } = useContext(TableContext)

    return <th
        {...props}
        className={clsx(
            className,
            'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10',
            grid && 'border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5',
            !bleed && 'sm:first:pl-1 sm:last:pr-1',
        )}
    >
        <div className={clsx(
            'flex items-center',
            align == 'left' && 'justify-start',
            align == 'right' && 'justify-end',
            align == 'center' && 'justify-center'
        )}>
            <div>{children}</div>
            {order ? <a href="#">
                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path className="text-gray-800" d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Z"/>
                    <path className="text-gray-800" d="M15.426 12.976H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                </svg>
            </a> : null}
        </div>
    </th>
}


/**
 * TableCell component that extends the JSX `td` element.
 */
export function TableCell({ className, children, ...props }: React.ComponentPropsWithoutRef<'td'>) {
    let { bleed, dense, grid, striped } = useContext(TableContext)
    let { href, target, title } = useContext(TableRowContext)
    let [cellRef, setCellRef] = useState<HTMLElement | null>(null)

    return <td
        ref={href ? setCellRef : undefined}
        {...props}
        className={clsx(
            className,
            'relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
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