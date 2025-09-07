
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);

app.listen(PORT, () => {
    connectdb();
  console.log(`server running on ${PORT}`);

});

const connectdb= async()=>{
  try{
await mongoose.connect(process.env.MONGODB_URL);
console.log("database connected");

  }
  catch(err){
    console.log("Failed to connect",err);    
  }
}


// app.post("/test", async (req, res) => {
// console.log("Incoming message:",req.body.message);
  
  
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//        "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`
      
//     },
//     body: JSON.stringify({
//       model: "sonar",
//       messages: [

//     //      {
//     //   role: "system",
//     //   content: "Be precise and concise."
//     // },
//     {
//       role: "user",
//       content: req.body.message
//     }
//       ] 
//     })
//   }; 

//   try {
//     const response = await fetch("https://api.perplexity.ai/chat/completions", options);
//     const data = await response.json();
//     res.send(data.choices[0].message.content);
//     //const reply = data?.choices?.[0]?.message?.content || "No reply from AI";
//    // console.log(data.choices[0].message.content);
//    // res.send(data)
//    // res.send(data.choices[0].message.content);
//     //  return (data.choices[0].message.content);
//   }
//    catch (err) {
//     console.log(err);
//     res.status(500).send({ error: "Something went wrong" });
//   }
// });



// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(cors());

// app.listen(PORT, () => {
//   console.log(`server running on ${PORT}`);
// });

// app.post("/test", async (req, res) => {
//   console.log("Incoming message:", req.body.message);

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "sonar",
//       messages: [
//         { role: "user", content: req.body.message }
//       ]
//     })
//   };

//   try {
//     const response = await fetch("https://api.perplexity.ai/chat/completions", options);
//     const data = await response.json();
    
//     // Extract and return only the assistant response content
//     res.send({ response: data.choices.message.content });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: "Something went wrong" });
//   }
// });