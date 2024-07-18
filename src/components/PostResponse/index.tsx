import { Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface PostResponseProps {
    title: string
    message: string
    username: string
    date: string
    onDelete: () => void
}

export const PostResponse = ({
    title,
    message,
    username,
    date,
    onDelete,
}: PostResponseProps) => {
    return (
        <div className="flex justify-center mb-3 mt-12">
            <Card className="w-[850px] h-auto">
                <div className="flex flex-col">
                    <CardHeader className="flex items-center justify-end">
                        <div className="flex items-center">
                            <div className="text-center">
                                <CardTitle className="mb-2">{title}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="break-words whitespace-pre-wrap">
                            {message}
                        </div>
                        <div className="text-center flex flex-col justify-center items-center">
                            <Avatar className="mt-6">
                                <AvatarImage src="https://i.pinimg.com/736x/94/99/d3/9499d329de7f73295a0254a76dcc758a.jpg" />
                                <AvatarFallback>ADM</AvatarFallback>
                            </Avatar>
                            <span>{username}</span>
                            <span className="text-xs text-gray-500">
                                {date}
                            </span>
                            <Button
                                className="mt-5"
                                variant="destructive"
                                onClick={onDelete}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}
