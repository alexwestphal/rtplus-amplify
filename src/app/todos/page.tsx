'use client'

import { PlusIcon } from '@heroicons/react/20/solid'
import { useSuspenseQuery } from '@tanstack/react-query'

import { addTodo } from './actions'
import { amplifyClient } from '@/lib/amplify-client'


async function fetchTodos() {
    const { data } = await amplifyClient.models.Todo.list()
    
    return data.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

async function deleteTodo(id: string) {
    await amplifyClient.models.Todo.delete({ id })
}

export default function TodosPage() {
    
    const { data: todos } = useSuspenseQuery({ queryKey: ['todos'], queryFn: fetchTodos })


    return <div className="w-[600px] mx-auto">
        <h2 className="mb-4 text-base font-semibold leading-6 text-gray-900">To-do List</h2>
        { todos.length ? 
            <ul role="list" className="space-y-3 mb-4">
                {todos.map((todo, index) => 
                    <li key={todo.id} className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
                        {index+1}. {todo.content}
                    </li>
                )}
            </ul>
            : <div className="mb-4 text-base">No To-dos Yet</div>
        }
        <form className="flex rounded-md bg-white shadow">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                    id="newTodoText"
                    name="newTodoText"
                    type="text"
                    placeholder="New To-do"
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   
                />
            </div>
            <button
                type="submit"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                <PlusIcon aria-hidden="true" className="-ml-0.5 h-5 w-5 text-gray-400"/>
                Add
            </button>
        </form>
    </div>
}