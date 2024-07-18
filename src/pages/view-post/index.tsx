import { ViewPostContent } from '@/components/Cards/view-post-content'
import { ErrorNotFoundPost } from '@/components/Error'
import { FeedbackDialogForm, ReportDialogForm } from '@/components/Form'
import { CommentForm } from '@/components/Form/comment-form'
import { ViewPostHeader } from '@/components/Header'
import { LoadingSpinner } from '@/components/Loading'
import { PostResponse } from '@/components/PostResponse'
import { useReportPostData } from '@/hooks/usePostData'
import { useCommentMutate } from '@/hooks/usePostMutate'
import { usePostComments } from '@/hooks/usePostResponse'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const ViewPost = () => {
    const { id } = useParams<{ id: string }>()
    const { deleteMutation } = useCommentMutate()
    const [deleted, setDeleted] = useState(false)

    const {
        data: postData,
        isLoading: isPostLoading,
        error: postError,
    } = useReportPostData(id!)
    const { data: commentData, isLoading: isCommentLoading } = usePostComments(
        id!
    )

    const handleDeleteComment = async (commentId: string) => {
        deleteMutation.mutate(commentId, {
            onSuccess: () => {
                setDeleted(true)
            },
        })
    }

    if (isPostLoading || isCommentLoading) {
        return <LoadingSpinner />
    }

    if (postError) {
        return <ErrorNotFoundPost />
    }

    return (
        <>
            <ViewPostHeader />
            {postData.type === 'FEEDBACK' ? (
                <FeedbackDialogForm />
            ) : (
                <ReportDialogForm />
            )}
            <div className="flex justify-center mb-3">
                <ViewPostContent
                    title={postData.title}
                    authorName={postData.authorName}
                    content={postData.content}
                    date={dayjs(postData.createdAt).format(
                        'DD/MM/YYYY - HH:mm'
                    )}
                    status={postData.status}
                />
            </div>
            <div className="flex justify-center">
                {commentData && !deleted ? (
                    <PostResponse
                        title={commentData.commentTitle}
                        message={commentData.content}
                        username={commentData.authorName}
                        date={dayjs(commentData.createdAt).format(
                            'DD/MM/YYYY - HH:mm'
                        )}
                        onDelete={() => handleDeleteComment(commentData.id)}
                    />
                ) : (
                    <CommentForm postId={id!} />
                )}
            </div>
        </>
    )
}
