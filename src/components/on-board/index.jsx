'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList } from '../ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import { candidateFormControls, initialCandidateFormControls, initialRecruiterFormControls, recruiterFormContrls, vc } from '@/utils'
import CommonForm from '../common-form'
import { createProfileAction } from '@/actions'
import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  'https://kixfgqknzwlvvqtegrjq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeGZncWtuendsdnZxdGVncmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNTc0NDQsImV4cCI6MjAzNjczMzQ0NH0.CvILeU__GAQYwX4w1HmTaKikdmGrTCGwpAN4R0VJgT0'
)

function OnBoard({ user, profileInfo }) {
  const [currentTab, setCurrentTab] = useState('recruiter')
  const [recruiterDataForm, setRecruiterDataForm] = useState(initialRecruiterFormControls)
  const [candidateDataForm, setCandidateDataForm] = useState(initialCandidateFormControls)
  const [file, setFile] = useState(null)
  const handleTabChange = v => {
    setCurrentTab(v)
  }
  const uploadFileSupabase = async () => {
    const { data, error } = await supabaseClient.storage
      .from('job-board-public/public')
      .upload(file.name, file, {
        cacheControl: '3600',
        upsert: false
      })
    console.log({ data, error });

    return { data, error }
  }

  const handleProfileAction = async () => {
    let datas
    if (file && currentTab === 'candidate') {
      const { data, error } = await uploadFileSupabase()
      datas = {
        userId: user?.id,
        role: 'candidate',
        email: user?.emailAddresses?.emailAddress,
        isPremiumUser: false,
        candidateInfo: candidateDataForm
      }
      if (data)
        await createProfileAction(datas, '/onborad')
      else alert(`Error File :${error.message}`)
    }
    else {
      datas = {
        userId: user?.id,
        role: 'recruiter',
        email: user?.emailAddresses?.emailAddress,
        isPremiumUser: false,
        recruiterInfo: recruiterDataForm
      }
      await createProfileAction(datas, '/onborad')
    }

  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setFile(file)
      setCandidateDataForm({
        ...candidateDataForm,
        resume: file?.name
      })
    }
  }

  useEffect(() => {
    // const uploadFileSupabase = async () => {
    //   const { data, error } = await supabaseClient.storage
    //     .from('job-board-public/public')
    //     .upload(file.name, file, {
    //       cacheControl: '3600',
    //       upsert: false
    //     })
    //     console.log({data,error});
    //   setCandidateDataForm({
    //     ...candidateDataForm,
    //     resume: data?.path
    //   })
    // }
    // if (file) uploadFileSupabase()
  }, [file])
  console.log(candidateDataForm);
  return (
    <div>
      <Tabs defaultValue='recruiter' className='w-full' onValueChange={handleTabChange}>
        <div className='flex items-baseline justify-between pt-16 border-b-[1px] border-gray-400 py-3 px-5' >
          <h1 className='text-3xl font-extrabold text-gray-800'>Welcome our onboard</h1>
          <TabsList >
            <div className='flex items-center gap-5'>
              <TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
              <TabsTrigger value='candidate'>Candidate</TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value='recruiter'>
          <CommonForm ac={handleProfileAction} df={recruiterDataForm} sdf={setRecruiterDataForm} bd={!vc(recruiterDataForm)} bt={'Add to Recruiter'} fcs={recruiterFormContrls} cln={'w-3/5 my-14 mx-auto'} />
        </TabsContent>
        <TabsContent value='candidate'>
          <CommonForm ac={handleProfileAction} hoc={handleFileChange} df={candidateDataForm} sdf={setCandidateDataForm} bd={!vc(candidateDataForm)} bt={'Add to Candidate'} fcs={candidateFormControls} cln='w-4/5 my-14 mx-auto' />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OnBoard 