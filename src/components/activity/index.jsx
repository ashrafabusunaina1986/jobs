import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import CommonCard from '../common-card';

export default function Activity({ jobList, jobApplicants }) {
  // console.log(jobList,jobApplicants);
  const uniqueStatus = [...new Set(jobApplicants.map(jobApplicant => jobApplicant?.status).flat(1))]
  // console.log(uniqueStatus);
  return (
    <div className='mx-auto max-w-7xl'>
      <Tabs defaultValue='Applied' className='w-full'>
        <div className='flex items-baseline justify-between pt-20 border-b-2 border-gray-400' >
          <h1 className='text-3xl font-extrabold text-gray-800'>Your Activity</h1>
          <TabsList>
            {
              uniqueStatus.map((status,i) => <TabsTrigger key={i} value={status}>{status}</TabsTrigger>)
            }
          </TabsList>
        </div>
        <div className=' pb-24 pt-6'>
          <div className='container mx-auto space-x-8'>
            {
              uniqueStatus.map((statusFilter,i )=> <TabsContent key={i} value={statusFilter}>
                <div className='flex flex-col gap-8'>
                  {
                    jobList.filter(jobItem => jobApplicants.filter(jobApplicant => 
                      jobApplicant?.status.indexOf(statusFilter) > -1)
                      .findIndex(filterJobApplicantByStatus => jobItem?._id === filterJobApplicantByStatus?.jobId) > -1
                    )
                      .map((fja,f) => <CommonCard key={f} title={fja?.title} icon={'/job-svgrepo-com.svg'} companyName={fja?.companyName}/>)
                  }
                </div>
              </TabsContent>)
            }
          </div>
        </div>
      </Tabs>
    </div>
  )
}
