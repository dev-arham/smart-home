import React from 'react'
import RadioDropdownLocal from './radio-dropdown-local'
import RadioDropdownCurrency from './radio-button-currency'
import { NavigationMenuDemo } from './navigation-menu'
import { Input } from '../ui/input'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import { Heart } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full bg-background dark:bg-gray-900 shadow-sm">
      <div className='topBar bg-tertiary text-tertiary-foreground py-2 text-center text-sm'>
        <div className='container mx-auto flex items-center justify-between px-1'>
          <div className="left">
            <p>Need help? Call us <span className='font-bold'>1-800-123-4567</span></p>
          </div>
          <div className="center">
            Summer sale discount off 50% off! <a href="#" className='font-bold underline'>Shop Now</a>
          </div>
          <div className="right">
            <RadioDropdownLocal />
            <RadioDropdownCurrency />
          </div>
        </div>
      </div>
      <div className='container mx-auto flex items-center justify-between px-1 py-4'>
        <nav className="menu">
          <NavigationMenuDemo />
        </nav>
        <div className="logo">
          <Image src="/images/logo.svg" alt="Logo" width={100} height={50} />
        </div>
        <div className="userActions flex items-center gap-2">
          <div>
            <div className="relative flex-1">
              <Input
                className="peer h-8 w-full max-w-xs ps-8 pe-2"
                placeholder="Search products..."
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
          <Button variant='text' size='lg'>
            <User /> Login/Register
          </Button>
          <Button variant='ghost' size='icon' className='cursor-pointer'>
            <Heart />
          </Button>
          <Button variant='ghost' size='icon' className='cursor-pointer'>
            <ShoppingBag />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header