'use client'
import React from 'react'
import { Drawer, DrawerContent } from '../ui/drawer'
import CandidateList from '../candidate-list'
import { ScrollArea } from '../ui/scroll-area'

function JobApplicants({ showDialog, setShowDialog, handleProfileApplicant, currentCandidateDetails, setCurrentCandidateDetails, showDrawer, setShowDrawer, job, jobApplicant ,user}) {
    //    console.log(job,{'JobApplicant':jobApplicant});
    return (
        <Drawer open={showDrawer} onOpenChange={setShowDrawer} >
            <DrawerContent>
                <ScrollArea>
                    <CandidateList user={user} setShowDialog={setShowDialog} handleProfileApplicant={handleProfileApplicant} currentCandidateDetails={currentCandidateDetails} setCurrentCandidateDetails={setCurrentCandidateDetails} job={job} jobApplicants={jobApplicant} showDialog={showDialog} />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default JobApplicants