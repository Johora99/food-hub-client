"use client"
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
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone is required"),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "CUSTOMER" },
  })

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up/email`, {
        method: "POST",
         headers: {
       "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        toast("Account created successfully!")
        reset();
        router.push("/login");
      } else {
        setError(result.message || "Failed to create account")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" {...register("name")} placeholder="Enter Your Name" />
              {errors.name && <FieldDescription className="text-red-500">{errors.name.message}</FieldDescription>}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" {...register("email")} placeholder="Enter Your Email" />
              {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>}
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" type="text" {...register("phone")} placeholder="Enter Your Phone Number" />
              {errors.phone && <FieldDescription className="text-red-500">{errors.phone.message}</FieldDescription>}
            </Field>

            {/* Role */}
            <Field>
              <FieldLabel htmlFor="role">Signup As</FieldLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val as "CUSTOMER" | "PROVIDER")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER">Customer</SelectItem>
                      <SelectItem value="PROVIDER">Provider</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <FieldDescription className="text-red-500">{errors.role.message}</FieldDescription>}
            </Field>

            {error && <p className="text-red-500 text-sm ">{error}</p>}
            {success && <p className="text-green-500 text-sm ">{success}</p>}

            {/* Buttons */}
            <FieldGroup>
              <Field>
                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 cursor-pointer" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                <Button variant="outline" type="button" className="mt-2">
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center mt-2">
                  Already have an account?{" "}
                  <Link href="/login" className="text-orange-500 hover:text-orange-600">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
