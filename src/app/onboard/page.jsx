import { fetchProfileAction } from '@/actions'
import OnBoard from '@/components/on-board'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function OnBoardPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if (profileInfo?._id) {
        redirect('/')
    }
    return (
        <OnBoard user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
    )
}

export default OnBoardPage