import api from "../api";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Discussion.css";

function Discussion() {
    const location = useLocation();
    const organization_id = location.state;
    const [discussions, setDiscussions] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        getDiscussions();
    }, [JSON.stringify(discussions)]); // Run only once on component load

    const getDiscussions = async () => {
        try {
            const res = await api.get(`/vote/${organization_id}/get_discussion/`);
            setDiscussions(res.data);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!description.trim()) {
            alert("Please enter a message!");
            return;
        }
        try {
            const res = await api.post(`/vote/${organization_id}/discussion/`, {
                description,
            });
            if (res.status === 201) {
                alert("Message sent successfully!");
                setDescription("");
                getDiscussions(); // Refresh the discussion list
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="discussion-container">
                <h1 className="discussion-title">Organization Discussions</h1>
                <div className="discussion-box">
                    {discussions.length > 0 ? (
                        discussions.map((discussion) => (
                            <div className="discussion-item" key={discussion.id}>
                                <div className="discussion-header">
                                    <strong className="person-name">
                                        {discussion.person_name}
                                    </strong>
                                    <span className="discussion-date">
                                        {discussion.date}
                                    </span>
                                </div>
                                <p className="discussion-description">
                                    {discussion.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="no-discussion-message">No discussions yet. Be the first to share your views!</p>
                    )}
                </div>
                <div className="send-message-box">
                    <input
                        type="text"
                        placeholder="Share your views..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="message-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default Discussion;
