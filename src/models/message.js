import { Schema, model, models } from "mongoose";
const MessageSchema = new Schema({
    userId: String,
    jobId: String,
    jobTitle: String,
    m: String,
    t: { type: Boolean, default: false },
    time: String,
    dateStart: String,
    dateEnd: String
})
const Message = models.Message || model('Message', MessageSchema)
export default Message