import { type ClientSchema, a, defineData } from '@aws-amplify/backend'


const schema = a.schema({
    D4HAccessKey: a
        .model({
            key: a.string().required(),
            label: a.string().required(),
            memberId: a.integer().required(),
            teamId: a.integer().required(),
            teamName: a.string().required(),
            primary: a.boolean().required()
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
