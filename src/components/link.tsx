
import clsx from 'clsx'
import NextLink, { type LinkProps } from 'next/link'
import React, { forwardRef } from 'react'

import * as Headless from '@headlessui/react'

const Link = forwardRef(function Link(props: LinkProps & React.ComponentPropsWithoutRef<'a'>, ref: React.ForwardedRef<HTMLAnchorElement>) {
    return <Headless.DataInteractive>
        <NextLink {...props} ref={ref}/>
    </Headless.DataInteractive>
})

export default Link


export type EmailLinkProps = { email: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>

export function EmailLink({ email, className, ...props}: EmailLinkProps) {

    if(email == '') return null

    return <a
        {...props}
        className={clsx(
            className,
            'hover:underline'
        )}
        href={`mailto:${email}`}
    >{email}</a>
}

export type PhoneLinkProps = { phoneNumber: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>

export function PhoneLink({ phoneNumber, className, ...props}: PhoneLinkProps) {
    if(phoneNumber == '') return null

    let linkNumber = phoneNumber, displayNumber = phoneNumber
    if(phoneNumber.startsWith('642')) {
        // NZ Cell Number
        linkNumber = '+' + phoneNumber
        displayNumber = `0${phoneNumber.slice(2, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7)}`
    }

    return <a
        {...props}
        className={clsx(
            className,
            'font-mono hover:underline'
        )}
        href={`tel:${linkNumber}`}
    >{displayNumber}</a>

    
}