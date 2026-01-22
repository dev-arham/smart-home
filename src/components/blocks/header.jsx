import React from 'react'
import { NavigationMenuDemo } from './navigation-menu'
import { Input } from '../ui/input'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
import { Heart } from 'lucide-react'; 
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'
import { Phone } from 'lucide-react'
import { Menu } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { ThemeToggle } from './theme-toggle'
import UserAvatar from './user-avatar'
import WishlistDrawer from './wishlist-drawer'
import Link from 'next/link'


const Header = () => {
  return (
    <header className="w-full bg-background dark:bg-background shadow-sm fixed top-0 left-0 z-50">
      <div className='topBar bg-tertiary text-tertiary-foreground py-2 text-center text-sm'>
        <div className='container mx-auto flex items-center justify-between px-1 max-sm:px-5 max-sm:py-2 md:justify-center max-xl:px-5'>
          <div className="left max-sm:hidden w-full flex">
            <p>Need help? Call us <a href="tel:+923368882782"><span className='font-bold underline'>+92 336 8882782</span></a></p>
          </div>
          <div className='hidden max-sm:block'>
            <Phone className='text-white' />
          </div>
          <div className="center w-full flex gap-2 justify-center max-xl:justify-end">
            <span>Winter Sale Upto 50% off! </span>
            <span><a href="#" className='font-bold underline'>Shop Now</a></span>
          </div>
          <div className="right hidden w-full xl:block">
          </div>
        </div>
      </div>
      <div className='container mx-auto flex items-center justify-between px-1 py-4 max-sm:px-5 max-sm:py-2 gap-2'>
        <nav className="menu max-lg:hidden">
          <NavigationMenuDemo />
        </nav>
        <div className='hidden max-lg:block'>
          <SidebarTrigger />
        </div>
        <div className="logo max-sm:w-full">
          <Image src="/images/aqua-logo.png" alt="Logo" width={100} height={50} className='' />
        </div>
        <div className="userActions flex items-center gap-2">
          <div className=' max-sm:hidden'>
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
          <UserAvatar />
          <Button variant='ghost' size='icon' className='cursor-pointer' asChild>
            <Link href="/cart"><ShoppingBag /></Link>
          </Button>
          <WishlistDrawer>
            <Button variant='ghost' size='icon' className='cursor-pointer'>
              <Heart />
            </Button>
          </WishlistDrawer>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header