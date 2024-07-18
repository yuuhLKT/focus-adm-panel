import { useFormMutate } from '@/hooks/useFormMutate'
import { Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ChangeStatus } from '../Select/select-dialog'
import { StatusBadge } from '../Status'
import { Button } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { useToast } from '../ui/use-toast'

interface MessageCardProps {
    id: string
    title: string
    author: string
    date: string
    content: string
    status: 'OPEN' | 'WORKING' | 'SOLVED' | 'FEEDBACK'
}

export const MessageCard = ({
    id,
    title,
    author,
    date,
    content,
    status,
}: MessageCardProps) => {
    const navigate = useNavigate()
    const { deleteMutation } = useFormMutate()
    const { toast } = useToast()

    const goToPost = () => {
        navigate(`/post/${id}`)
    }

    const handleDelete = () => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Deleted with success.',
                    description: 'The post was removed.',
                })
            },
            onError: () => {
                toast({
                    variant: 'error',
                    title: 'Ops, something went wrong.',
                    description: 'Please try again later.',
                })
            },
        })
    }

    return (
        <div className="flex justify-center mb-3">
            <Card className="w-[850px] h-48">
                <CardHeader className="flex-grow">
                    <CardTitle className="mb-1">{title}</CardTitle>
                    <CardDescription className="ml-4">
                        <span>{author}</span>
                        <div className="flex flex-col items-end space-y-1 -mt-10">
                            <StatusBadge status={status} />
                            <span>{date}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="-mt-2">
                    <div className="truncate">{content}</div>
                    <div className="flex justify-end mt-3">
                        <Button
                            className="mr-2"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 size={16} />
                        </Button>
                        <ChangeStatus id={id} />
                        <Button onClick={goToPost}>See more</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
