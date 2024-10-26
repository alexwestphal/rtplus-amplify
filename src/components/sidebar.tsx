
'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { useAuthenticator } from '@aws-amplify/ui-react'
import { Dialog, DialogBackdrop, DialogPanel, Menu, MenuButton, TransitionChild } from '@headlessui/react'
import { ArrowLeftStartOnRectangleIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/20/solid'
import {
    CalendarIcon,
    ChartPieIcon,
    HomeIcon,
    UsersIcon,
    UserCircleIcon,
    XMarkIcon
  } from '@heroicons/react/24/outline'


import Divider from './divider'
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu, DropdownSection } from './dropdown'
import Link from './link'
import Logo from './logo'
import TopBar from './topbar'



const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Personnel', href: 'personnel', icon: UsersIcon, current: false },
    // { name: 'Team', href: '#', icon: UsersIcon, current: false },
    // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
    // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '/reports', icon: ChartPieIcon, current: false },
  ]
  const teams = [
    { id: 1, name: 'NZ-RT10 Christchurch', href: '#', initial: '10', current: false },
    { id: 2, name: 'NZ-RT11 Christchurch', href: '#', initial: '11', current: false },
    { id: 3, name: 'NZ-RT14 Christchurch', href: '#', initial: '14', current: false },
  ]


export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return <>
        {/* Dynamic sidebar for mobile */}
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
                <DialogPanel
                    transition
                    className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                >
                    <TransitionChild>
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                            <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                <span className="sr-only">Close sidebar</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </button>
                        </div>
                    </TransitionChild>
                    <SidebarBody/>
                </DialogPanel>
            </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
            <SidebarBody/>
        </div>

        <TopBar setSidebarOpen={setSidebarOpen}/>
    </>
}


function SidebarBody() {

    const { user, signOut } = useAuthenticator((context) => [context.user])

    async function handleSignOut() {
        signOut()
    }

    return <div className="flex grow flex-col overflow-y-auto lg:border-r lg:border-gray-200 bg-white">
        <div className="flex h-10 shrink-0 items-center my-2 p-2">
            <div className="flex-grow">
                <Logo className="h-10"/>
            </div>
            <Dropdown as="div">
                <DropdownButton className="rouded-md text-gray-400 hover:bg-gray-100 p-2">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon aria-hidden="true" className="h-6 w-6" />
                </DropdownButton>
                <DropdownMenu anchor="top end" className='z-10'>
                    <DropdownSection>
                        <DropdownItem href="/user-settings">
                            <UserIcon/>
                            <DropdownLabel>My Settings</DropdownLabel>
                        </DropdownItem>
                        <DropdownItem href="/about">
                            <QuestionMarkCircleIcon/>
                            <DropdownLabel>About</DropdownLabel>
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownDivider/>
                    <DropdownSection>
                        <DropdownItem onClick={handleSignOut}>
                            <ArrowLeftStartOnRectangleIcon/>
                            <DropdownLabel>Sign out</DropdownLabel>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
        <Divider className="mb-2"/>
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className=" space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        item.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                    )}
                                >
                                    <item.icon
                                        aria-hidden="true"
                                        className={clsx(
                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                            'h-6 w-6 shrink-0',
                                        )}
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <div className="px-2 text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                    <ul role="list" className=" mt-2 space-y-1">
                        {teams.map((team) => (
                            <li key={team.name}>
                                <a
                                    href={team.href}
                                    className={clsx(
                                        team.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                    )}
                                >
                                    <span
                                        className={clsx(
                                        team.current
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                        )}
                                    >
                                        {team.initial}
                                    </span>
                                    <span className="truncate">{team.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
}