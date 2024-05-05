import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
    }

    }

    {/*this code provides a reusable function for connecting to your MongoDB database. It prevents unnecessary connection attempts, sets a strict query option for Mongoose, and handles potential errors during the connection process. */}