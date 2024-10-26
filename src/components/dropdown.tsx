'use client'

import clsx from 'clsx'
import type React from 'react'

import * as Headless from '@headlessui/react'

import { Button } from './button'
import Link from './link'



export const Dropdown = Headless.Menu

// export type DropdownButtonProps<T extends React.ElementType = typeof Button> = { className?: string } & Omit<Headless.MenuButtonProps<T>, 'className'>

// export function DropdownButton<T extends React.ElementType = typeof Button>({as = Button, ...props}: DropdownButtonProps<T>) {
//     return <Headless.MenuButton as={as} {...props} />
// }

export const DropdownButton = Headless.MenuButton


export type DropdownMenuProps = { className?: string } & Omit<Headless.MenuItemsProps, 'className'>

export function DropdownMenu({ anchor = 'bottom', className, ...props}: DropdownMenuProps) {
    return <Headless.MenuItems
        {...props}
        transition
        anchor={anchor}
        className={clsx(
            className,
            // Anchor positioning
            '[--anchor-gap:theme(spacing.2)] [--anchor-padding:theme(spacing.1)] data-[anchor~=start]:[--anchor-offset:-6px] data-[anchor~=end]:[--anchor-offset:6px] sm:data-[anchor~=start]:[--anchor-offset:-4px] sm:data-[anchor~=end]:[--anchor-offset:4px]',
            // Base styles
            'isolate w-max rounded-md py-1',
            // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
            'outline outline-1 outline-transparent focus:outline-none',
            // Handle scrolling when menu won't fit in viewport
            'overflow-y-auto',
            // Popover background
            'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
            // Shadows
            'shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10',
            // Define grid at the menu level if subgrid is supported
            'supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]',
            // Transitions
            'transition data-[closed]:data-[leave]:opacity-0 data-[leave]:duration-100 data-[leave]:ease-in'
        )}
    />
}


export type DropdownItemProps = { className?: string, selected?: boolean } & (Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>| Omit<React.ComponentPropsWithoutRef<'button'>, 'className'>)

export function DropdownItem({ className, selected, ...props }: DropdownItemProps) {
    let classes = clsx(
        className,
        // Base styles
        'group cursor-default px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5',
        // Text styles
        'text-left text-base/6 sm:text-sm/6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]',
       
        // Focus
        'data-[focus]:bg-gray-100 data-[focus]:text-gray-900',
        // Disabled state
        'data-[disabled]:opacity-50',
        // Forced colors mode
        'forced-color-adjust-none forced-colors:data-[focus]:bg-[Highlight] forced-colors:data-[focus]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focus]:text-[HighlightText]',
        // Use subgrid when available but fallback to an explicit grid layout if not
        'col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid',
        // Icon Size
        '[&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:sm:size-4 [&>[data-slot=icon]]:row-start-1',
        'first:[&>[data-slot=icon]]:col-start-1 first:[&>[data-slot=icon]]:-ml-0.5 first:[&>[data-slot=icon]]:mr-2.5 sm:first:[&>[data-slot=icon]]:mr-2',
        'last:[&>[data-slot=icon]]:col-start-5 last:[&>[data-slot=icon]]:ml-2.5 sm:last:[&>[data-slot=icon]]:ml-2 last:[&>[data-slot=icon]]:-mr-0.5',
        // Icon Color
        '[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-zinc-600 [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focus]:dark:text-zinc-300',
        // Avatar
        '[&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5',
        // Selected
        'data-[selected]:text-indigo-600 data-[selected]:[&>[data-slot=icon]]:text-indigo-600'
    )

    return <Headless.MenuItem>
        {'href' in props 
            ? <Link {...props} className={classes} data-selected={selected}/>
            : <button type="button" {...props} className={classes} data-selected={selected ? 'true' : undefined}/>
        }
    </Headless.MenuItem>
}


export function DropdownHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div {...props} className={clsx(className, 'col-span-5 px-3.5 pb-1 pt-2.5 sm:px-3')} />
}


export type DropdownSectionProps = { className?: string } & Omit<Headless.MenuSectionProps, 'className'>

export function DropdownSection({ className, ...props }: DropdownSectionProps) {
    return <Headless.MenuSection
        {...props}
        className={clsx(
            className,
            // Define grid at the section level instead of the item level if subgrid is supported
            'col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]'
        )}
    />
}


export type DropdownHeadingProps = { className?: string } & Omit<Headless.MenuHeadingProps, 'className'>

export function DropdownHeading({ className, ...props }: DropdownHeadingProps) {
    return <Headless.MenuHeading
        {...props}
        className={clsx(
            className,
            'col-span-full grid grid-cols-[1fr,auto] gap-x-12 px-3.5 pb-1 pt-2 text-sm/5 font-medium text-zinc-500 sm:px-3 sm:text-xs/5 dark:text-zinc-400'
        )}
    />
}


export type DropdownDividerProps =  { className?: string } & Omit<Headless.MenuSeparatorProps, 'className'>

export function DropdownDivider({ className, ...props }: DropdownDividerProps) {
    return <Headless.MenuSeparator
        {...props}
        className={clsx(
            className,
            'col-span-full my-1 h-px border-0 bg-zinc-950/10 dark:bg-white/10 forced-colors:bg-[CanvasText]'
        )}
    />
}


export type DropdownLabelProps = { className?: string } & Omit<Headless.LabelProps, 'className'>

export function DropdownLabel({ className, ...props }: DropdownLabelProps) {
    return <Headless.Label {...props} data-slot="label" className={clsx(className, 'col-start-2 row-start-1')} {...props} />    
}


export type DropdownDescriptionProps = { className?: string } & Omit<Headless.DescriptionProps, 'className'>

export function DropdownDescription({ className, ...props }: DropdownDescriptionProps) {
    return <Headless.Description
        data-slot="description"
        {...props}
        className={clsx(
            className,
            'col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-[focus]:text-white sm:text-xs/5 dark:text-zinc-400 forced-colors:group-data-[focus]:text-[HighlightText]'
        )}
    />
}


export type DropdownShortcutProps = { keys: string | string[]; className?: string } & Omit<Headless.DescriptionProps<'kbd'>, 'className'>

export function DropdownShortcut({ keys, className, ...props }: DropdownShortcutProps) {
    return <Headless.Description
        as="kbd"
        {...props}
        className={clsx(className, 'col-start-5 row-start-1 flex justify-self-end')}
        >
        {(Array.isArray(keys) ? keys : keys.split('')).map((char, index) =>
            <kbd
                key={index}
                className={clsx([
                    'min-w-[2ch] text-center font-sans capitalize text-zinc-400 group-data-[focus]:text-white forced-colors:group-data-[focus]:text-[HighlightText]',
                    // Make sure key names that are longer than one character (like "Tab") have extra space
                    index > 0 && char.length > 1 && 'pl-1',
                ])}
            >
                {char}
            </kbd>
        )}
    </Headless.Description>
}


export type DropdownSecondaryIcon = React.ComponentPropsWithoutRef<'div'>

export function DropdownSecondaryIcon({ className, ...props }: DropdownSecondaryIcon) {
    return <div 
        {...props}
        className={clsx(
            className,
            'col-start-5 row-start-1 flex justify-self-end',
            '[&>[data-slot=icon]]:col-start-5 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4',
            '[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-zinc-600 [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focus]:dark:text-zinc-300',
        )}
    />
}