import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import Header from '../header'
import { fetchProfileAction } from '@/actions'
import T from '../t'

async function CommonLayout({ children }) {
    const user = await currentUser()
    // console.log(user);
    const profileInfo = await fetchProfileAction(user?.id)
    return (
        <div className='w-11/12 mx-auto flex flex-col gap-1'>
            <Header user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
            {profileInfo?.role === 'candidate' ? <T user={JSON.parse(JSON.stringify(user))} /> : ''}
            <main>{children}</main>
        </div>
    )
}

export default CommonLayout