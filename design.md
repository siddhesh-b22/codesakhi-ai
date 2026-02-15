# CodeSakhi AI – Technical Design Document

## 1. System Architecture Overview
CodeSakhi AI is a client-side heavy Single Page Application (SPA) built with React and Vite. It follows a modular service-oriented architecture where the frontend interacts directly with the Google Gemini API for intelligence and uses browser storage for state persistence.

## 2. High-Level Architecture
- **UI Layer:** React components styled with Tailwind CSS, utilizing a "Sticker-Card" aesthetic.
- **Business Logic Layer:** Services (e.g., `geminiService`, `problemService`) that handle data transformation and API orchestration.
- **State Management:** React Context API (`UserContext`) managing global learner progress and preferences.
- **External Integration:** Google Gemini SDK (`@google/genai`) for LLM capabilities.

## 3. Frontend Architecture
### 3.1 Component Structure
- **Atomic Components:** Buttons (`btn-vibrant`), StatCards, and Quiz widgets.
- **Page Modules:** Dashboard, Compiler, LogicDecoder, etc.
- **Layouts:** `ProtectedLayout` handles navigation consistency and authentication checks.

### 3.2 State Management
The `UserProvider` wraps the application, providing:
- **`stats`**: An object tracking XP, completed modules, and weak concepts.
- **`preferences`**: User identity and difficulty level.
- **Persistence:** Automatic sync to `localStorage` on state changes.

## 4. Gemini Integration Design
### 4.1 Client Initialization
The Gemini client is initialized lazily inside service methods to ensure environment variables are loaded and to prevent top-level module failures.
```typescript
const getAI = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");
    return new GoogleGenAI({ apiKey });
};
```

### 4.2 Error Handling Flow
1. **Request:** Component calls `geminiService.method()`.
2. **Process:** Service constructs a persona-driven prompt.
3. **Response:** Service extracts `.text` and parses JSON if a schema was requested.
4. **Fallback:** If a 429 (Rate Limit) or 500 error occurs, the service catches the error and returns a friendly "Sakhi-style" error string to the UI.

## 5. Environment Variable Strategy
- **Development:** Vite handles variables through local env files (not committed).
- **Production (Vercel):** The environment variable `VITE_GEMINI_API_KEY` is injected during the build process.
- **Safety:** Guards are in place to throw explicit errors if the key is missing at runtime.

## 6. Deployment Architecture
- **Host:** Vercel.
- **Routing:** `vercel.json` includes a catch-all rewrite to `index.html` to support client-side routing (React Router) without 404s on page refresh.
- **Build Pipe:** GitHub Trigger -> Vite Build (Minification/Tree-shaking) -> Deployment.

## 7. Folder Structure
- `/services`: Logic for API calls and data fetching.
- `/pages`: View components mapped to routes.
- `/context`: Global state providers.
- `/types.ts`: Centralized TypeScript interfaces.
- `/index.html`: Shell with global styles and mesh backgrounds.

## 8. Data Flow
1. **User Action:** User types code into Monaco Editor and clicks "Submit".
2. **Service Call:** `Compiler` component invokes `geminiService.analyzeSubmission`.
3. **AI Processing:** Prompt sent to Gemini with persona instructions.
4. **Logic Update:** Response received; Time/Space complexity and XP are updated in `UserContext`.
5. **UI Refresh:** Stats update on the dashboard; "Sakhi Analysis" tab displays results.

## 9. Security Considerations
- **API Key Protection:** The key is handled as a secret environment variable and prefixed with `VITE_` for client-side exposure.
- **Input Sanitization:** User code is treated as plain text for AI analysis.

## 10. Suggested Professional Improvement
**Backend Proxy Implementation:**
To achieve production-grade security, move Gemini API calls to a Vercel Serverless Function. 
- **Reason:** Prevents the API Key from being visible in the browser's Network tab.
- **Implementation:** Frontend calls `/api/analyze`, which securely uses a non-prefixed `GEMINI_API_KEY` on the server-side.