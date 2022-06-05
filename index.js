const express = require('express')
require('dotenv').config()
const app = express()
const port = 4001
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var Student = require('./models/Student');
const { default: mongoose } = require('mongoose');

const url = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.pbagd.mongodb.net/student`;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors())

app.get('/getstudents', async(req, res) => {
    const students = await Student.find();
    res.status(200).send(students)
})

app.post('/addstudents', async(req, res) => {
    const student = new Student(req.body);
    student.save();
    res.status(200).send("student got added")
})

app.put('/updatestudents/:id', async(req, res) => {
    const sid = req.params.id;
    const student = await Student.findById(sid);
    console.log(student);
    if (student) {
        await student.updateOne(req.body)
        student.save();
        res.status(200).send("student got updated")
    } else {
        res.status(401).send("student not found")
    }
})
mongoose.connect(url)
    // mongoose.connect("mongodb://localhost:27017/student")
    .then(() => {
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        })

    })
    .catch((err) => {
        console.log("Error Occured while connection database");
    })