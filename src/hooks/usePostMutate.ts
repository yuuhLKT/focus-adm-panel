import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const headers = {
    'Content-Type': 'application/json',
    'authorization': import.meta.env.VITE_HEADER_AUTHORIZATION
}

interface CommentData {
    comment: {
        commentTitle: string
        content: string
        authorName: string
        reportFeedbackId: string
    },
    status?: string
}

const postCommentData = async (data: CommentData) => {
    const response = await axios.post('http://localhost:3001/admin/comments', data, { headers })
    return response.data
}

const deleteCommentData = async (id: string) => {
    const response = await axios.delete(`http://localhost:3001/admin/comments/${id}`, { headers })
    return response.data
}

export function useCommentMutate() {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: postCommentData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['postComments'] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteCommentData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['postComments'] })
        },
    })

    return { createMutation, deleteMutation }
}
