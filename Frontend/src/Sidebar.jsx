import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";


function Sidebar(){
 const{allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChat}=useContext(MyContext);

 const getAllThread=async()=>{
  try{
  //  const response=await fetch("http://localhost:8080/api/thread")
   const response = await fetch("https://sigmagpt-fl54.onrender.com/api/thread",options)

  const res=await response.json();
  const filteredData=res.map(thread=>({threadId:thread.threadId,title:thread.title}))
  setAllThreads(filteredData);
  // console.log(filteredData);
  //thread id ,title
  
  }catch(err){
    console.log(err);
    
  }

 };

 useEffect(()=>{
  getAllThread();
 },[currThreadId])

 const createNewChat=()=>{
  setNewChat(true);
  setPrompt("");
  setReply(null);
  setCurrThreadId(uuidv1());
  setPrevChat([]);
 }

 const changeThread= async (newThreadid)=>{
 setCurrThreadId(newThreadid);
 try{
  // const response=await fetch(`http://localhost:8080/api/thread/${newThreadid}`);

  const response = await fetch(`https://sigmagpt-fl54.onrender.com/api/thread/${newThreadid}`)
  const res=await response.json();
  //console.log(res);
  setPrevChat(res);
  setNewChat(false);
  setReply(null);
  
 }catch(err){
  console.log(err);
  

 }
 }


 const  deleteThread=async (threadId)=>{
  try{
  //  const response=await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"});
   const response = await fetch(`https://sigmagpt-fl54.onrender.com/api/thread/${threadId}`,{method:"DELETE"});

  const res=await response.json();
  console.log(res);

  // upated thread render
setAllThreads(prev=>prev.filter(thread=>thread.threadId !== threadId))  
 
if(threadId === currThreadId){
  createNewChat();
}


  }catch(err){
console.log(err);

  }
 }


     return(
       <section className="sidebar">
         {/*new chat button*/ }
      <button onClick={createNewChat}>
        <img src="src/assets/image.jpg" alt="Gpt LOgo" className="logo" ></img>
       <span><i className="fa-solid fa-pen-to-square"></i></span>
      
      </button>


         {/*history*/ }

         <ul className="history">
        {
          allThreads?.map((thread,idx)=>(
            <li key={idx}
            onClick={(e)=>changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted":" "}
            >
              {thread.title} 
               <i className="fa-solid fa-trash"
               onClick={(e)=>{
                e.stopPropagation(); //stop event bubbling
                 deleteThread(thread.threadId)
               }}
               ></i>
              </li>
          ))
        }
         </ul>

         {/*sign*/ }

         <div className="sign">
          <p>By Mugera &hearts;</p>
         </div>

       </section>
     )
}
export default Sidebar;