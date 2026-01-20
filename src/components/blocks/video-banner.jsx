'use client'
import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

const VideoBanner = () => {
    const isMobile = useIsMobile();
    return (
        <div className='container mx-auto max-xl:p-5'>
            <Card className='relative h-[80vh] flex items-center justify-center group overflow-hidden max-sm:h-[60vh]'>
                <Image width={1500} height={700} src='/images/video-thumbnail.jpg' alt='video banner background' className='w-full h-full absolute object-cover rounded-xl z-1 group-hover:scale-110 transition-transform duration-300' />
                <div className='absolute z-2 w-full h-full bg-black/40 rounded-xl'></div>
                <div className='z-2'>
                    <a href=""></a>
                    <Dialog>
                        <DialogTrigger asChild>
                            <PlayCircle size={isMobile ? 80 : 150} strokeWidth={1} className='text-white cursor-pointer' />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-106.25">
                            <DialogHeader>
                                <DialogTitle>Alert!</DialogTitle>
                                <DialogDescription>
                                    Your video will play here.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Okay</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </Card>
        </div>
    )
}

export default VideoBanner