import { formSchema } from '@/components/Form/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const headers = {
    'Content-Type': 'application/json',
    'authorization': import.meta.env.VITE_HEADER_AUTHORIZATION
}

const postFormData = async (data: formSchema) => {
    const response = await axios.post('http://localhost:3001/report-feedback', data, { headers })
    return response.data
}

const deleteFormData = async (id: string) => {
    const response = await axios.delete(`http://localhost:3001/report-feedback/${id}`, { headers })
    return response.data
}

const updateStatus = async ({ id, status }: { id: string, status: string }) => {
    const response = await axios.patch(`http://localhost:3001/report-feedback/${id}`, { status }, { headers })
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
    })

    const deleteMutation = useMutation({
        mutationFn: deleteFormData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reportData'] })
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
        },
    })

    const updateStatusMutation = useMutation({
        mutationFn: updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reportData'] })
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
        }
    })

    return { createMutation, deleteMutation, updateStatusMutation }
}
