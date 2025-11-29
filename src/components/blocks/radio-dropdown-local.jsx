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

const RadioDropdownLocal = () => {
  const [position, setPosition] = useState('ENG')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='dropdownTrigger' size='sm'>ENG<ChevronDown /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Localization</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value='ENG'>English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='URD'>Urdu</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RadioDropdownLocal
