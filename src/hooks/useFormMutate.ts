import { formSchema } from '@/components/Form/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const headers = {
    'Content-Type': 'application/json',
    'authorization': import.meta.env.VITE_HEADER_AUTHORIZATION
}

const postFormData = async (data: formSchema) => {
    const response = await axios.post(`${apiUrl}/report-feedback`, data, { headers })
    return response.data
}

const deleteFormData = async (id: string) => {
    const response = await axios.delete(`${apiUrl}/report-feedback/${id}`, { headers })
    return response.data
}

const updateStatus = async ({ id, status }: { id: string, status: string }) => {
    const response = await axios.patch(`${apiUrl}/report-feedback/${id}`, { status }, { headers })
    return response.data
}

export function useFormMutate() {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: postFormData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reportData'] })
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
        },
        retry: false,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteFormData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reportData'] })
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
        },
        retry: false,
    })

    const updateStatusMutation = useMutation({
        mutationFn: updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reportData'] })
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
        },
        retry: false,
    })

    return { createMutation, deleteMutation, updateStatusMutation }
}
