
'use client'

import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Alert from '@/components/alert'
import Button from '@/components/button'
import Card from '@/components/card'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import Dialog, { DialogTitle, DialogDescription, DialogBody, DialogActions } from '@/components/dialog'
import { Description, Field, Label } from '@/components/field'
import Heading from '@/components/heading'
import Input from '@/components/input'
import Spinner from '@/components/spinner'
import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import Text from '@/components/text'

import { Schema, amplifyClient } from '@/lib/amplify-client'
import { D4hFetchClient } from '@/lib/d4h-api/client'
import type { WhoamiResponse } from '@/lib/d4h-api/whoami-response'




const QUERY_KEY = 'd4hAccessKeys'

type AccessKey = Schema['D4HAccessKey']['type']
type AccessKeyPartial = Pick<AccessKey, 'key' | 'label' | 'memberId' | 'teamName' | 'teamId' | 'primary'> // { key: string, label: string, memberId: number, teamName: string, teamId: number, primary: boolean }
type AccessKeyUpdate = Pick<AccessKey, 'id' | 'label' | 'primary'>

export default function D4HAccessKeysSection() {
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [updateSubject, setUpdateSubject] = useState<AccessKey | null>(null)
    const [deletionSubject, setDeletionSubject] = useState<AccessKey | null>(null)

    const queryClient = useQueryClient()

    const query = useQuery({ 
        queryKey: [QUERY_KEY], 
        queryFn: async () => {
            const { data: accessKeys } = await amplifyClient.models.D4HAccessKey.list()
            return accessKeys
        }
    })

    const createMutation = useMutation({
        mutationFn: async (accessKey: AccessKeyPartial) => {
            
            if(accessKey.primary) {
                await Promise.all(query.data!!
                    .filter(accessKey => accessKey.primary)
                    .map(accessKey => amplifyClient.models.D4HAccessKey.update({ ...accessKey, primary: false })
                ))
            }

            await amplifyClient.models.D4HAccessKey.create(accessKey)
        },
        onMutate: async (newAccessKey) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY] })

            // Snapshot the previous value
            const previousAccessKeys = queryClient.getQueryData([QUERY_KEY])

            // Optimistically update to the new value
            if(previousAccessKeys) {
                queryClient.setQueryData([QUERY_KEY], (old: AccessKey[]) => [...old, { ...newAccessKey, id: 'NEW' }])
            }

            // Return a context object with the snapshotted value
            return { previousAccessKeys }
        },
        onError: (error, newAccessKey, context) => {
            console.error("Error saving accessKey:", error, newAccessKey)
            if(context?.previousAccessKeys) {
                queryClient.setQueryData([QUERY_KEY], context.previousAccessKeys)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: async (update: AccessKeyUpdate) => {

            if(update.primary) {
                await Promise.all(query.data!!
                    .filter(accessKey => accessKey.primary && accessKey.id != update.id)
                    .map(accessKey => amplifyClient.models.D4HAccessKey.update({ ...accessKey, primary: false }))    
                )
            }

            await amplifyClient.models.D4HAccessKey.update(update)
        },
        onMutate: async (updatedAccessKey) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY]})

            // Snapshot the previous valie
            const previousAccessKeys = queryClient.getQueryData([QUERY_KEY])

            if(previousAccessKeys) {
                queryClient.setQueryData([QUERY_KEY], (old: AccessKey[]) => 
                    old.map(oldAccessKey => oldAccessKey.id == updatedAccessKey.id ? ({ ...oldAccessKey, ...updatedAccessKey }) : oldAccessKey)
                )
            }

            // Return a context object with the snapshotted value
            return { previousAccessKeys }

        },
        onError: (error, updatedAccessKey, context) => {
            console.error("Error saving accesskey:", error, updatedAccessKey)
            if(context?.previousAccessKeys) {
                queryClient.setQueryData([QUERY_KEY], context.previousAccessKeys)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (accessKeyId: string) => {
            await amplifyClient.models.D4HAccessKey.delete({ id: accessKeyId })
        },
        onMutate: async (accessKeyId) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY] })

            const previousAccessKeys = queryClient.getQueryData([QUERY_KEY])

            if(previousAccessKeys) {
                queryClient.setQueryData([QUERY_KEY], (old: AccessKey[]) =>
                    old.filter(accessKey => accessKey.id != accessKeyId)
                )
            }

            return { previousAccessKeys }
        },
        onError: (error, accessKeyId, context) => {
            console.error("Error deleting accesskey:", error, accessKeyId)
            if(context?.previousAccessKeys) {
                queryClient.setQueryData([QUERY_KEY], context.previousAccessKeys)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        }
    })

    return <section>
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <Heading level={2}>D4H Access Keys</Heading>
                <p className="mt-2 text-sm text-gray-700">
                    A list of the D4H access keys that you have configured.
                </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <Button onClick={() => setAddDialogOpen(true)}>
                    Add key
                </Button>
            </div>
        </div>
        
        <Card className="mt-4 px-6 sm:px-8">
            { query.isError && <div>Error Loading D4H Access Key</div>}
            { query.isLoading && <div>Loading D4H Access Keys...</div>}
            { query.isSuccess && query.data && (query.data.length
                ? <Table bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Label</TableHeader>
                            <TableHeader>Team</TableHeader>
                            <TableHeader>Created At</TableHeader>
                            <TableHeader align="center">Primary</TableHeader>
                            <TableHeader>
                                <span className="sr-only">Edit</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {query.data.map((accessKey) => {
                            return <TableRow key={accessKey.id}>
                                <TableCell className="text-gray-900 font-medium">{accessKey.label}</TableCell>
                                <TableCell className="text-gray-500">{accessKey.teamName}</TableCell>
                                <TableCell className="text-gray-500">{accessKey.createdAt}</TableCell>
                                <TableCell className="text-gray-500" align="center">{accessKey.primary ? "YES" : null}</TableCell>
                                <TableCell className="text-right">
                                    <Button plain onClick={() => setUpdateSubject(accessKey)}>
                                        Update<span className="sr-only"> Access Key</span>
                                    </Button>
                                    <Button plain onClick={() => setDeletionSubject(accessKey)}>
                                        Delete<span className="sr-only"> Access Key</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                : <Alert 
                    className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
                    severity="info" 
                    title="No Access Keys Defined"
                >Click "Add Key" to create one.</Alert>
            )}
        </Card>
        <NewAccessKeyDialog
            open={addDialogOpen}
            onClose={() => setAddDialogOpen(false)}
            onSubmit={createMutation.mutate}
        />
        {updateSubject != null && <UpdateAccessKeyDialogProps
            accessKey={updateSubject}
            open={updateSubject != null}
            onClose={() => setUpdateSubject(null)}
            onUpdate={updateMutation.mutate}
        />}
        {deletionSubject != null && <DeleteAccessKeyDialog
            accessKey={deletionSubject}
            open={deletionSubject != null}
            onClose={() => setDeletionSubject(null)}
            onDelete={deleteMutation.mutate}
        />}
    </section>
}


interface NewAccessKeyDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (accessKey: AccessKeyPartial) => void
}

function NewAccessKeyDialog({ open, onClose, onSubmit }: NewAccessKeyDialogProps) {

    const [key, setKey] = useState("")
    const [label, setLabel] = useState("")
    const [primary, setPrimary] = useState(true)

    type Validation = { status: 'Init' } | { status: 'Validating' } | { status: 'Error', message: string } | { status: 'Success', data: WhoamiResponse } | { status: 'Submitting' }

    const [validation, setValidation] = useState<Validation>({ status: 'Init' })
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)

    function handleClose() {
        setKey("")
        setLabel("")
        setValidation({ status: 'Init' })
        setSelectedMemberId(null)
        onClose()
    }

    async function handleValidate() {
        setValidation({ status: 'Validating' })

        const { data, error, response } = await D4hFetchClient.GET('/v3/whoami', { headers: { Authorization: `Bearer ${key}` }});

        if(error) {
            setValidation({ status: 'Error', message: error })
        }
        if(data) {
            setValidation({ status: 'Success', data: data as WhoamiResponse })
        }
    }

    function handleSave() {

        if(validation.status == 'Success' && selectedMemberId != null) {
            setValidation({ status: 'Submitting' })

            const team = validation.data.members.find(member => member.id == selectedMemberId)!!.owner

            onSubmit({ key, label, memberId: selectedMemberId, teamId: team.id, teamName: team.title, primary })

            handleClose()
        }
    }

    return <Dialog 
        open={open}
        onClose={handleClose}
        size="2xl"
    >
        <DialogTitle>New API Key</DialogTitle>
        <DialogDescription>
            {"In D4H navigate to Profile > My Settings > API Access Keys. Create a new access key and paste below."}
        </DialogDescription>
        <DialogBody>
            <Field className='mb-4'>
                <Label>Access Key</Label>
                <Input 
                    value={key}
                    onChange={ev => setKey(ev.target.value)}
                    disabled={validation.status != 'Init'}
                    autoFocus
                />
            </Field>
            <Field className='mb-4'>
                <Label>Label</Label>
                <Input
                    value={label}
                    onChange={ev => setLabel(ev.target.value)}
                />
            </Field>
            <CheckboxField className="mb-4">
                <Checkbox checked={primary} onChange={(checked) => setPrimary(checked)}/>
                <Label>Make primary</Label>
                <Description>Mark this access key as primary (default) access key.</Description>
            </CheckboxField>
            {validation.status == 'Error' && <Alert severity='error' title={validation.message}/>}
            {validation.status == 'Success' && <>
                <Text className="mt-8 mb-4">Found memberships to the following teams. Please select the one you would like to use with this access key.</Text>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader className="text-right">ID</TableHeader>
                            <TableHeader>Title</TableHeader>
                            <TableHeader className="text-center">Permissions</TableHeader>
                            <TableHeader className="text-center">Use</TableHeader>
                        </TableRow>    
                    </TableHead>
                    <TableBody>
                        {validation.data.members
                            .filter(member => member.owner.resourceType == 'Team')
                            .map(member => 
                                <TableRow key={member.id}>
                                    <TableCell className="text-right">{member.owner.id}</TableCell>
                                    <TableCell>{member.owner.title}</TableCell>
                                    <TableCell className="text-center">{member.permissions ? "YES" : "NO"}</TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox 
                                            checked={selectedMemberId == member.id}
                                            onChange={(checked) => {
                                                if(checked) setSelectedMemberId(member.id)
                                                else setSelectedMemberId(null)
                                            }}    
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        }    
                    </TableBody>    
                </Table>
            </>}
        </DialogBody>
        <DialogActions>
            { validation.status == 'Init' && <>
                <Button plain onClick={handleClose}>Cancel</Button>
                <Button onClick={handleValidate} disabled={key.length == 0}>Validate</Button>
            </>}
            { validation.status == 'Validating' || validation.status == 'Submitting' && <Spinner/>}
            { validation.status == 'Success' && <>
                <Button plain onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={selectedMemberId == null}>Save</Button>
            </>}
        </DialogActions>
    </Dialog>
}

interface UpdateAccessKeyDialogProps {
    accessKey: AccessKey
    open: boolean
    onClose: () => void
    onUpdate: (accessKey: AccessKeyUpdate) => void
}

function UpdateAccessKeyDialogProps({ accessKey: { id, label, primary }, open, onClose, onUpdate }: UpdateAccessKeyDialogProps) {
    const [updated, setUpdated] = useState<AccessKeyUpdate>({ id, label, primary })

    function handleUpdate() {
        onUpdate(updated)
        onClose()
    }

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Access Key</DialogTitle>
        <DialogBody>
            <Field className="mb-4">
                <Label>Label</Label>
                
                <Input
                    value={updated.label}
                    onChange={ev => setUpdated(prev => ({...prev, label: ev.target.value}))}
                />
            </Field>
            <CheckboxField className="mb-4">
                <Checkbox checked={updated.primary} onChange={(checked) => setUpdated(prev => ({ ...prev, primary: checked }))}/>
                <Label>Make primary</Label>
                <Description>Mark this access key as primary (default) access key.</Description>
            </CheckboxField>
        </DialogBody>
        <DialogActions>
            <Button plain onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
    </Dialog>
}


interface DeleteAccessKeyDialogProps {
    accessKey: AccessKey
    open: boolean
    onClose: () => void
    onDelete: (accessKeyId: string) => void
}

function DeleteAccessKeyDialog({ accessKey, open, onClose, onDelete }: DeleteAccessKeyDialogProps) {
    function handleDelete() {
        onDelete(accessKey.id)
        onClose()
    }

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Access Key</DialogTitle>
        <DialogDescription>Confirm deletion of access key '{accessKey.label}'.</DialogDescription>
        <DialogActions>
            <Button plain onClick={onClose}>Cancel</Button>
            <Button color='red' onClick={handleDelete}>Delete</Button>
        </DialogActions>
    </Dialog>
}