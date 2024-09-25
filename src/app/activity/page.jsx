import { fetchApplicantsJobForCandidateAction, fetchJobCandidateAction, fetchProfileUserApplicantsAction } from '@/actions'
import Activity from '@/components/activity'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function ActivityPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileUserApplicantsAction(user?.id)
    const jobList = await fetchJobCandidateAction()
    const jobApplicatns = await fetchApplicantsJobForCandidateAction(user?.id)
    if (profileInfo)
        return (
            <Activity jobApplicants={jobApplicatns} jobList={jobList} />
        )
    else redirect('/onboard')
}

export default ActivityPage