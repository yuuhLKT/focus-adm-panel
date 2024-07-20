import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

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
    const response = await axios.post(`${apiUrl}/admin/comments`, data, { headers })
    return response.data
}

const deleteCommentData = async (id: string) => {
    const response = await axios.delete(`${apiUrl}/admin/comments/${id}`, { headers })
    return response.data
}

export function useCommentMutate() {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: postCommentData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['postComments'] })
        },
        retry: false,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteCommentData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['postComments'] })
        },
        retry: false,
    })

    return { createMutation, deleteMutation }
}
