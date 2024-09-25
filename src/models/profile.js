import { Schema, model, models } from 'mongoose'
const ProfileSchema = new Schema({
    userId: String,
    role: String,
    email: String,
    membershipUser:String,
    membershipStartDate:String,
    membershipEndDate:String,
    isPremuimUser: { type: Boolean, default: false },
    recruiterInfo: {
        name: String,
        companyName: String,
        companyRole: String
    },
    candidateInfo: {
        name: String,
        currentCompany: String,
        currentJobLocation: String,
        currentSalary: String,
        noticePeriod: String,
        skills: String,
        previousCompanies: String,
        totalExperience: String,
        college: String,
        collegeLocation: String,
        graduatedYear: String,
        githubProfile: String,
        resume: String
    }
})

const Profile = models.Profile || model('Profile', ProfileSchema)
export default Profile