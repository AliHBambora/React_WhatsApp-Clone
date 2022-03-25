import { Avatar } from '@mui/material';
import React , {useState,useEffect} from 'react'
import db from './firebase';
import './SideChat.css';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

function SideChat({ addnewChat,id,name }) {

    const [seed,setSeed] = useState('');

    const [messages,setMessages] = useState([]);
    const createchat = ()=>{
        const roomname = prompt('Enter new name for chat');

        // const { value: roomname } = Swal.fire({
        //     title: 'New Chat',
        //     input: 'text',
        //     inputPlaceholder: 'Enter your new chat name',
        //     confirmButtonText:'Create',
        //     showCancelButton: true,
        //   }).then((result)=>{
        //     if(result.isConfirmed){
        //         if(roomname){
        //             db.collection('rooms').add(
        //                 {
        //                     Name:roomname
        //                 }
        //             )
        //         }
        //     }
        //   })
        //   console.log(roomname);

     
    }
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    useEffect(()=>{
    const unsubscribe = db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>(
                doc.data()
            )))
        ))

        return () =>{
            unsubscribe();
          } 
 
    },[]);

    return (!addnewChat) ? (
        <Link to={`/rooms/${id}`}>
        <div className='sidechat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidechat__info">
                <h3>{name}</h3>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):
    (<div className="sidechat" onClick={createchat}>
        <h3>Add new Chat</h3>
    </div>)
}

export default SideChat;

