'use client'
import React from 'react'
import { useClerk } from '@clerk/nextjs'

function SignOut() {
    const { signOut } = useClerk()
    return signOut({ redirectUrl: '/' })
}

export default SignOut