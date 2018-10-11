const express = require('express')
const spawn = require("child_process").spawn;

const app = express()
const port = 9876
const pythonProcess = spawn('python', ["src/tracking_for_react.py"]);

let center;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/objectTracker', (req, res) => res.send(
// "Object Tracker Called",
   center
));

pythonProcess.stdout.on('data', (data) => {
    center = data;
    console.log("Center = " + center)    
}),
pythonProcess.on('exit', (data) => {
    console.log("FINISHED!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)

    // pythonProcess.stdout.on('data', (data) => {
    //     console.log("Center = " + data);
    // });
    // pythonProcess.on('exit', (data) => {
    //     console.log("FINISHED!");
    // });
})