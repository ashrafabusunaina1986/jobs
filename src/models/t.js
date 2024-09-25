import { Schema, model, models } from "mongoose";
const tschema = new Schema({
    userId: String,
    time: String,
    dateStart: String,
    dateEnd: String
})
const To = models.To || model('To', tschema)
export default To