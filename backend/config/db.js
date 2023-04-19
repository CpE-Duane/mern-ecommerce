import mongoose, { connect } from "mongoose";
import colors from 'colors'

const connectDB = async () => {
     try {
          const connect = await mongoose.connect(process.env.MONGO_URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          })
          console.log(`Connected to MongoDB ${connect.connection.host}`.bgMagenta)
     } catch (error) {
          console.log(`Error in MongoDB: ${error}`.bgRed.white)
     }
}

export default connectDB