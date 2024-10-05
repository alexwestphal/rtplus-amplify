
import { revalidatePath } from 'next/cache'

export async function addD4HAPIKey(data: FormData) {
    'use server'
    
    const accessKey = data.get('accessKey') as string

    revalidatePath('/user-settings')
}