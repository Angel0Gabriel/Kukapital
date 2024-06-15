/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SelectDemo } from '../Select'
import { PlusCircle } from 'lucide-react'
import { DialogProps } from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const createTransacationFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Insira um nome para a renda/despesa maior do que 3 caracteres'),
  price: z.string().min(1, 'Digite um preço válido'),
  date: z.string().min(1, 'Digite uma data válida'),
  type: z.string().min(1, 'Selecione um tipo para a transação'),
})

type createTransacationFormSchemaType = z.infer<
  typeof createTransacationFormSchema
>

export function DialogDemo(props: DialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [transactionData, setTransactionData] = useState<any>()
  const [transactionsList, setTransactionsList] = useState<any>([])

  const { handleSubmit, register, control, formState, reset } =
    useForm<createTransacationFormSchemaType>({
      resolver: zodResolver(createTransacationFormSchema),
    })

  const { errors, isSubmitting } = formState

  async function handleCreateTransaction(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 1))

    const newData = {
      id: transactionsList?.length ?? 0,
      ...data,
    }
    setTransactionData(newData)
    setTransactionsList((prevState: any) => [...prevState, newData])

    setIsOpen(false)
    reset()
  }

  return (
    <>
      <Dialog {...props} open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Transaction
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(handleCreateTransaction)}>
            <DialogHeader>
              <DialogTitle>Create transaction</DialogTitle>
              <DialogDescription>
                Add your transaction here and click save when you{`'`}re done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Headphone HyperX"
                  className="w-full"
                  {...register('name')}
                />
                {errors.name && (
                  <span className="text-xs text-red-600">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="price" className="text-left">
                  Price
                </Label>
                <Input
                  id="price"
                  defaultValue="$300.00"
                  className="w-full"
                  {...register('price')}
                />
                {errors.price && (
                  <span className="text-xs text-red-600">
                    {errors.price.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="date" className="text-left">
                  Date
                </Label>
                <Input
                  id="date"
                  defaultValue="14/06/2024"
                  className="w-full"
                  {...register('date')}
                />
                {errors?.date && (
                  <span className="text-xs text-red-600">
                    {errors.date.message as string}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectDemo
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                {errors.type && (
                  <span className="text-xs text-red-600">
                    {errors.type.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isSubmitting} type="submit">
                Create transaction
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
