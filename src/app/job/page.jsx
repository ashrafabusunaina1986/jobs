import { fetchApplicantsJobForCandidateAction, fetchApplicantsJobForRecruiterAction, fetchFilterCategoriesAction, fetchJobCandidateAction, fetchJobForRecruiterAction, fetchProfileAction } from '@/actions'
import JobList from '@/components/job-list'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function JobPage({searchParams}) {
    // console.log(searchParams);
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    const jobs = profileInfo?.role === 'recruiter' ?
        await fetchJobForRecruiterAction(user?.id)
        : await fetchJobCandidateAction(searchParams)

    const jobApplicants = profileInfo?.role === 'recruiter' ?
        await fetchApplicantsJobForRecruiterAction(user?.id)
        : await fetchApplicantsJobForCandidateAction(user?.id)

    const filterCategories = await fetchFilterCategoriesAction()

    if (!profileInfo) redirect('/onboard')
    return (
        <div>
            <JobList user={JSON.parse(JSON.stringify(user))} filterCategories={filterCategories} profileInfo={profileInfo} jobs={jobs} jobApplicants={jobApplicants} />
        </div>
    )
}

export default JobPage