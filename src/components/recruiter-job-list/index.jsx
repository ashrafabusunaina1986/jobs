'use client'
import React, { useState } from 'react'
import CommonCard from '../common-card'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '../ui/drawer'
import JobApplicants from '../job-applicants'
import { fetchProfileUserApplicantsAction } from '@/actions'

function RecruiterJobList({user, job, profileInfo, jobApplicants }) {
    const [showDrawer, setShowDrawer] = useState(false)
    const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const handleProfileApplicant=async(ccid)=>{
        setShowDialog(true)
        setCurrentCandidateDetails(await fetchProfileUserApplicantsAction(ccid))
    }
    return (
        <div>

            <CommonCard title={job?.title} companyName={job?.companyName} icon={'/job-svgrepo-com.svg'} fbtn={
                <Button
                    onClick={() => setShowDrawer(true)}
                    disabled={jobApplicants?.filter(jobApplicant => jobApplicant?.jobId === job?._id)?.length < 1}
                    className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
                >{jobApplicants?.filter(jobApplicant => jobApplicant?.jobId === job?._id)?.length} Applicants</Button>
            } />
            <JobApplicants user={user} showDialog={showDialog} handleProfileApplicant={handleProfileApplicant} setShowDialog={setShowDialog} currentCandidateDetails={currentCandidateDetails} setCurrentCandidateDetails={setCurrentCandidateDetails} showDrawer={showDrawer} setShowDrawer={setShowDrawer} job={job} jobApplicant={jobApplicants?.filter(jobApplicantItem => jobApplicantItem?.jobId === job?._id)} />
        </div>
    )
}

export default RecruiterJobList