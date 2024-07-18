import { useCommentMutate } from '@/hooks/usePostMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { StatusSelect } from '../Select'
import { Button } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const commentSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters.')
        .max(25, 'Title must be at most 25 characters.'),
    authorName: z.string().min(3).max(25),
    content: z
        .string()
        .min(30, 'The comment must be at least 30 characters.')
        .max(255, 'The comment must be at most 255 characters.'),
    status: z.string().optional(),
})

interface CommentFormProps {
    postId: string
}

export const CommentForm = ({ postId }: CommentFormProps) => {
    const { createMutation } = useCommentMutate()
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            authorName: 'yuuhrizin',
            content: '',
            status: '',
        },
    })

    const onSubmit = (data: z.infer<typeof commentSchema>) => {
        const { title, content, authorName, status } = data
        const commentData = {
            comment: {
                commentTitle: title,
                content,
                authorName,
                reportFeedbackId: postId,
            },
            ...(status && { status }),
        }

        createMutation.mutate(commentData)
    }

    return (
        <div>
            <Card className="w-[850px] h-auto">
                <CardHeader className="flex-grow">
                    <CardTitle className="mb-1">Comment Form</CardTitle>
                    <CardDescription>
                        Make a comment on post and update post status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="-mt-2">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <Label>Title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Title"
                                {...form.register('title')}
                                className="mt-1 block w-full"
                            />
                            {form.formState.errors.title && (
                                <span className="text-red-600 text-sm mb-1">
                                    {form.formState.errors.title.message}
                                </span>
                            )}
                        </div>

                        <div className="mb-4 flex space-x-4">
                            <div className="flex-1">
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    {...form.register('authorName')}
                                    className="mt-1 block w-full mb-1"
                                />
                                {form.formState.errors.authorName && (
                                    <span className="text-red-600 text-sm">
                                        {
                                            form.formState.errors.authorName
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div className="w-1/3">
                                <Label>Status</Label>
                                <Controller
                                    control={form.control}
                                    name="status"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StatusSelect {...field} />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <Label>Message</Label>
                            <Textarea
                                placeholder="Type your message here."
                                id="content"
                                {...form.register('content')}
                                className="mt-1 block w-full resize-none mb-1 textAreaScroll"
                            />
                            {form.formState.errors.content && (
                                <span className="text-red-600 text-sm">
                                    {form.formState.errors.content.message}
                                </span>
                            )}
                        </div>

                        <Button type="submit" className="mt-4 w-full">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
