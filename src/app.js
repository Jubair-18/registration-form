const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/userRag");



const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials")



app.set("view engine", "hbs")
app.set("views", viewsPath);
hbs.registerPartials(partialPath)

app.use(express.static(__dirname + './public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.post("/register", async(req, res) => {
    try {
        if (req.body.password === req.body.c_Password) {
            const userData = new Register(req.body);
            const registered = await userData.save();
            res.status(201).render("index");
        } else {
            alert('password not matching')
        }
    } catch (err) {
        res.status(404).send("something is heppen")
    }
})

app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findone({ email: email })
        if (userEmail.password === password) {
            res.status(200).render("index")
        } else {
            res.send("invalid login detail")
        }

    } catch {
        res.status(400).send("invalid login detail")
    }
})


app.listen(port, () => {
    console.log(`this app is running on port ${port}`)
})