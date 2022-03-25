import { Avatar, IconButton } from '@mui/material';
import React, {useState,useEffect}from 'react'
import Message from './Message';
import './Chat.css'
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import db from './firebase';
import { useParams } from 'react-router-dom';
import {useStateValue} from "./StateProvider"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Chat() {
    const [seed,setSeed] = useState('');
    const [input,setInput] = useState('');
    const [name,setName] = useState('');
    const [messages,setMessages] = useState([]);
    const { roomId } = useParams();

    const [{user},dispatch] = useStateValue();
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setName(snapshot.data().Name)
            ))
    }

      const unsubscribe = db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(
                doc=>({
                    id:doc.id,
                    data:doc.data()
                })
            ))
        ))

        return () =>{
            unsubscribe();
          } 

    },[roomId])

    const onsubmit = (event)=>{
        event.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__header--info">
                    <h4>{name}</h4>
                    <p>{(messages.length==0)?"Click for more info":`Last seen at ${new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}`}</p>
                </div>
                <div className="chat__header--right">
                    <IconButton>
                        <SearchIcon />
                        </IconButton>
                        <IconButton>
                        <MoreVertIcon />
                        </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {/* Message */}
                {messages.map(message=>(
                    <Message name={message.data.name} msgBody={message.data.message} timestamp={new Date(message.data?.timestamp?.toDate()).toUTCString()}
                    key={message.id} />
                ))}
            </div>
            <div className="chat__footer">
                <div className='chat__footerLeft'>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                </div>
                <form>
                    <input type="text" className="chat__footer--input" placeholder='Type your message here' value={input}
                    onChange={(e)=>setInput(e.target.value)}/>
                    <button type="submit" onClick={onsubmit}>
                        Send
                    </button>
                </form>
                {(input!='')?
                 <IconButton>
                 <SendIcon />
             </IconButton>:<IconButton>
                    <MicIcon />
                </IconButton> }
                              
            </div>
        </div>
    )
}

export default Chat;
