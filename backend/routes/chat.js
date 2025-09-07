import express from "express"
import Thread from "../models/thread.js"
import { get } from "mongoose";
import getPerplexityResponse from "../utils/perplexity.js";


const router = express.Router();
// TEST
router.post("/test", async (req, res) => {
   try {
      const thread = new Thread({
         threadId: "Khalid",
         title: "yusuf"
      })

      const response = await thread.save();
      res.send(response)
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save" })

   }
});


//GET ALL THREADS
router.get("/thread", async (req, res) => {
   try {
      const threads = await Thread.find({}).sort({ updatedAt: -1 })
      // descending order
      res.json(threads)

   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch thread" })


   }
})


// THREAD MESSAGE
router.get("/thread/:threadId", async (req, res) => {

   const { threadId } = req.params;
   try {
      const thread = await Thread.findOne({ threadId });
      if (!thread) {

         res.status(404).json({ error: "Thread not found" });

      }

      res.json(thread.messages);
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch chat" })
   }
})


// DELETE
router.delete("/thread/:threadId", async (req, res) => {
   const { threadId } = req.params
   try {
      const deletethread = await Thread.findOneAndDelete({ threadId })
      if (!deletethread) {
         res.status(404).json({ error: "thread could not found" })
      }
      res.status(200).json({ sucess: "Thread delete suceefully" })
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete thread " })

   }
})


// NEW CHAT WITH MESSAGE
router.post("/chat", async (req, res) => {
   const { threadId, message } = req.body

   if (!threadId || !message) {
      res.status(400).json({ error: "Missing required fields" });
   }
   try {
      let thread = await Thread.findOne({ threadId })

      if (!thread) {
         // create new chat   
         thread = new Thread({
            threadId,
            title: message,
            messages: [{ role: "user", content: message }]
         });
      } else {
         thread.messages.push({ role: "user", content: message })
      }
      const assistantReply = await getPerplexityResponse(message)

      thread.messages.push({ role: "assistant", content: assistantReply })
      thread.updatedAt = new Date()
      await thread.save();
      res.json({ reply: assistantReply });
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: "something went wrong" })
   }


})


export default router;