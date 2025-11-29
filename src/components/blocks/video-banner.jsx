import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

const VideoBanner = () => {
    return (
        <Card className='relative container mx-auto h-[90vh] flex items-center justify-center group overflow-hidden'>
            <Image width={1500} height={700} src='/images/video-thumbnail.jpg' alt='video banner background' className='w-full h-full absolute object-cover rounded-xl z-1 group-hover:scale-110 transition-transform duration-300' />
            <div className='absolute z-2 w-full h-full bg-black/40 rounded-xl'></div>
            <div className='z-2'>
                <a href=""></a>
                <Dialog>
                    <DialogTrigger asChild>
                        <PlayCircle size={150} strokeWidth={1} className='text-white cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
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
    )
}

export default VideoBanner