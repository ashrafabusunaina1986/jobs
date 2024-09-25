'use server'


import db from "@/database"
import Applicants from "@/models/applicants"
import Jobs from "@/models/job"
import Message from "@/models/message"
import Profile from "@/models/profile"
import To from "@/models/t"
import { revalidatePath } from "next/cache"


//create profile
export const createProfileAction = async (data, path) => {
    await db()
    await Profile.create(data)
    revalidatePath(path)
}

//fetch profile
export const fetchProfileAction = async (id) => {
    await db()
    const result = await Profile.findOne({ userId: id })
    return result
}
// post a job
export const PostNewJobAction = async (data, path) => {
    await db()
    await Jobs.create(data)
    revalidatePath(path)
}

//fetch jobs

//recruiter
export const fetchJobForRecruiterAction = async (recruiterId) => {
    await db()
    const result = await Jobs.find({ recruiterId: recruiterId })
    return JSON.parse(JSON.stringify(result))
}
//candidate
export const fetchJobCandidateAction = async (filterParams = {}) => {
    await db()
    let updateParams = {}
    Object.keys(filterParams).forEach(filterKey => {
        updateParams[filterKey] = { $in: filterParams[filterKey].split(',') }
    })
    const result = await Jobs.find(filterParams && Object.keys(filterParams).length > 0 ? updateParams : {})

    return JSON.parse(JSON.stringify(result))
}

//create applicants for job
export const createApplicantsJobsAction = async (data, path) => {
    await db()
    await Applicants.create(data)
    revalidatePath(path)
}
//fetch applicants for recruiter
export const fetchApplicantsJobForRecruiterAction = async (recruiterId) => {
    await db()
    const result = await Applicants.find({ recruiterUserId: recruiterId })
    return JSON.parse(JSON.stringify(result))
}
//fetch applicants for candidate
export const fetchApplicantsJobForCandidateAction = async (candidateId) => {
    await db()
    const result = await Applicants.find({ candidateUserId: candidateId })
    return JSON.parse(JSON.stringify(result))
}
//update applicant
export const updateJobApplicantsAction = async (data, path) => {
    const { recruiterUserId, jobId, name, email, candidateUserId, status, jobAppliedDate, _id } = data
    await db()
    await Applicants.findOneAndUpdate({ _id: _id }, { recruiterUserId, jobId, name, email, candidateUserId, status, jobAppliedDate }, { new: true })
    revalidatePath(path)
}

//fetch profile Applicants
export const fetchProfileUserApplicantsAction = async (currentCandidateId) => {
    await db()
    const result = await Profile.findOne({ userId: currentCandidateId })
    return JSON.parse(JSON.stringify(result))
}

export const fetchFilterCategoriesAction = async () => {
    await db()
    const result = await Jobs.find({})
    return JSON.parse(JSON.stringify(result))
}

//update profile Account
export const updateProfileAccountAction = async (data, path) => {
    const { _id, userId, role, email, membershipUser, membershipStartDate, membershipEndDate, isPremuimUser, recruiterInfo, candidateInfo } = data
    await db()
    await Profile.findOneAndUpdate({ _id: _id }, { userId, role, email, membershipUser, membershipStartDate, membershipEndDate, isPremuimUser, recruiterInfo, candidateInfo }, { new: true })
    revalidatePath(path)
    return { message: true }
}


export const createMessageAction = async (data, p) => {
    await db()
    await Message.create(data)
    revalidatePath(p)
    return true
}
export const fetchMessageAction = async (userId) => {
    await db()
    const m = await Message.find({ userId: userId })
    return JSON.parse(JSON.stringify(m.reverse()))
}
export const updateMessageAction = async (mId, t, p) => {
    await db()
    await Message.findOneAndUpdate({ _id: mId }, { t: t }, { new: true })
    revalidatePath(p)
    return true
}
export const createTAction = async (data, p) => {
    await db()
    await To.create(data)
    revalidatePath(p)
    return true
}
export const fetchTAction = async () => {
    await db()
    const t = await To.find({})
    return JSON.parse(JSON.stringify(t))
}