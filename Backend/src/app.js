const express = require("express")
const path = require("path")
const app = express()

require("./db/conn")

const Register = require("./models/register")

const port = process.env.PORT || 8080

const static_path = path.join(__dirname, "../public")
app.use(express.static(static_path))
app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    try {

      const newRegistration = new Register({
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        year: req.body.year,
        phone: req.body.phone,
        password: req.body.password,
      });
  
      await newRegistration.save();
      res.status(200).send("Registration successful!");
    } catch (error) {
      console.log(error)
      res.status(500).send(`nternal Server Error ${error.message}`);
    }
  });



app.get("/",(req,res) => {
    res.send("hello world")
});




app.listen(port , () => {
    console.log(`server is running on ${port}`)
})