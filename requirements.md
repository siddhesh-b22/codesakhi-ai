# CodeSakhi AI – Software Requirements Specification (SRS)

## 1. Project Overview
CodeSakhi AI is an AI-powered education and development companion specifically designed for Indian engineering students. It leverages the Google Gemini API to transform complex technical concepts into relatable, story-driven analogies (e.g., "Tiffin Boxes" for memory nodes) and provides high-fidelity code analysis for interview preparation.

## 2. Problem Statement
Traditional coding platforms often present data structures and algorithms (DSA) in a dry, academic manner, leading to rote memorization. Students frequently struggle to bridge the gap between "solving a problem" and "understanding the logic" required for high-stakes interviews at companies like Google, Amazon, or Zomato.

## 3. Objectives
- **Demystify DSA:** Use "Synaptic Storytelling" to make logic intuitive.
- **Provide Industry-Grade Feedback:** Analyze code for complexity and quality based on specific company hiring bars.
- **Personalized Learning:** Track "XP" and mastery levels across different modules.
- **All-in-One Workspace:** Integrate a compiler, tutor, debugger, and notes synthesizer.

## 4. Target Users
- Undergraduate engineering students in India.
- Job seekers preparing for FAANG, Product-based, and Service-based company interviews.
- Self-taught developers looking for a supportive, peer-like mentor.

## 5. Functional Requirements
### 5.1 User Profile & Stats
- Maintain a persistent user state including XP, daily streaks, and mastery scores for DSA modules.
- Adaptive learning: Use previous performance to generate targeted quiz questions.

### 5.2 Interactive Compiler
- Support for multiple languages (JavaScript, Python, C++, Java).
- Real-time code execution and test case verification.
- "Submit" functionality to trigger deep AI analysis.

### 5.3 AI-Powered Analysis (Gemini Integration)
- **Logic Decoder:** Line-by-line explanation of code using analogies.
- **Bug Shield:** Logical vulnerability scanning and fix suggestions.
- **Complexity Analysis:** Evaluation of Time/Space complexity with optimal pattern suggestions.
- **Company Readiness:** Scoring of code based on specific company hiring standards.

### 5.4 Notes Alchemist
- Text-to-Summary transmutation: Converting raw lecture notes into bullet points, flashcards, and core summaries.

### 5.5 Course & Company Roadmap
- Gated progression: Modules unlock only after passing a 60% mastery threshold.
- Company-specific practice tracks (Google, Amazon, TCS, etc.).

## 6. Non-Functional Requirements
- **Performance:** UI transitions should be fluid (60fps); initial page load under 2 seconds.
- **Reliability:** Graceful handling of Gemini API rate limits or downtime.
- **Accessibility:** High-contrast text, clear typography (Plus Jakarta Sans), and ARIA-compliant navigation.
- **Scalability:** SPA architecture capable of handling growing course content without performance degradation.
- **Browser Compatibility:** Support for Chrome, Firefox, Safari, and Edge (Vite-standard ESM support).

## 7. Technical Requirements
- **Runtime:** Node.js 18+ (Development).
- **Framework:** React 19 (TypeScript).
- **Build Tool:** Vite (Production-optimized).
- **Environment:** API Keys handled via `import.meta.env.VITE_GEMINI_API_KEY`.
- **Deployment:** Vercel (Edge-optimized hosting).

## 8. Constraints
- API calls depend on external Google Gemini infrastructure.
- Client-side execution limits the size of files that can be processed in "Notes Alchemist."

## 9. Assumptions
- Users have a stable internet connection for API interactions.
- The `VITE_GEMINI_API_KEY` is securely injected by the deployment environment (Vercel).

## 10. Future Enhancements
- Voice-enabled tutoring using Gemini Real-time API.
- Collaborative "Chai Break" rooms for peer-to-peer debugging.
- Mobile application (React Native) with offline-sync for notes.