import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  return (
    <div className='w-11/12 mx-auto  flex items-center justify-center'>
      <SignUp />
    </div>
  )
}

export default SignUpPage