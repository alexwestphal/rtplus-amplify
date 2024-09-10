import clsx from 'clsx'


export default function Card({ className, ...props}: React.ComponentPropsWithoutRef<'div'>) {

    return <div 
        {...props}
        className={clsx(className, 'divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow')}
    />

}

export function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div {...props} className={clsx(className, 'px-4 py-5 sm:px-6')}/>
}

export function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div {...props} className={clsx(className, 'px-4 py-5 sm:p-6')}/>
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div {...props} className={clsx(className, 'px-4 py-4 sm:px-6')}/>
}