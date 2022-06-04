const express = require('express')
const app = express()
const port = 4001
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var Student = require('./models/Student');
const { default: mongoose } = require('mongoose');


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
mongoose.connect("mongodb+srv://shiva:shiva@cluster0.pbagd.mongodb.net/student")
    .then(() => {
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        })

    })
    .catch((err) => {
        console.log("Error Occured");
    })