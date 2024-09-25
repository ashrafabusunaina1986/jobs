import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
  return (
    <div className='w-11/12 mx-auto  flex items-center justify-center'>
        <SignIn/>
    </div>
  )
}

export default SignInPage