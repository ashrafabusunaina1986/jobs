import { fetchOneMessageForJobAction } from '@/actions'
import JobStatus from '@/components/job-status'
import React from 'react'

async function JobDetailsStatusPage({params}) {
  const messageJob=await fetchOneMessageForJobAction(params['job-details-status'])
  
  return (
    <JobStatus m={messageJob} />
  )
}

export default JobDetailsStatusPage
