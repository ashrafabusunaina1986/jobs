import { Schema, model, models } from "mongoose";

const ApplicantsSchema = new Schema({
    recruiterUserId: String,
    jobId: String,
    name: String,
    email: String,
    candidateUserId: String,
    status: Array,
    jobAppliedDate: String
})
const Applicants = models.Applicants || model('Applicants', ApplicantsSchema)
export default Applicants