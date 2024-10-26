
import clsx from 'clsx'

export type DividerProps = React.ComponentPropsWithoutRef<'hr'> & {
    soft?: boolean
}

export default function Divider({className, soft, ...props}: DividerProps) {
    return <hr
        role="presentation"
        {...props}
        className={clsx(className, 'w-full border-t',
            soft ? 'border-zinc-950/5 dark:border-white/5' : 'border-zinc-950/10 dark:border-white/10'
        )}
    />
}

