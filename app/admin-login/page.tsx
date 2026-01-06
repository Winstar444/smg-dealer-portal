import LoginForm from "@/components/login-form"

export default function AdminLoginPage() {
  return <LoginForm role="admin" heading="Admin Login" dashboardRoute="/admin-dashboard" />
}