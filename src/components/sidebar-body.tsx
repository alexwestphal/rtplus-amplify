
import clsx from 'clsx'     

import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'


import Logo from './logo'


const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
  ]
  const teams = [
    { id: 1, name: 'NZ-RT10 Christchurch', href: '#', initial: '10', current: false },
    { id: 2, name: 'NZ-RT11 Christchurch', href: '#', initial: '11', current: false },
    { id: 3, name: 'NZ-RT14 Christchurch', href: '#', initial: '14', current: false },
  ]

export default function SidebarBody() {
    return <div className="flex grow flex-col gap-y-5 overflow-y-auto lg:border-r lg:border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
            <Logo className="mx-auto mt-5 h-20 w-auto"/>
        </div>
        <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
            <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                <li key={item.name}>
                    <a
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
                    </a>
                </li>
                ))}
            </ul>
            </li>
            <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
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
            <li className="mt-auto">
            <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
                <Cog6ToothIcon
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                />
                Settings
            </a>
            </li>
        </ul>
        </nav>
    </div>
}