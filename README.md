
# OptiCampus 🌿 -> SUSTAINTECH

**OptiCampus** is a smart campus sustainability platform designed to optimize resource usage and promote eco-friendly practices. It features an AI-powered chatbot for sustainability insights, a comprehensive dashboard for monitoring metrics, and management systems for staff, students, and maintenance.

🔗 **Live Deployment:** [https://sustaintech.vercel.app/](https://sustaintech.vercel.app/)

## ✨ Features

- **🤖 AI Sustainability Assistant:**
    - Powered by **Google Gemini 2.5 Flash**.
    - Provides real-time, eco-friendly suggestions and resource optimization ideas.
    - Interactive chat interface with summarized tips and detailed elaborations.

- **📊 Smart Dashboard:**
    - Visualizes campus data using **Recharts**.
    - Tracks key sustainability metrics.

- **🔐 Robust Authentication:**
    - Secure login for Students, Staff, and Administrators.
    - JWT-based session management.

- **🛠️ Management Modules:**
    - **Student Management:** Track and manage student activities.
    - **Staff Management:** Coordinate staff schedules and tasks.
    - **Maintenance Tracking:** Log and monitor maintenance requests.

## 🏗️ Tech Stack

### Frontend 💻
- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Visualization:** [Recharts](https://recharts.org/)

### Backend ⚙️
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

### AI Service 🧠
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Model:** Google Gemini (via `google-generativeai`)
- **Validation:** Pydantic

## 🚀 Getting Started

### Prerequisites
- Node.js & npm/bun
- Python 3.8+
- MongoDB Instance

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ArunIsharwal/SUSTAINTECH.git
    cd SUSTAINTECH
    ```

2.  **Frontend Setup**
    ```bash
    cd FRONTEND
    npm install
    # Create .env file with VITE_API_URL etc.
    npm run dev
    ```

3.  **Backend Setup**
    ```bash
    cd ../backend
    npm install
    # Create .env file with PORT, MONGO_URI, JWT_SECRET
    npm start
    ```

4.  **AI Chatbot Setup**
    ```bash
    cd ../aimlchatbot
    python -m venv .venv
    # Windows
    .\.venv\Scripts\Activate
    # Mac/Linux
    # source .venv/bin/activate
    pip install -r requirements.txt
    # Create .env file with GEMINI_API_KEY
    uvicorn main:app --reload --port 5001
    ```
