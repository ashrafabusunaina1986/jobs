'use client'
import React, { useEffect } from 'react'
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

function HomepageButtons({ user, profileInfo }) {
    const router = useRouter()
    useEffect(() => {
        router.refresh()
    }, [router])
    return (
        <div className="flex space-x-4">
            <Button onClick={() => router.push('/job')} className='disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700 bg-gray-950 text-gray-50'>{user ? profileInfo?.role === 'candidate' ? 'Browse Jobs' : 'Jobs Dashboard' : 'Find Job'}</Button>
            <Button onClick={() => router.push(user ? profileInfo?.role === 'candidate' ? '/activity' : '/job' : '/job')} className='disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700 bg-gray-950 text-gray-50'>{user ? profileInfo?.role === 'candidate' ? 'Your Activity' : 'Post New Job' : 'Post New Job'}</Button>
        </div>
    )
}

export default HomepageButtons