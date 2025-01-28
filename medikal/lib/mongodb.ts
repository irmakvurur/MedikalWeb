// lib/dbConnect.ts
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options: mongoose.ConnectOptions = {}; // typescript için ConnectOptions olarak tanımlayın

let client;
let clientPromise: Promise<MongoClient>;

const connectDb = async () => {
    if (mongoose.connection.readyState) {
        return;
    }

    await mongoose.connect(uri, options); // options burada kullanılacak
};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, {});
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, {});
    clientPromise = client.connect();
}

// Default export the connectDb function
export { connectDb, clientPromise };