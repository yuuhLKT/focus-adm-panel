import { useFormMutate } from '@/hooks/useFormMutate'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { StatusSelect } from './index'

interface FormData {
    status: string
}

interface ChangeStatusProps {
    id: string
}

export const ChangeStatus = ({ id }: ChangeStatusProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { control, handleSubmit } = useForm<FormData>()
    const { updateStatusMutation } = useFormMutate()

    const onSubmit = (data: FormData) => {
        updateStatusMutation.mutate(
            { id, status: data.status },
            {
                onSuccess: () => {
                    setIsOpen(false)
                },
                onError: () => {
                    console.error('Failed to update status')
                },
            }
        )
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="mr-2"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                >
                    Change status
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change status of post</DialogTitle>
                    <DialogDescription>
                        Select the new status of the post.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <StatusSelect {...field} />}
                    />
                    <DialogFooter className="flex justify-end mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="mr-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
