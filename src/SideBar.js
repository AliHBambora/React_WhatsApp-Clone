import React,{useEffect,useState} from 'react'
import './SideBar.css'
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';
import SideChat from './SideChat';
import db from './firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStateValue } from './StateProvider';
function SideBar() {

  const [rooms,setRooms] = useState([]);
  const [input,setInput] = useState('');
  const [{ user },dispatch] = useStateValue();
  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>
      (
        setRooms(snapshot.docs.map(doc=>
          ({
            id:doc.id,
            data:doc.data()
          })
        ))
      ))

      return () =>{
        unsubscribe();
      }
  },[]);

    return (
        <div className='sidebar'>
          <div className="sidebar__header">
              <div className="sidebar__leftheader">
              <Avatar src={user.photoURL}/>
              </div>
            <div className="sidebar_rightheader">
            <IconButton>
            <DonutLargeIcon />
            </IconButton>
            <IconButton> <ChatIcon /></IconButton>
           <IconButton><MoreVertIcon /></IconButton>
            </div>
          </div>
          <div className="sidebar__search">
            <div className="sidebar__searchinput">
              {(input!='')?
              <ArrowBackIcon />:
            <SearchIcon />}
            <input type="text" placeholder='Search or start a new chat' value={input} onChange={(e)=>setInput(e.target.value)}/>
            </div>
          </div>

          <div className="sidebar__chat">
            <SideChat addnewChat />
            {rooms.map(room=>(
              <SideChat id={room.id} name={room.data.Name} key={room.id}/>
            ))}
          </div>
        </div>
    )
}

export default SideBar;
