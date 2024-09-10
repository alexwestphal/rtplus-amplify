
import { revalidatePath } from 'next/cache'

import { cookiesClient } from '@/lib/amplify-server'


export async function addTodo(data: FormData) {
    'use server'
    console.log("addTodo START")

    const text = data.get('newTodoText') as string
    await cookiesClient.models.Todo.create({
        content: text,
        done: false,
    })
    revalidatePath('/manage/todos')

    console.log("addTodo END")
}