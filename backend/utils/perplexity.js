import 'dotenv/config';

const getPerplexityResponse=async(message)=>{
     
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`
      
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [

    //      {
    //   role: "system",
    //   content: "Be precise and concise."
    // },
    {
      role: "user",
      content: message
    }
      ] 
    })
  }; 

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", options);
    const data = await response.json();
    return data.choices[0].message.content;
    //const reply = data?.choices?.[0]?.message?.content || "No reply from AI";
   // console.log(data.choices[0].message.content);
   // res.send(data)
   // res.send(data.choices[0].message.content);
    //  return (data.choices[0].message.content);
  }
   catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
}

export default getPerplexityResponse;