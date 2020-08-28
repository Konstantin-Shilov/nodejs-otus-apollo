import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log(`MongoDB Connecting...`);
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method} ${JSON.stringify(query)}`);
      });
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
