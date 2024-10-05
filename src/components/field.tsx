/**
 * Field related components derived from Catalyst UI.
 */

import clsx from 'clsx'
import type React from 'react'

import * as Headless from '@headlessui/react'


type FieldsetProps = { className?: string } & Omit<Headless.FieldsetProps, 'className'>

export function Fieldset({ className, ...props }: FieldsetProps) {
    return <Headless.Fieldset
        {...props}
        className={clsx(className, '[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1')}
    />
}


type LegendProps = { className?: string } & Omit<Headless.LegendProps, 'className'>

export function Legend({ className, ...props }: LegendProps) {
    return <Headless.Legend
        data-slot="legend"
        {...props}
        className={clsx(
            className,
            'text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white'
        )}
    />
}


export function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="control" {...props} className={clsx(className, 'space-y-8')} />
}


type FieldProps = { className?: string } & Omit<Headless.FieldProps, 'className'>

export function Field({ className, ...props }: FieldProps) {
    return <Headless.Field
        {...props}
        className={clsx(
            className,
            '[&>[data-slot=label]+[data-slot=control]]:mt-3',
            '[&>[data-slot=label]+[data-slot=description]]:mt-1',
            '[&>[data-slot=description]+[data-slot=control]]:mt-3',
            '[&>[data-slot=control]+[data-slot=description]]:mt-3',
            '[&>[data-slot=control]+[data-slot=error]]:mt-3',
            '[&>[data-slot=label]]:font-medium'
        )}
    />
}


type LabelProps = { className?: string } & Omit<Headless.LabelProps, 'className'>

export function Label({ className, ...props }: LabelProps) {
    return <Headless.Label
        data-slot="label"
        {...props}
        className={clsx(
            className,
            'select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white'
        )}
    />
}


type DescriptionProps = { className?: string } & Omit<Headless.DescriptionProps, 'className'>

export function Description({ className, ...props }: DescriptionProps) {
    return <Headless.Description
        data-slot="description"
        {...props}
        className={clsx(
            className,
            'text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400'
        )}
    />
}


type ErrorMessageProps = { className?: string } & Omit<Headless.DescriptionProps, 'className'>

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
    return <Headless.Description
        data-slot="error"
        {...props}
        className={clsx(className, 'text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500')}
    />
}
