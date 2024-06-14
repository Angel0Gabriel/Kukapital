import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

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

type TransactionType = 'income' | 'outcome'

interface TransactionsTableProps {
  transactionType?: TransactionType
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TransactionsTable(props: TransactionsTableProps) {
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
        <TableRow>
          <TableCell className="hidden sm:table-cell"></TableCell>
          <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
          <TableCell>
            <Badge variant="outline">Income</Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">$499.99</TableCell>

          <TableCell className="hidden md:table-cell">
            2023-07-12 10:42 AM
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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="hover:text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
