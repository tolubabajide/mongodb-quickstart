import { MongoClient, ServerApiVersion } from "mongodb";
import { uri } from "./secrets.js";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );

        const coll = client.db("sample_mflix").collection("comments");

        // console.time();
        // console.log(
        //     (
        //         await coll
        //             .find()
        //             .toArray()
        //     ).length
        // );
        // console.timeEnd();

        await coll.find().limit(10);

        console.time();
        console.log(
            (
                await coll
                    .find()
                    .limit(100)
                    .toArray()
            ).length
        );
        console.timeEnd();

        console.time();
        console.log(
            (
                await coll
                    .find()
                    .sort({ date: 1 })
                    .limit(100)
                    .toArray()
            ).length
        );
        console.timeEnd();
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
