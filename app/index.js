import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";;
import cardRoutes from "./Routes/Cards.js";
import User from "./models/user.js";

const app = express()
app.use(express.json())
app.use(cors())

app.post('/login', async(req, res) => {
  const {Username, Password} = req.body;
  //console.log("searching", req.body);
  const person = await User.findOne({ Username });
  if (!person){
    return res.json({error: "User does not exist"})
  }
  else{
    if(Password === person.Password ){
      //const token = jwt.sign([], JWT_SECRETE);

      if (res.status(201)){
        return res.json({status: "Loggedin", userInfo: person.Username})
      }
      else{
        return res.json({error: "Unable"})
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
  const {user, pwd} = req.body;
  const oldUser = await User.findOne({Username: user})
  if(oldUser){
    return res.json({error: "user exist"});;
  }
  else{
    //res.send({error: "user exist"});
    User.create(req.body)
    .then(User => res.json(User))
    .catch(error => res.json(error))
  }
})

app.post('/saved', async (req, res) => {
  const {user} = req.body;
  const oldUser = await User.findOne({Username: user})
  if(oldUser){
    return res.json({ Data: oldUser.Url })
  }
  else{
    return res.json({error: "no data"});;
  }
})

const CONN_URL = process.env.URL ;
const PORT = process.env.PORT || 5000
// connnection to mongodb
mongoose.connect(CONN_URL, {})
    .then(() => {
        app.listen(PORT, ()=>{
            console.log(`Server Running on Port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })

/*
 const client = new MongoClient(CONN_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
*/ 

//const data  = await client.db().collection().find().toArry();

//mongoose.set('useFindAndModify', false); // to reduce any warning in console    
//  mongodb+srv://<username>:<password>@cluster0.6elb8vo.mongodb.net/?retryWrites=true&w=majority
// news-user-1
// FMBAZqV9sNELFS6I
