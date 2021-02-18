const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const url = "mongodb+srv://superadmin:pond2543@cluster0.qsh3g.mongodb.net/sample_weatherdata?retryWrites=true&w=majority"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })


async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async (req, res) => {
    try {
        const callLetters = req.query.callLetters
        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        let query = {}

        if (position){
            query.position = position
        }
        if (callLetters){
            query.callLetters = callLetters
        }

        if (airTemperture){
            query.airTemperture = airTemperture
        }

        if (ts){
            query.ts = ts
        }
        // const query = {cuisine: cuisine , borough: borough}
        const cursor = collection.find(query).limit(10)
        let restaurants = []
        await cursor.forEach(doc => weather.push(doc.name))

        res.send(weather)
    }
    catch(e) {
        console.log(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))