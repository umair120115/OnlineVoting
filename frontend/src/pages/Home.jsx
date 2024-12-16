import Navbar from '../components/Navbar';
import '../styles/Home.css';
import { FaVoteYea, FaListAlt, FaRobot } from 'react-icons/fa'; // Importing icons from react-icons

function HomeAfterLogin() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome to the Online Voting System</h1>
          <p>
            Your account is active. It's time to make your voice heard! Create events, explore organizations, and use the chatbot to learn about voting.
          </p>
        </header>
        <div className="home-content">
          {/* Feature: Event Creation */}
          <div className="home-card">
            <FaVoteYea className="home-icon" />
            <h2>Event Creation</h2>
            <p>
              Organize voting events easily and securely for your organization. Create an event and start gathering votes today.
            </p>
            <a href="/organize" className="home-button event-button">
              Create Event
            </a>
          </div>

          {/* Feature: List of Organizations */}
          <div className="home-card">
            <FaListAlt className="home-icon" />
            <h2>Organizations List</h2>
            <p>
              Explore events hosted by different organizations. Participate in elections and make your voice count.
            </p>
            <a href="/organizedlist" className="home-button org-button">
              View Organizations
            </a>
          </div>

          {/* Feature: Chatbot for Learning */}
          <div className="home-card">
            <FaRobot className="home-icon" />
            <h2>Learn with Chatbot</h2>
            <p>
              Use our AI-powered chatbot to learn about democratic voting systems, election processes, and more.
            </p>
            <a href="/streamlit" className="home-button chatbot-button">
              Start Chat
            </a>
          </div>
        </div>

        <footer className="home-footer">
          <p>&copy; 2024 Online Voting System. Together, we shape the future.</p>
        </footer>
      </div>
    </>
  );
}

export default HomeAfterLogin;
