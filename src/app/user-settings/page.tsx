'use client'

import { useState, useEffect } from 'react'


import { amplifyClient, type Schema } from '@/lib/amplify-client'

import Alert from '@/components/alert'
import Card, { CardContent } from '@/components/card'
import Dialog, { DialogTitle, DialogDescription, DialogBody, DialogActions } from '@/components/dialog'
import Divider from '@/components/divider'
import Heading from '@/components/heading'
import Button from '@/components/button'

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

export default function UserSettingsPage() {
    return <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        <Heading level={1}>User Settings</Heading>

        <Divider/>

        <section>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <Heading level={2}>Personal</Heading>
                    <p className="mt-2 text-sm text-gray-700">
                        Your basic personal details as configured on D4H.
                    </p>
                </div>
            </div>
            <Alert className="mt-8" severity="warning" title="Not Connected">
                A configured D4H key is required to fetch this data.
            </Alert>
            {/* <Card className="mt-8">
                <CardContent>
                    <dl className="space-y-6 divide-y divide-gray-100 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">Tom Cook</div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Update
                            </button>
                        </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">tom.cook@example.com</div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Update
                            </button>
                        </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">Human Resources Manager</div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Update
                            </button>
                        </dd>
                        </div>
                    </dl>
                </CardContent>
            </Card> */}
        </section>

        

        <Divider/>

        <D4HAPIKeysSection/>

        {/* <Divider/>

        <Card>
            <CardContent>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>

                <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <li className="flex justify-between gap-x-6 py-6">
                    <div className="font-medium text-gray-900">QuickBooks</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Update
                    </button>
                    </li>
                </ul>

                <div className="flex border-t border-gray-100 pt-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    <span aria-hidden="true">+</span> Add another application
                    </button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardContent>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                Choose what language and date format to use throughout your account.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">English</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Update
                    </button>
                    </dd>
                </div>
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">DD-MM-YYYY</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Update
                    </button>
                    </dd>
                </div>
                <Field className="flex pt-6">
                    <Label as="dt" passive className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                    Automatic timezone
                    </Label>
                    <dd className="flex flex-auto items-center justify-end">
                    <Switch
                        checked={automaticTimezoneEnabled}
                        onChange={setAutomaticTimezoneEnabled}
                        className="group flex w-8 cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                    >
                        <span
                        aria-hidden="true"
                        className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                        />
                    </Switch>
                    </dd>
                </Field>
                </dl>
            </CardContent>
        </Card> */}
    </div>
}



function D4HAPIKeysSection() {
    const [dialogOpen, setDialogOpen] = useState(false)

    return <section>
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h2 className="text-base font-semibold leading-6 text-gray-900">D4H API Keys</h2>
                <p className="mt-2 text-sm text-gray-700">
                    A list of the D4H API keys that you have configured.
                </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <Button onClick={() => setDialogOpen(true)}>
                    Add key
                </Button>
            </div>
        </div>
        
        <Card className="mt-8">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                        <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {person.name}</span>
                            </a>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>New API Key</DialogTitle>
            <DialogDescription>
                Paste the D4H API Key below:
            </DialogDescription>
            <DialogBody></DialogBody>
        </Dialog>
    </section>
}
