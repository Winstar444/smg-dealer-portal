import LoginForm from "@/components/login-form"

export default function CustomerLoginPage() {
  return (
    <LoginForm role="customer" heading="Customer Login" dashboardRoute="/customer-dashboard" showSignupOption={true} />
  )
}
