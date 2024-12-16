import { useState,useEffect } from "react";
import api from "../api";
import React from "react";
import Navbar from "./Navbar";
import '../styles/ParticipatedMember.css'
import { useLocation,useNavigate } from "react-router-dom";
import '../styles/Counting.css'


function MemberList(){
    const[members,setMembers]=useState([])
    const [countings,setCountings]=useState([])
    const [csv_file,setCsv_file]=useState(null)
    const[membercsv_file,setMembercsv_file]=useState(null)
    const navigate= useNavigate();
    
    const location=useLocation();
    const organization_id=location.state
    useEffect(
        ()=>{
            getMembers();
            getCounting();
        },[]
    );
    
    const getMembers=async()=>{
        const res = await api.get(`/vote/${organization_id}/member/`).then(
            (res)=>{
                setMembers(res.data);
                console.log(organization_id)
                
            }
        )
    }
    const getCounting=async ()=>{
        const res = await api.get(`/vote/${organization_id}/countings/`).then(
            (res)=>{
                setCountings(res.data);
                
            }
        )
    }
    const handleVoters = async (e) => {
        e.preventDefault();
    
        if (!csv_file) {
          alert("Please select a CSV file before uploading.");
          return;
        }
    
        // Prepare the form data
        const formData = new FormData();
        formData.append("csv_file", csv_file);
        
        const res =await api.post(`/vote/${organization_id}/voterlist/`,formData,{
            headers: { "Content-Type": "multipart/form-data" },
        }).then(
            (res)=>{
                alert(res.data.status)
            }
        )
    }
    
    const handleMember = async (e) => {
        e.preventDefault();
    
        if (!csv_file) {
          alert("Please select a CSV file before uploading.");
          return;
        }
    
        // Prepare the form data
        const formData = new FormData();
        formData.append("csv_file", csv_file);
        
        const res =await api.post(`/vote/${organization_id}/membersfile/`,formData,{
            headers: { "Content-Type": "multipart/form-data" },
        }).then(
            (res)=>{
                alert(res.data.status)
            }
        )
    }
    return <>
    <Navbar/>
    <div className="upload-voterlist">
    <form className="upload-form" onSubmit={handleVoters}>
        <h3 className="form-title">Upload Voter List</h3>
        <p className="form-note">
            <strong>Note:</strong> Can only be uploaded by the event organizer!
        </p>
        <input
            className="file-input"
            type="file"
            onChange={(e) => setCsv_file(e.target.files[0])}
            accept=".csv"
        />
        <button className="upload-button" type="submit">Upload</button>
        <h3 className="form-title">Upload Member List</h3>
        <p className="form-note">
            <strong>Note:</strong> Can only be uploaded by the event organizer!
        </p>
        <input
            className="file-input"
            type="file"
            onChange={(e) => setMembercsv_file(e.target.files[0])}
            accept=".csv"
        />
        <button className="upload-button" onClick={handleMember}>Upload</button>
    </form>
</div>




    <div className="counting-wrapper">
      {countings.map((counting, index) => (
        <div className="counting-box" key={index}>
          <strong>Member Name: </strong> {counting.member_name}
          <br />
          <strong>Votes: </strong> {counting.no_votes}
        </div>
      ))}
    </div>




    <div className="member-list-container">
    <h3>Member List</h3>
    <div className="members-grid">
        {members.map((member) => 
            {
                const handleVote=async()=>{
                    const res =await api.post(`/vote/${member.id}/vote/`).then(
                        (res)=>{
                            alert(res.data.status);
                            console.log(res.data.status)
                        }
                    )
                }
                return <>
                
                <div className="member-card" key={member.id}>
                <div className="member-header">
                    <strong className="organization-name">{member.organization_name}</strong>
                </div>
                <div className="member-details">
                    <p>
                        <strong>Candidate Name:</strong> {member.name}
                    </p>
                    <p>
                        <strong>Age:</strong> {member.age}
                    </p>
                    <p>
                        <strong>Email:</strong> {member.email}
                    </p>
                    <button onClick={()=>navigate('/membermanifesto',{state:member})}>Details</button>
                    <button onClick={handleVote}>Vote</button>
                </div>
            </div>
                
                </>
            }

                      
                
            
            
        )}
    </div>
</div>

    </>

}
export default MemberList;