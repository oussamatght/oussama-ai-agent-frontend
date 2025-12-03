
🚀 Oussama AI Agent — Frontend

An intelligent, fully responsive AI assistant frontend built with Next.js, React, TailwindCSS, and OpenAI Realtime API.
This project serves as the user interface for the Oussama AI Agent, delivering real-time conversation, TTS voice output (Arabic & English), and a clean, modern UI experience.

⭐ Features

🎧 AI Voice Output (Arabic & English — male voice)

💬 Real-time chat powered by WebSockets

🖥️ Responsive UI for mobile, tablet, and desktop

🎙️ Speech Synthesis using OpenAI Realtime

🌙 Clean, modern, dark design

⚡ Fast rendering with Next.js App Router

🔧 Full integration with backend session system

📦 Optimized build & reusable components

🏗️ Tech Stack
Technology	Description
Next.js 14	App router, SSR, Client Components
React 18	UI components
TailwindCSS	Responsive styling
Axios	API communication
OpenAI Realtime	Streaming voice + text
WebSockets	Live conversation updates
📂 Project Structure
frontend/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   ├── InputBox.tsx
│   └── VoicePlayer.tsx
├── hooks/
│   └── useRealtime.ts
├── utils/
│   └── formatMessage.ts
├── public/
│   └── icons/
└── README.md

⚙️ Environment Variables

Create a .env.local file:

NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
NEXT_PUBLIC_REALTIME_API_KEY=your-openai-key


⚠️ Do NOT expose your private backend key in frontend.
Only use public or temp session tokens returned from backend.

▶️ Installation & Running
1️⃣ Clone the repo
git clone https://github.com/oussamatght/oussama-ai-agent-frontend.git
cd oussama-ai-agent-frontend

2️⃣ Install dependencies
npm install

3️⃣ Run locally
npm run dev

4️⃣ Build for production
npm run build
npm start

🔗 Backend Repo

The backend powering authentication, sessions, and real-time WebSockets:

👉 https://github.com/oussamatght/oussama-ai-agent-backend
 (replace if needed)

🧠 About the AI Personality

The assistant adopts the persona of Oussama, a calm, introspective Algerian computer science student with a balanced personality and bilingual communication (Arabic + English).
Voice responses match the persona using male TTS.

📱 Responsive Design

Works perfectly on:

Mobile

Tablet

Desktop

Ultra-wide monitors

All UI components are built with Tailwind’s grid & flex utilities.

🐛 Common Issues
White space / right overflow

Add this to global CSS:

html, body {
  overflow-x: hidden;
}

Realtime API not speaking

Ensure backend returns audio chunks encoded in base64.

🤝 Contributing

Pull requests are welcome — feel free to improve design, logic, or features.

📄 License

MIT License © 2025 Oussama T.

💙 Contact

Instagram: @oussama_soul_

GitHub: oussamatght

Gmail: oussamatght6@gmail.com
