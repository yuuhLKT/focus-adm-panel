import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import FocusIcon from '../../assets/focus.svg'

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const SignInPage = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [, setCookie] = useCookies(['isLoggedIn'])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const emailInput = document.getElementById('email') as HTMLInputElement
        const passwordInput = document.getElementById(
            'password'
        ) as HTMLInputElement

        try {
            const formData = {
                email: emailInput.value,
                password: passwordInput.value,
            }
            signInSchema.parse(formData)
            if (
                formData.email === import.meta.env.VITE_EMAIL_ACCESS &&
                formData.password === import.meta.env.VITE_PASSWORD_ACCESS
            ) {
                const expirationDate = new Date()
                expirationDate.setTime(
                    expirationDate.getTime() + 6 * 60 * 60 * 1000 // 6 hours
                )
                setCookie('isLoggedIn', 'true', {
                    path: '/',
                    expires: expirationDate,
                })

                navigate('/home')
            } else {
                toast({
                    variant: 'error',
                    title: 'Login failed',
                    description: 'Email or password is incorrect.',
                })
            }
        } catch (error) {
            toast({
                variant: 'error',
                title: 'Validation error',
            })
        }
    }

    return (
        <>
            <div className="flex items-center justify-center gap-8 mt-16">
                <img
                    src={FocusIcon}
                    alt="Focus Mode extension icon."
                    className="h-44 w-44"
                />
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold">
                        FOCUS <span className="text-[#666DDC]">MODE</span>
                    </h1>
                    <h2 className="text-xl mt-2 ml-2 text-[#FF336D]">
                        Block websites that distract you.
                    </h2>
                </div>
            </div>
            <div className="flex justify-center mt-12">
                <Card className="h-auto w-[450px]">
                    <CardHeader className="text-center">
                        <CardTitle>Login in dashboard</CardTitle>
                        <CardDescription>
                            Please enter the email and password for login in the
                            Focus Dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <form onSubmit={handleSubmit}>
                                <Label className="mb-1">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                />
                                <Label className="mb-1">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                />
                                <div className="flex justify-end mt-4">
                                    <Button type="submit">Login</Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Toaster />
        </>
    )
}
