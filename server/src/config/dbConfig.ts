import mongoose from 'mongoose'

async function connectToDb() {

        if(!process.env.DB_CONNECTION_STRING) {
            throw new Error('DB_CONNECTION_STRING is not defined in the environment variables.')
        }
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
  
}

export default connectToDb;