import './App.css';
import Chat from './Chat';
import SideBar from './SideBar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Login';
import { useStateValue } from './StateProvider';
import DashBoard from './DashBoard';
function App() {
  const [{user},dispatch] = useStateValue();

  return(!user)?
  (<Login />)
  :
  (
    <div className="app">
    <div className="app__body">
      <Router>
      <SideBar />
      <Routes>
      <Route path="/" element={<DashBoard />}>
      </Route>
      <Route path="/rooms/:roomId" element={<Chat />} />
      </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
