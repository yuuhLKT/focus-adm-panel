import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({
    element: Element,
}: {
    element: React.ElementType
}) => {
    const [cookies] = useCookies(['isLoggedIn'])

    if (cookies.isLoggedIn) {
        return <Element />
    } else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoute
