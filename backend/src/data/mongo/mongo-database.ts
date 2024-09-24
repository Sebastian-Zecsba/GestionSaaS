import mongoose from "mongoose";

interface ConectionOption { 
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase { 

    static async connect( options: ConectionOption){ 
        const { mongoUrl, dbName } = options

        try {
            
            await mongoose.connect(mongoUrl, {
                dbName: dbName
            })

        } catch (error) {
            console.log('Has an error', error)
            throw error;
        }
    }

}