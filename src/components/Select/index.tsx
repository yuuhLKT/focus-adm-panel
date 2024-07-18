import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { StatusBadge } from '../Status'

interface StatusSelectProps extends ControllerRenderProps {
    //
}

export function StatusSelect({ onChange, value }: StatusSelectProps) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Choose a status" />
            </SelectTrigger>
            <SelectContent className="text-center">
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="no-change">DON'T CHANGE</SelectItem>
                    <SelectItem value="open">
                        <StatusBadge status="OPEN" />
                    </SelectItem>
                    <SelectItem value="working">
                        <StatusBadge status="WORKING" />
                    </SelectItem>
                    <SelectItem value="solved">
                        <StatusBadge status="SOLVED" />
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
