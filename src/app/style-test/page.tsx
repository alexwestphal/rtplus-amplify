
import Heading from '@/components/catalyst/heading'

export default function StyleTestPage() {

    return <div className="mx-auto max-w-7xl">
        <Heading level={1}>Style Testing</Heading>

        <section className="my-4">
            <div className="divide-y divide-gray-500">
                <div className="bg-red-100 w-20 h-20"></div>
                <div className="bg-blue-100 w-20 h-20"></div>
            </div>
            
        </section>

    </div>
}