import React from "react";
import Navbar from "../components/Navbar";

const StreamlitEmbed = () => {
    return (
        <><Navbar /><div style={{ textAlign: "center", margin: "20px" }}>
            <h3>Ask me to Learn More</h3>
            <iframe
                src="http://localhost:8501" // Replace with your Streamlit app's URL
                title="Streamlit App"
                style={{
                    width: "100%",
                    height: "90vh", // Adjust height as needed
                    border: "none",
                }} />
        </div></>
    );
};

export default StreamlitEmbed;
