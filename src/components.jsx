import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/auth-context"
import { ThemeProvider } from "./components/ThemeProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import "./index.css"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Redirect root to dashboard or login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Public routes - accessible only when not logged in */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
            </Route>

            {/* Protected routes - accessible only when logged in */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
