import { useFormMutate } from '@/hooks/useFormMutate'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
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
import { useToast } from '../ui/use-toast'

interface DeleteDialogProps {
    id: string
}
export const DeleteDialog = ({ id }: DeleteDialogProps) => {
    const { deleteMutation } = useFormMutate()
    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Deleted with success.',
                    description: 'The post was removed.',
                })
                setIsOpen(false)
            },
            onError: () => {
                toast({
                    variant: 'error',
                    title: 'Ops, something went wrong.',
                    description: 'Please try again later.',
                })
                setIsOpen(false)
            },
        })
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="mr-2" variant="destructive">
                    <Trash2 size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete the post</DialogTitle>
                    <DialogDescription>
                        You are about to delete the post. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="mr-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
