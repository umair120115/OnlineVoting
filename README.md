# Online Voting Platform

An online voting platform designed to educate the new generation on the importance of voting in democracy. It allows users to vote for their favorite candidates in a secure and seamless manner.

## Features

- **User Authentication**: Users can register, log in, and securely cast their votes.
- **Vote Casting**: Voting for candidates and tracking results.
- **Admin Panel**: Admins can manage candidates, voting sessions, and view results.
- **Real-time Updates**: Live updates for votes and results.

## Technologies Used

- **Backend**:
  - Django
  - Django REST Framework
  - UV Python Package Manager

- **Frontend**:
  - React
  - Vite (for faster builds)

## Setup

### Backend Setup (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/umair120115/OnlineVoting.git
   
   cd OnlineVoting
2. Install dependencies:
     uv install
3. Apply database migrations:
   ```bash
     py manage.py makemigrations
     py manage.py migrate
4. Running backend server:
   ```bash
     py manage.py runserver
4. **Frontend**
   move to the directory:
   ```bash
      cd frontend/
   install dependencies:
   ```bash
      npm install
   run the server to see application:
   ```bash
      npm run dev
