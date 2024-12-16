import React from "react";
import { useState,useEffect } from "react";
import api from "../api";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import '../styles/MemberManifesto.css'


function VotingManifesto(){
  
    const[manifestos,setManifestos]=useState([])
    const location=useLocation();
    const member=location.state
    const member_id=member['id']
    
    useEffect(
        ()=>{
            getManifesto();
            
        },[JSON.stringify(manifestos)]
    );
    
    const getManifesto=async()=>{
        const res =await api.get(`/vote/${member_id}/manifesto/`).then(
            (res)=>{
                setManifestos(res.data);
                console.log(res.data);
                console.log(member)
            }
        )
    }
    
    
     return(
        <><Navbar />
       <div className="profiles-container">
      {manifestos.map((manifesto, index) => (
        <div className="candidate-box" key={index}>
          <h3>Candidate Profile</h3>
          <div className="detail-container">
            <img
              src={manifesto.photo}
              alt={`${manifesto.name}'s profile`}
              className="candidate-photo"
            />
            <div className="details">
              <p>
                <strong>Name: </strong> {member.name}
              </p>
              <p>
                <strong>Email: </strong> {member.email}
              </p>
              <p>
                <strong>Age: </strong> {member.age}
              </p>
              <p>
                <strong>Manifesto: </strong>
                <a href={manifesto.manifesto} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
        
        </>
     )
}
export default VotingManifesto;