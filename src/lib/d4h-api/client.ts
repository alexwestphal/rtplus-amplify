import createClient from 'openapi-fetch'
import type { paths } from './schema'

export const D4HClient = createClient<paths>({ baseUrl: 'https://api.team-manager.ap.d4h.com' })