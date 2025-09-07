import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext ,useState,useEffect} from "react";
import {RingLoader} from "react-spinners"

function ChatWindow(){
const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChat,setNewChat}=useContext(MyContext)
const  [loading,setLoading]=useState(false);
const[isOpen,setIsOpen]=useState(false); //set default false


const getReply=async()=>{
    setLoading(true);
    setNewChat(false);
    console.log("message",prompt,"threadId",currThreadId);    ////////////////
    
    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            message:prompt,
            threadId:currThreadId
        })
    };

    try{
       const response =await fetch("http://localhost:8080/api/chat",options);
      const res=await response.json();
       console.log(res);
       setReply(res.reply)
       
    }
    catch(err){
console.log(err);

    }
    setLoading(false);
}
    // append new chat to previous
   useEffect(()=>{
  if(prompt && reply){
  setPrevChat(prevChats=>(
    [...prevChats,{
        role:"user",
        content :prompt
    },{
        role:"assistant",
        content:reply
    }]
   ));
  
}
setPrompt("");
   },[reply])


   const handleProfileClick=()=>{
    setIsOpen(!isOpen);
   }


    return(
       <div className="Chatwindow">
        <div className="navbar">
            <span>DXD GPT <i className="fa-solid fa-caret-down"></i></span>
            <div className="userIconDiv" onClick={handleProfileClick}>
               <span className="userIcon"> <i className="fa-solid fa-user-secret"></i></span>
            </div>


        </div>
        {
            isOpen && <div className="dropdown">
           <div className="dropDownitems" ><i class="fa-solid fa-lock"></i>Upgrade Not Available</div>
            <div className="dropDownitems"><i class="fa-solid fa-sliders"></i>Settings</div>
             <div className="dropDownitems"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</div>
            

            </div>
        }
        <Chat></Chat>

      <RingLoader color="#fff" loading={loading}></RingLoader>

        <div className="chatInput">
            <div className="InputBox">
                <input placeholder="Ask Anything"   
                 value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                onKeyDown={(e)=>e.key==='Enter'?getReply():''}
                >
                   
               
                </input>
                <div id="Submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="Info">
                Dont Ask Too Much Hard Questions
            </p>
        </div>
       </div>
    )
}

export default ChatWindow;