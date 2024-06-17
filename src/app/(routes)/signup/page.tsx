/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const userSignUpFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'O nome é obrigatório')
    .regex(/^[A-Za-z]+$/, 'Insira apenas letras'),
  lastName: z
    .string()
    .min(1, 'O sobrenome é obrigatório')
    .regex(/^[A-Za-z]+$/, 'Insira apenas letras'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string().min(3, 'A senha deve conter pelo menos 3 caracteres'),
})

type UserSignUpFormSchemaType = z.infer<typeof userSignUpFormSchema>

export default function SignUpForm() {
  const [createNewUser, setCreateNewUser] = useState<any>()

  const router = useRouter()

  const { handleSubmit, register, formState, reset } =
    useForm<UserSignUpFormSchemaType>({
      resolver: zodResolver(userSignUpFormSchema),
    })

  const { errors, isSubmitting } = formState

  async function handleCreateNewUser(data: any) {
    const { firstName, lastName, ...rest } = data

    const newData = {
      name: `${firstName} ${lastName}`,
      ...rest,
    }

    try {
      axios.post('http://localhost/4000/users', {
        newData,
      })

      setCreateNewUser(newData)
      reset()
      router.push('/')
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-lg p-16">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCreateNewUser)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      id="first-name"
                      placeholder="John"
                      required
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <span className="text-xs text-red-600">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      required
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <span className="text-xs text-red-600">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex flex-col gap-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    required
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex flex-col gap-1">
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full"
                onClick={handleCreateNewUser}
              >
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
