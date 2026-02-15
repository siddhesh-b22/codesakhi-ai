# CodeSakhi AI – Software Requirements Specification

## 1. Problem Statement
Traditional engineering education in India often presents Data Structures and Algorithms (DSA) in a dry, academic manner. Students frequently resort to rote memorization rather than developing a deep, intuitive understanding of logic. Furthermore, there is a significant "readiness gap" between solving a problem on a platform and being able to explain that logic clearly during high-stakes technical interviews at companies like Google, Amazon, or Zomato.

## 2. Objectives
*   **Intuitive Learning:** Transform abstract code into relatable Indian analogies (e.g., "Tiffin Boxes" for memory nodes).
*   **Actionable Feedback:** Provide high-fidelity analysis of code submissions, including time/space complexity and company-specific readiness scores.
*   **Unified Workspace:** Offer a single platform for learning (Courses), practicing (Compiler), and refining (AI Tutoring).
*   **Gated Progression:** Ensure mastery through threshold-based progression, where subsequent modules unlock only after a 60% mastery score.

## 3. Functional Requirements
*   **User Dashboard:** Display real-time learning metrics, XP, current streaks, and recommended "Logic Nodes."
*   **Gated Course System:** A curriculum divided into modules (e.g., Arrays, Trees) with required assessments for advancement.
*   **Interactive Compiler:** Support for multi-language execution (JS, Python, C++, Java) with test case verification.
*   **AI Submission Analysis:** Deep analysis of user code using the Gemini API to evaluate readability, efficiency, and correctness.
*   **Notes Alchemist:** A utility to transmute raw lecture notes into structured summaries and active-recall flashcards.
*   **Bug Shield:** An AI-driven debugging assistant that identifies logical traps and suggests remediated code.
*   **Adaptive Quiz Generator:** Real-time generation of assessments based on the user's current difficulty level and weak concepts.

## 4. Non-Functional Requirements
*   **Performance:** Initial page load under 2 seconds; UI transitions maintained at 60fps for a fluid "Sticker-Card" experience.
*   **Scalability:** A modular architecture capable of supporting horizontal expansion of course content and company-specific tracks.
*   **Availability:** High availability achieved through Vercel's global CDN and robust error handling for external API dependencies.
*   **Security:** Secure handling of the Gemini API key via environment variables and sanitization of user inputs.
*   **Responsiveness:** Seamless functionality across mobile, tablet, and desktop viewports.

## 5. Constraints
*   **API Dependency:** The application’s intelligence layer is dependent on the availability and rate limits of the Google Gemini API.
*   **Client-Side Execution:** Code execution is simulated on the client side; large-scale computational tasks are limited by browser resources.
*   **Environment Restrictions:** Requires the injection of `process.env.API_KEY` for full functionality.

## 6. Future Scope
*   **Voice-Enabled Tutoring:** Integration with Gemini's real-time audio modality for natural language conversations.
*   **Backend Integration:** Migration to a serverless backend architecture to enhance API key security and enable persistent cloud storage.
*   **Collaborative Logic:** "Chai Break" rooms for peer-to-peer debugging and real-time collaborative coding.
*   **Mobile App:** Development of a React Native application for offline access to the "Notes Alchemist" deck.