import express from "express";
import cors from "cors";
import mongoose from "mongoose";;
import User from "./models/user.js";
import savedCards from "./models/savedCards.js";
import * as dotenv from "dotenv";
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;
  //console.log("searching", req.body);
  const person = await User.findOne({ Username });
  if (!person) {
    return res.json({ error: "User does not exist" })
  }
  else {
    if (Password === person.Password) {
      //const token = jwt.sign([], JWT_SECRETE);

      if (res.status(201)) {
        return res.json({ status: "Loggedin", userInfo: person.Username })
      }
      else {
        return res.json({ error: "Unable" })
      }
    }
  }
  /*
  .then(user => {
    if(user){
      console.log(user.Username)
      if (user.Password === pwd){
        res.json('Success', user.Username)
      }
      else{
        res.json('Incorrect Credentials')
      }
    }
    else{
      console.log(req.body)
      res.json('User does not exist')
    }
  }) */
})

app.post('/signup', async (req, res) => {
  const { user, pwd } = req.body;
  const oldUser = await User.findOne({ Username: user })
  if (oldUser) {
    return res.json({ error: "user exist" });;
  }
  else {
    //res.send({error: "user exist"});
    User.create(req.body)
      .then(User => res.json(User))
      .catch(error => res.json(error))
  }
})

app.post('/saving', async (req, res) => {
  //const {user, url} = req.body;
  //console.log(req.body);
  const oldUser = await savedCards.findOne({ Username: req.body.Username })
  //console.log("User found", oldUser);
  const data = req.body.Url
  if (oldUser) {
    /* const latest = new savedCards({
      Username: req.body.Username,
      url: data
    })
    const result = await latest.save(); */
    await savedCards.updateOne(
      { Username: req.body.Username },
      { $push: { url: data } }
    )
    return res.json({ status: "saving data" });;
  }
  else {
    //res.send({error: "user exist"});
    await savedCards.create(req.body)
      .then(User => res.json(User))
      .catch(error => res.json(error))
    // await savedCards.insertOne({url: url})
    await savedCards.updateOne(
      { Username: req.body.Username },
      { $push: { url: data } }
    )
  }
})


app.post('/saved', async (req, res) => {
  //console.log(req.body.Username);
  const oldUser = await savedCards.findOne(
    { Username: req.body.Username }
  );
  //console.log(oldUser);
  if (oldUser) {
    return res.json({ Data: oldUser.url })
  }
  else {
    return res.json({ error: "no data" });;
  }
})
console.log(process.env.USER_NAME)
const CONN_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.6elb8vo.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000
// connnection to mongodb
mongoose.connect(CONN_URL, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error.message);
  })

