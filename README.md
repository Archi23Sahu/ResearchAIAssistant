# 🔬 ResearchAI — Personal Research Assistant

An AI agent that takes a topic, searches the web, reads multiple sources, and writes a structured report with citations.

## Stack
- **Frontend**: React + Vite + CSS
- **Backend**: FastAPI (Python)
- **Agent**: CrewAI (2 agents: Researcher + Writer)
- **LLM**: Groq — Llama 3.1 70B 
- **Search**: Tavily API 

---

## 🚀 Setup

### 1. Get free API keys

| Service | Signup Link | 
|---------|-------------|
| Groq    | https://console.groq.com | 
| Tavily  | https://tavily.com |      

---

### 2. Backend setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up env variables
cp .env.example .env
# → Open .env and add your GROQ_API_KEY and TAVILY_API_KEY

# Run the server
python main.py
# Server runs at http://localhost:8000
```

---

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
# App runs at http://localhost:5173
```

## 🔄 How it works

1. User enters a topic in the React UI
2. React sends `POST /research` to FastAPI
3. FastAPI starts the CrewAI agent pipeline:
   - **Researcher Agent** searches the web via Tavily (4-5 sources)
   - **Writer Agent** synthesizes findings into a structured report
4. Report returned as markdown → rendered in the UI
5. User can copy or download the report

---
