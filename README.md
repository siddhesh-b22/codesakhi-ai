# CodeSakhi AI – Your Personal Learning & Coding Companion

![CodeSakhi AI](https://img.shields.io/badge/AI-Gemini%20API-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Overview

**CodeSakhi AI** is an advanced, AI-powered education and development ecosystem specifically engineered for Indian engineering students and placement aspirants. By leveraging the **Google Gemini API**, the platform transforms the traditionally dry and intimidating process of learning Data Structures and Algorithms (DSA) into an intuitive, story-driven experience.

CodeSakhi acts as a "Senior Engineer Big Sister," providing high-fidelity code analysis, logical debugging, and conceptual tutoring using relatable Indian analogies (e.g., explaining memory nodes as "Tiffin Boxes" or recursion as "Matryoshka Dolls").

---

## 🎯 Project Purpose

### The Problem
Traditional coding platforms often focus on rote memorization and passing test cases without fostering a deep, intuitive understanding of the underlying logic. This "knowledge gap" frequently leads to failure in high-stakes technical interviews where candidates are expected to explain their thought processes clearly.

### The Solution
CodeSakhi AI bridges this gap by:
- **Synaptic Storytelling**: Mapping abstract code to real-life scenarios.
- **Deep Code Analysis**: Providing industry-standard feedback on time/space complexity and code quality.
- **Placement Readiness**: Offering company-specific tracks (Google, Amazon, Zomato, etc.) to simulate real interview pressures.
- **Target Users**: Engineering students, career switchers, and DSA enthusiasts looking for a supportive, non-judgmental learning environment.

---

## 🛠️ Tools & Technologies

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 (Functional Components & Hooks) |
| **Language** | TypeScript (Strict Typing for Reliability) |
| **Build Tool** | Vite (HMR & Production-optimized Bundling) |
| **Artificial Intelligence** | Google Gemini API (via `@google/genai`) |
| **Styling** | Tailwind CSS (Utility-first Design System) |
| **Code Editor** | Monaco Editor (Pro-grade IDE Experience) |
| **Deployment** | Vercel (Edge-optimized Hosting) |
| **Version Control** | GitHub |

---

## 🏗️ Architecture & Techniques

### Component-Based Architecture
The application is structured using a modular component design, separating concerns between UI elements, global state (Context API), and business logic (Services).

### Modular Service Design
- **`geminiService.ts`**: Encapsulates all LLM logic, using standardized JSON schemas to ensure predictable AI responses.
- **`UserContext.tsx`**: Manages global learner state, including XP, mastery scores, and persistence via `localStorage`.

### Environment & Production Strategy
- **Environment Handling**: Strictly utilizes `import.meta.env.VITE_GEMINI_API_KEY` for client-side injection during the Vite build process.
- **Lazy Initialization**: Gemini client instances are created on-demand within service functions to ensure environment variables are fully loaded and to prevent top-level module failures in production.
- **Security**: Implements safety guards to verify API key presence before executing AI protocols.

---

## 📈 Project Scale & Scalability

- **Horizontal Growth**: The platform is designed to support an infinite number of "Course Modules" and "Company Tracks" through a centralized `problemService`.
- **Infrastructure Scalability**: Hosted on Vercel’s global CDN, the application handles traffic spikes efficiently with low latency.
- **Data Model**: Uses TypeScript interfaces to define a robust data schema for problems, attempts, and user metrics, making it easy to transition to a traditional database (MongoDB/PostgreSQL) in the future.

---

## 🔮 Future Plans

- **Serverless Backend**: Migrating Gemini calls to Vercel Serverless Functions to hide API keys from the client Network tab.
- **Authentication System**: Integrating Firebase or NextAuth for multi-device sync and social login.
- **Real-time Compiler**: Implementing a containerized code execution engine (Judge0) for true multi-language testing.
- **Voice Tutoring**: Leveraging Gemini Real-time API for natural voice interaction with "Sakhi."
- **Deep Analytics**: Tracking per-concept mastery to generate personalized "Learning Heatmaps."

---

## 👥 Team CodeSakhi

**Team Leader:**
- **Siddheshwar Bhokre**

**Team Members:**
- **Vedant Kadam**
- **Tanvi Katrujwar**

---

## ⚙️ Environment Setup

To run this project locally, follow these steps:

1.  **Clone the Repository**
2.  **Create a `.env` file** in the root directory:
    ```env
    VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
    ```
3.  **Install Dependencies**
    ```bash
    npm install
    ```
4.  **Launch Development Server**
    ```bash
    npm run dev
    ```

---

## 🚀 Deployment Information

**Platform:** Vercel

1.  **Build Command:** `npm run build`
2.  **Output Directory:** `dist`
3.  **Environment Variables:** Ensure `VITE_GEMINI_API_KEY` is added in the Vercel Project Settings under "Environment Variables."
4.  **Routing:** The project includes a `vercel.json` rewrite configuration to support React Router's client-side navigation.

---

*Built with ❤️ for the next generation of Indian Engineers.*