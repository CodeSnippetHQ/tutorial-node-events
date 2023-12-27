import express from 'express'
import * as path from 'path'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('myCustomEvent', (customCallback) => {
    customCallback();
});

// load environment variables from .env file
dotenv.config();

// initialize express app
export const app = express()

// parse application/json request bodies
app.use(bodyParser.json())

// serve static files from client folder (js, css, images, etc.)
app.use(express.static(path.join(process.cwd(), 'client')))

app.get('/api/file', async (req, res) => {
    // simulate a large file download
    console.time("[GET /api/file]")
    await new Promise(resolve => setTimeout(resolve, 7500));
    res.json({
        data: "REALLY_LARGE_FILE.txt"
    });
    console.timeEnd("[GET /api/file]")
    eventEmitter.emit('myCustomEvent', () => {
        console.log("[GET /api/file] A custom callback for this event");
    });
});

app.get('/api/current-user', async (req, res) => {
    // simulate getting the current user from a database
    console.time("[GET /api/current-user]")
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.json({
        data: {
            id: 1,
            name: 'Alan Turing',
        },
    });
    console.timeEnd("[GET /api/current-user]")
    eventEmitter.emit('myCustomEvent', () => {
        console.log("[GET /api/current-user] Another custom callback for this event");
    });
});

app.get('/api/customers', async (req, res) => {
    // simulate fetching 500 customers from a database
    console.time("[GET /api/customers]")
    // add time it takes to fetch customers from database
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.json({
        data: Array.from({ length: 500 }, (_, i) => ({
            id: i + 1,
            name: `Customer ${i + 1}`,
        })),
    });
    console.timeEnd("[GET /api/customers]")
    eventEmitter.emit('myCustomEvent', () => {
        console.log("[GET /api/customers] A totally different callback for this other event");
    });
});

// set the port to listen on
// which is either the port specified in the .env
// or 3000 if no port is specified
const PORT = process.env.PORT || 3000;

// start the express server
app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));

