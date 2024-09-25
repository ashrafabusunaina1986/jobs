import { fetchMessageAction } from '@/actions'
import Update from '@/components/update'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function UpdatePage() {
  const user =await currentUser()
  const message = await fetchMessageAction(user?.id)
  console.log(message);
  return (
    <Update m={message}/>
  )
}

export default UpdatePage