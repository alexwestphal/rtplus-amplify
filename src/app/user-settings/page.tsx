
import { amplifyClient, type Schema } from '@/lib/amplify-client'

import Alert from '@/components/alert'
import Divider from '@/components/catalyst/divider'
import Heading from '@/components/catalyst/heading'

import D4HAccessKeysSection from './d4h-access-keys-section'
import PersonalDetailsSection from './personal-details-section'

export default function UserSettingsPage() {
    return <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        <Heading level={1}>User Settings</Heading>

        <Divider/>

        <PersonalDetailsSection/>

        <Divider/>

        <D4HAccessKeysSection/>

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




