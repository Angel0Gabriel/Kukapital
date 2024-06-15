import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

export function SelectDemo({ value, onValueChange, ...props }: SelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>types</SelectLabel>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="outcome">Outcome</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
