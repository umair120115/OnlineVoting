import api from "../api";
import Navbar from "./Navbar";
import React from "react";
import { useState,useEffect } from "react";
import '../styles/OrgCreation.css'
import { useNavigate } from "react-router-dom";
function OrgCreation(){
    
    const [organization_name,setOrganization_name]=useState('')
    const [purpose,setPurpose]=useState('')
    const[date,setDate]=useState()
    const[organizer_post,setOrganizer_post]=useState('')
    const[description,setDescription]=useState('')
    const navigate=useNavigate();

    

    const handleSubmit=async()=>{
        const res =await api.post('/vote/organization/',{organization_name,purpose,date,organizer_post,description},{headers:{'Content-Type':'multipart/form-data'}}).then(
            (res)=>{
                alert(res.status);
            }
        )
    }
    return (
        <><Navbar />
        
        
        <div className="organizer-container">
    <form action="" onSubmit={handleSubmit} className="create-organization">
        <h3>Organize Voting Event</h3>
        <div className="form-group">
            <label htmlFor="organization_name">Organization Name:</label>
            <input
                type="text"
                id="organization_name"
                placeholder="Enter organization name"
                value={organization_name}
                onChange={(e) => setOrganization_name(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="purpose">Purpose of Event:</label>
            <input
                type="text"
                id="purpose"
                placeholder="Enter purpose of the event"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="date">Date of Event:</label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="organizer_post">Organizer's Post:</label>
            <input
                type="text"
                id="organizer_post"
                placeholder="Enter your position in the organization"
                value={organizer_post}
                onChange={(e) => setOrganizer_post(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description of Event:</label>
            <textarea
                id="description"
                placeholder="Write a short description about the event"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <button type="submit" className="submit-button">Submit</button>
    </form>
</div>
</>
    )

}
export default OrgCreation;