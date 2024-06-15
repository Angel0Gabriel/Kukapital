/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const userSignInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string().min(3, 'Insira pelo menos 3 caracteres'),
})

type UserSignInFormSchemaType = z.infer<typeof userSignInFormSchema>

export default function LoginForm() {
  const [user, setUser] = useState<any>()

  const { handleSubmit, register, formState, reset } =
    useForm<UserSignInFormSchemaType>({
      resolver: zodResolver(userSignInFormSchema),
    })

  const { errors, isSubmitting } = formState

  async function handleCreateUser(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 1))

    console.log(data)

    setUser(data)
    reset()
  }

  console.log(errors)

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-lg p-16">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex flex-col gap-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register('email')}
                  />
                  {errors?.email && (
                    <span className="text-xs text-red-600">
                      {errors.email.message as string}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register('password')}
                  />
                  {errors?.password && (
                    <span className="text-xs text-red-600">
                      {errors.password.message as string}
                    </span>
                  )}
                </div>
              </div>
              <Button disabled={isSubmitting} type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
