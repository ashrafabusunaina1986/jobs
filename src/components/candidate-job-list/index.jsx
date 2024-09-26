'use client'
import React, { useState } from 'react'
import CommonCard from '../common-card'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { createApplicantsJobsAction } from '@/actions'

function CandidateJobList({user, job, profileInfo, jobApplicants }) {
  // console.log(job, profileInfo, jobApplicants);
  const [showDrawer, setShowDrawer] = useState(false)
  const handleCreateApplicantJob = async () => {
    await createApplicantsJobsAction({
      recruiterUserId: job?.recruiterId,
      jobId: job?._id,
      name: profileInfo?.candidateInfo?.name,
      email: profileInfo?.email,
      candidateUserId: profileInfo?.userId,
      status: ['Applied'],
      jobAppliedDate: new Date().toLocaleDateString()
    }, '/job')
    setShowDrawer(false)
  }
  return (
    <Drawer open={showDrawer} onOpenChange={() =>
      setShowDrawer
    }>
      <CommonCard title={job?.title} companyName={job?.companyName} icon={'/job-svgrepo-com.svg'} fbtn={

        <Button
          onClick={() => setShowDrawer(true)}
          className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
        >View Details</Button>

      } />


      <DrawerContent className="px-5 py-5">
        <DrawerTitle >
          <h1 className='text-sm lg:text-3xl font-bold text-gray-950'>{job?.title}</h1>
        </DrawerTitle>
        <DrawerHeader>
          <p className='w-max text-xs lg:text-xl font-medium text-gray-800'>
            {'Company Mame ' + job?.companyName}

          </p>
          <p className='w-max text-xs lg:text-xl font-medium text-gray-800'>{'Location ' + job?.location}</p>
          <p className='w-max text-xs lg:text-xl font-medium text-gray-800'>{'Description ' + job?.description}</p>
          <p className='w-max text-xs lg:text-xl font-medium text-gray-800'>{'Experience ' + job?.experience + ' Years'}</p>
          <p className='w-max text-xs lg:text-xl font-medium text-gray-800'>Type  <h1 className='bg-gray-950 text-white text-sm font-extrabold rounded-md px-3 py-2 w-max inline-block'>
            {job?.type + ' time'}
          </h1></p>
          <div className='flex flex-col lg:flex-row gap-5 items-baseline lg:justify-between between mt-5 px-5 py-3'>
            <div className='flex flex-wrap gap-5 border-2 rounded-lg border-gray-400 px-3 py-4 lg:border-none text-xs lg:text-xl font-medium text-gray-700'>
              Skills{' '}
              {
                job?.skills?.split(',').map((skill,ind) => <h3 key={ind} className=' inline-flex w-max px-3 py-1 rounded-md bg-black text-white mx-2'>{skill}</h3>)
              }
            </div>
            <div className='flex gap-6'>
              <Button
                disabled={jobApplicants.findIndex(jobApplicant => jobApplicant?.jobId === job?._id) > -1}
                onClick={handleCreateApplicantJob}
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"
              >
                {jobApplicants.findIndex(jobApplicant => jobApplicant?.jobId === job?._id) > -1 ? 'Applied' : 'Apply'}</Button>
              <Button
                onClick={() => setShowDrawer(false)}
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700">
                Cancel</Button>
            </div>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default CandidateJobList