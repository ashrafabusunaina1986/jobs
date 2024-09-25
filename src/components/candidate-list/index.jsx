'use client'
import React from 'react'

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { supabaseClient } from '../on-board';
import { createMessageAction, updateJobApplicantsAction } from '@/actions';
export let message = []
function CandidateList({ user, currentCandidateDetails, handleProfileApplicant, setCurrentCandidateDetails, job, jobApplicants, showDialog, setShowDialog }) {
  console.log({ profile: currentCandidateDetails }, { job });

  const handleUpdateApplicantsAction = async (getCurrentStatus) => {
    const cpyApplicants = [...jobApplicants]
    const indexApplicantCandidate = cpyApplicants.findIndex(item => item?.candidateUserId === currentCandidateDetails?.userId)
    const updateApplicant = {
      ...cpyApplicants[indexApplicantCandidate],
      status: cpyApplicants[indexApplicantCandidate]?.status.concat(getCurrentStatus)
    }
    if (getCurrentStatus === 'selected') {
      await createMessageAction({
        userId: currentCandidateDetails?.userId,
        jobId: job?.__id,
        jobTitle: job?.title,
        m: 'Selected done',
        time: new Date().getTime().toString(),
        dateStart: new Date().toDateString(),
        dateEnd: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()).toString()
      }, '/job')
    }
    if (getCurrentStatus === 'rejected')
      await createMessageAction({
        userId: currentCandidateDetails?.userId,
        jobId: job?.__id,
        jobTitle: job?.title,
        m: 'Rejected done',
        time: new Date().getTime().toString(),
        dateStart: new Date().toDateString(),
        dateEnd: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()).toString()
      }, '/job')
    console.log(updateApplicant, 'Update Applicants');
    await updateJobApplicantsAction(updateApplicant, '/job')
  }

  return (
    <>
      <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 py-5'>
        {
          jobApplicants && jobApplicants?.length > 0 ?
            jobApplicants.map((jobApplicantItem, ind) => <div key={ind} className='bg-white px-8 py-6 max-w-sm flex flex-col md:flex-row gap-5 items-baseline md:justify-between shadow-lg shadow-gray-400 rounded-lg' >
              <h1 className='text-xs md:text-xl font-bold text-gray-900' >{jobApplicantItem?.name}</h1>
              <Button
                onClick={() => handleProfileApplicant(jobApplicantItem?.candidateUserId)}
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
              >View Profile</Button>
            </div>)
            : null
        }
      </div>
      <Dialog onOpenChange={() => setShowDialog(false)} open={showDialog} >
        <DialogContent>

          <DialogHeader className={'border-b-2 border-gray-400 flex items-center justify-center py-5'}>
            <DialogTitle>
              {currentCandidateDetails?.candidateInfo?.name} profile
            </DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-0 py-1'>
            <h1 className='text-sm font-bold text-gray-700 my-1'>Name - {currentCandidateDetails?.candidateInfo?.name}</h1>
            <h1 className='text-sm font-bold text-gray-700 my-1'>Current Company - {currentCandidateDetails?.candidateInfo?.currentCompany}</h1>
            <h1 className='text-sm font-bold text-gray-700 my-1'>Current Job Location - {currentCandidateDetails?.candidateInfo?.currentJobLocation}</h1>
            <h1 className='text-sm font-bold text-gray-700 my-1'>Current Salary - {currentCandidateDetails?.candidateInfo?.currentSalary} $</h1>
            <h1 className='text-sm font-bold text-gray-700 my-1'>Experience - {currentCandidateDetails?.candidateInfo?.totalExperience} Years</h1>
            <h1 className='text-sm font-bold text-gray-700 my-1'>College - {currentCandidateDetails?.candidateInfo?.college} , Location - {currentCandidateDetails?.candidateInfo?.collegeLocation} , Graduated Year - {currentCandidateDetails?.candidateInfo?.graduatedYear}</h1>
            <div className='flex gap-3 border-2 rounded-lg border-gray-400 px-2 py-3 flex-wrap'>
              Previous Companies {' '}
              {
                currentCandidateDetails?.candidateInfo?.previousCompanies?.split(',').map((pc, p) => <span key={p} className='px-2 py-1 text-xs font-bold bg-black text-white rounded-lg' >{pc}</span>)
              }
            </div>
            <div className='flex gap-3 border-2 rounded-lg border-gray-400 px-2 py-3 flex-wrap'>
              Skills {' '}
              {
                currentCandidateDetails?.candidateInfo?.skills?.split(',').map((skill, s) => <span key={s} className='px-2 py-1 text-xs font-bold bg-black text-white rounded-lg' >{skill}</span>)
              }
            </div>
          </div>
          <DialogFooter>
            <div className='flex flex-row-reverse gap-3 border-t-2 border-gray-400 py-6 w-full'>
              <Button
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
                onClick={() => {
                  const { data } = supabaseClient.storage.from('job-board-public/public').getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)


                  const a = document.createElement('a')
                  a.href = data.publicUrl
                  a.setAttribute('download', '.pdf')
                  a.setAttribute('target', '_blank')
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)

                }}
              >
                Resume
              </Button>
              <Button
                disabled={
                  jobApplicants?.find(jobApplicant => (jobApplicant?.status.includes('selected') || jobApplicant?.status.includes('rejected')) && jobApplicant?.jobId === job?._id && jobApplicant?.candidateUserId === currentCandidateDetails?.userId && jobApplicant?.candidateUserId === currentCandidateDetails?.userId) ? true : false
                }
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
                onClick={() => handleUpdateApplicantsAction('selected')}
              >
                {
                  jobApplicants?.findIndex(jobApplicant => jobApplicant?.candidateUserId === currentCandidateDetails?.userId && jobApplicant?.status.includes('selected')) > -1 ? 'Selected' : 'Select'
                }
              </Button><Button
                disabled={
                  jobApplicants?.find(jobApplicant => (jobApplicant?.status.includes('selected') || jobApplicant?.status.includes('rejected')) && jobApplicant?.jobId === job?._id && jobApplicant?.candidateUserId === currentCandidateDetails?.userId && jobApplicant?.candidateUserId === currentCandidateDetails?.userId) ? true : false
                }
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
                onClick={() => handleUpdateApplicantsAction('rejected')}
              >
                {
                  jobApplicants?.findIndex(jobApplicant => jobApplicant?.candidateUserId === currentCandidateDetails?.userId && jobApplicant?.status.includes('rejected')) > -1 ? 'Rejected' : 'Reject'
                }
              </Button>
            </div>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CandidateList