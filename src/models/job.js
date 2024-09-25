import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
    companyName: String, type: String, location: String, recruiterId: String, skills: String, title: String, experience: String, description: String,
    recruiterId: String,
})
const Jobs = models.Jobs || model('Jobs', JobSchema)
export default Jobs