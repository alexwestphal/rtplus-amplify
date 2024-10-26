
import clsx from 'clsx'

export type SkeletonProps = {} & React.ComponentPropsWithoutRef<'div'>

export function Skeleton({className, role = "status", ...props}: SkeletonProps) {
    return <div 
        {...props}
        className={clsx(
            className,
            'max-w-full h-20 p2 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse'
        )}
        role={role}
    />
}