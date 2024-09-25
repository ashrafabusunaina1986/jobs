const { connect } = require("mongoose")

const db = async () => {
    try {
        await connect(process.env.MONGO)
        console.log({ data: 'database connected successfully' });
    } catch (error) {
        console.log({ error: error });
    }
}
export default db