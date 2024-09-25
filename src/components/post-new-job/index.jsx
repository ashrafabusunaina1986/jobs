'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import CommonForm from '../common-form'
import { initialPostNewJobFormControls, postNewJobFormControls, vc } from '@/utils'
import { PostNewJobAction } from '@/actions'

function PostNewJob({ user, profileInfo }) {
    const [showDialog, setShowDialog] = useState(false)
    const [postNewJob, setPostNewJob] = useState({
        ...initialPostNewJobFormControls,
        companyName: profileInfo?.recruiterInfo?.companyName,
        recruiterId: user?.id
    })
    // console.log(postNewJob);
    const handlePostNewJob = async () => {
        await PostNewJobAction(postNewJob, '/job')
        setShowDialog(false)
        setPostNewJob({
            ...initialPostNewJobFormControls,
            companyName: profileInfo?.recruiterInfo?.companyName,
            recruiterId: user?.id
        })
    }
    return (
        <div>
            <Button
                onClick={() => setShowDialog(true)}
                className="disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700" >
                Post A Job
            </Button>
            <Dialog open={showDialog} onOpenChange={() => {
                setShowDialog(false)
                setPostNewJob({
                    ...initialPostNewJobFormControls,
                    companyName: profileInfo?.recruiterInfo?.companyName,
                    recruiterId: user?.id
                })
            }} >
                <DialogContent className=" h-[500px] w-2/4 overflow-y-auto" >
                    <DialogHeader >
                        <DialogTitle>Post New Job</DialogTitle>
                        <CommonForm ac={handlePostNewJob} df={postNewJob} sdf={setPostNewJob} cln='py-10' fcs={postNewJobFormControls} bd={!vc(postNewJob)} bt={'Post'} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostNewJob