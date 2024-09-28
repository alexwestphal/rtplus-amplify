import { type ClientSchema, a, defineData } from '@aws-amplify/backend'


const schema = a.schema({
    ExternalAPIKey: a
        .model({
            key: a.string(),
            service: a.enum(['D4H']),
            metadata: a.json()
        })
        .authorization((allow) => [allow.owner()]),
    Todo: a
        .model({
            content: a.string(),
            done: a.boolean()
        })
        .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
})
