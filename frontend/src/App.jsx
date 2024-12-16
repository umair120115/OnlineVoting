import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import LoginForm from "./components/LoginPage";
import RegisterForm from "./components/RegisterPage";
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import OrgCreation from "./components/orgCreations";
import OrganizedList from "./components/OrganizedEvents";
import MemberList from "./components/ParticipatedMember";
import VotingManifesto from "./components/VotingManifesto";
import Discussion from "./pages/DiscussionPage";
import StreamlitEmbed from "./pages/Chatbot";

function App() {
  function Logout(){
    localStorage.clear();
    return <Navigate to={'/login'}/>
  }
  function RegisterandLogout(){
    localStorage.clear();
    return <RegisterForm/>
  }
  

  return (
    <BrowserRouter>
       <Routes>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/register' element={<RegisterandLogout/>}/>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/organize' element={<ProtectedRoute><OrgCreation/></ProtectedRoute>}/>
            <Route path='/organizedlist' element={<ProtectedRoute><OrganizedList/></ProtectedRoute>}/>
            <Route path='/memberlist' element={<ProtectedRoute><MemberList/></ProtectedRoute>}/>
            <Route path='/membermanifesto' element={<ProtectedRoute><VotingManifesto/></ProtectedRoute>}/>
            <Route path='/discussionpage' element={<ProtectedRoute><Discussion/></ProtectedRoute>}/>
            <Route path='/streamlit' element={<ProtectedRoute><StreamlitEmbed/></ProtectedRoute>}/>


       </Routes>
    
    
    
    
    </BrowserRouter>
   
  );
}

export default App
