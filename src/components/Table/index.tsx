/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'

import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableHeader,
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

type TransactionType = 'income' | 'outcome'

export interface TableRow {
  id?: number
  name: string
  price: number
  date: string
  type: TransactionType
}

export interface TransactionsTableProps {
  data?: TableRow[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TransactionsTable(props: TransactionsTableProps) {
  async function fetchTransactions() {
    try {
      const response = await axios.get('http://localhost:4000/transactions')
      return response.data
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
  }

  const [transactionsListData, setTransactionsListData] =
    useState<TransactionsTableProps>({ data: [] })

  useEffect(() => {
    async function getTransactions() {
      const data = await fetchTransactions()
      setTransactionsListData({ data })
    }

    getTransactions()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>

          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionsListData.data?.map((value) => {
          console.log(value)
          return (
            <TableRow key={value.id}>
              <TableCell className="hidden sm:table-cell"></TableCell>
              <TableCell className="font-medium">{value.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{value.type}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                ${value.price}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                {new Date(value.date).toLocaleDateString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-red-600 cursor-pointer">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
