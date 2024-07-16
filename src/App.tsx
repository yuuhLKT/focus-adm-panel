import { ThemeProvider } from '@/components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import { ModeToggle } from './components/mode-toggle'
import { FeedbackPage } from './pages/feedback'
import { HomePage } from './pages/home'
import { ReportPage } from './pages/report'
import { SignInPage } from './pages/sign-in'
import { ViewPost } from './pages/view-post'
import ProtectedRoute from './route/protected-route'

function App() {
    return (
        <ThemeProvider>
            <div className="w-full h-full">
                <div className="fixed top-8 right-12">
                    <ModeToggle />
                </div>
                <Routes>
                    <Route path="/" element={<SignInPage />} />
                    <Route
                        path="/report"
                        element={<ProtectedRoute element={ReportPage} />}
                    />
                    <Route
                        path="/feedback"
                        element={<ProtectedRoute element={FeedbackPage} />}
                    />
                    <Route
                        path="/post/:id"
                        element={<ProtectedRoute element={ViewPost} />}
                    />
                    <Route
                        path="/home"
                        element={<ProtectedRoute element={HomePage} />}
                    />
                </Routes>
            </div>
        </ThemeProvider>
    )
}

export default App
