import { signOut } from '@/server/auth';
import { auth } from '@/lib/auth';
import React from 'react'
import { Button } from '../ui/button';
import { User } from 'lucide-react';
import { UserCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';

export default async function UserAvatar() {
    const { data: session } = await auth.getSession();
    if (!session)
        return (
            <Link href="/login">
                <Button size='lg' className='cursor-pointer bg-gray-900 hover:bg-gray-800 text-white rounded-full'>
                    <User /> <span className='max-sm:hidden'>Login/Register</span>
                </Button>
            </Link>
        )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='lg' className='cursor-pointer'>
                    <UserCircle /> {session?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className='font-bold'>
                    {session?.user?.email}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/account/settings">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant='destructive' onClick={signOut}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
