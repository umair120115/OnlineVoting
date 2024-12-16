import { useState,useEffect } from "react";
import api from "../api";
import Navbar from "./Navbar";
import '../styles/OrganizedList.css'
import { useNavigate } from "react-router-dom";

function OrganizedList(){
    const [organizations,setOrganizations]=useState([])
    
    const navigate=useNavigate();
    
    useEffect(
        ()=>{
            getMembers();
        },[JSON.stringify(organizations)]
    );
    const getMembers=async ()=>{
        const res= await api.get('/vote/organization/').then(
            (res)=>{
                setOrganizations(res.data);
                console.log(res.data);
            }
        )
    }


    return (
        <>
        <Navbar/>
        
        <div className="event-list">
    {organizations.map((organization) => {
        const name = organization.name;
        const post = organization.organizer_post;
        const organization_id=organization.id
        return (
            
                <div className="event-card" key={organization.id}>
                <h2 className="organization-name">{organization.organization_name}</h2>
                <p className="organizer-details">
                    <strong>Organizer:</strong> {name} <span className="organizer-post">({post})</span>
                </p>
                <p className="event-purpose">
                    <strong>Purpose:</strong> {organization.purpose}
                </p>
                <p className="event-date">
                    <strong>Date of Event:</strong> {organization.date}
                </p>
                <p className="event-description">
                    <strong>Description:</strong> {organization.description}
                </p>
                <button onClick={()=>navigate('/memberlist',{state:organization_id})}>Members</button>
                <button onClick={()=>navigate('/discussionpage',{state:organization_id})}>Discussion</button>
            </div>
            
        );
    })}
</div>
</>

    )



}
export default OrganizedList;