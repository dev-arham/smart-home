'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const RadioDropdownCurrency = () => {
  const [position, setPosition] = useState('PKR')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='dropdownTrigger' size='sm'>PKR<ChevronDown /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value='USD'>USD</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='PKR'>PKR</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RadioDropdownCurrency
