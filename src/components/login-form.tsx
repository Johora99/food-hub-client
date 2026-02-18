"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/sign-in/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const result = await res.json()

      if (res.ok) {
        router.push("/")
      } else {
        setError(result.message || "Invalid credentials")
      }

    } catch (err) {
      console.error(err)
      setError("Failed to login. Server error.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>

              {/* Email */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel>Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* Buttons */}
              <Field>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Button variant="outline" type="button">
                  Login with Google
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-orange-500"
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
