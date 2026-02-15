# CodeSakhi AI – Technical Design Document

## 1. Architecture
CodeSakhi AI follows a **Modular Service-Oriented SPA Architecture**.
*   **Presentation Layer:** React 19 components styled with Tailwind CSS, utilizing a "Sticker-Card" aesthetic for high engagement.
*   **Intelligence Layer:** Direct integration with the **Google Gemini API** via the `@google/genai` SDK.
*   **Logic Layer:** Decoupled services (`geminiService`, `problemService`) that handle data orchestration and prompt engineering.
*   **State Layer:** React Context API (`UserContext`) providing a single source of truth for stats, preferences, and persistence via `localStorage`.

## 2. System Flow
1.  **Entry:** User interacts with the Dashboard or a specific Course Module.
2.  **Request:** A UI action (e.g., clicking "Submit" in the Compiler) triggers a service method.
3.  **Processing:** The service constructs a "Persona-Driven" prompt (CodeSakhi as the Senior Engineer) and sends it to Gemini.
4.  **Response:** Gemini returns structured data (JSON) which the service parses and validates.
5.  **State Update:** The `UserContext` updates global XP and stats based on the response quality.
6.  **Display:** The UI re-renders to show the "Sakhi Analysis" or "Logic Decoder" results.

## 3. Gemini Integration
*   **SDK Usage:** Employs the `@google/genai` library with the `gemini-3-pro-preview` model for complex reasoning and `gemini-3-flash-preview` for summarization.
*   **Initialization:** The client is initialized globally using the environment-injected key:
    ```typescript
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    ```
*   **Prompt Engineering:** Prompts are wrapped in a system instruction that defines the "CodeSakhi" persona—a supportive, Indian senior engineer using analogies like "Tiffin Boxes."
*   **Structured Output:** Utilizes `responseMimeType: "application/json"` and `responseSchema` to ensure the AI returns data compatible with our TypeScript interfaces.

## 4. Environment Variable Strategy
*   **Development:** Variables are managed through local `.env` files (ignored by Git).
*   **Production:** The `API_KEY` is injected as a secure secret in the Vercel Project Settings.
*   **Access Pattern:** The application accesses the key exclusively via `process.env.API_KEY`, ensuring a consistent interface between the build environment and the runtime.

## 5. Deployment Strategy
*   **Platform:** Vercel.
*   **Build Pipeline:** GitHub push triggers an automated build using the Vite compiler, performing tree-shaking and minification.
*   **Routing:** A `vercel.json` rewrite rule is implemented to redirect all traffic to `index.html`, allowing React Router to handle SPA navigation without server-side 404s.
*   **Edge Optimization:** Assets are served via Vercel’s global Edge Network for low-latency delivery across India.

## 6. Data Flow
1.  **User Input:** User pastes code or notes into a functional module.
2.  **Validation:** Frontend checks for empty inputs or illegal characters.
3.  **API Call:** `geminiService` sends the data to Google’s servers.
4.  **Parsing:** The raw string response is extracted using `response.text` and parsed into a JSON object.
5.  **Context Sync:** Stats (XP, Errors Fixed) are updated in the user’s local profile.
6.  **UI Feedback:** Components use the updated data to render explanations, complexities, or flashcards.