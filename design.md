# CodeSakhi AI – Technical Design Document

## 1. Architecture
CodeSakhi AI follows a **Modular Service-Oriented SPA Architecture**.
*   **Presentation Layer:** React 19 components styled with Tailwind CSS, utilizing a "Sticker-Card" aesthetic for high engagement.
*   **Intelligence Layer:** Direct integration with the **Google Gemini API** via the `@google/genai` SDK.
*   **Logic Layer:** Decoupled services (`geminiService`, `problemService`) that handle data orchestration and prompt engineering.
*   **State Layer:** React Context API (`UserContext`) providing a single source of truth for stats, preferences, and persistence via `localStorage`.
*   **Knowledge Layer (KIRO):** The `.kiro/` directory acting as a Knowledge & Identity Repository Object for consistent persona grounding.

## 2. System Flow
1.  **Entry:** User interacts with the Dashboard or a specific Course Module.
2.  **Request:** A UI action (e.g., clicking "Submit" in the Compiler) triggers a service method.
3.  **Processing:** The service constructs a persona-driven prompt. It references the `.kiro/blueprint.json` core analogies and `.kiro/config.json` rules to ensure a consistent mentoring style.
4.  **Response:** Gemini returns structured data (JSON) which the service parses.
5.  **State Update:** The `UserContext` updates global XP and stats.
6.  **Display:** The UI re-renders to show the "Sakhi Analysis" results.

## 3. Gemini Integration
*   **SDK Usage:** Employs the `@google/genai` library with the `gemini-3-pro-preview` model for complex reasoning.
*   **Initialization:** The client is initialized globally using the environment-injected key:
    ```typescript
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    ```
*   **Prompt Engineering:** System instructions are grounded in the KIRO blueprint, defining "CodeSakhi" as a supportive Indian senior engineer.

## 4. Environment Variable Strategy
*   **Development:** Variables managed through local `.env` files.
*   **Production:** The `API_KEY` is injected as a secure secret in Vercel.
*   **Access Pattern:** Accessed via `process.env.API_KEY`.

## 5. Deployment Strategy
*   **Platform:** Vercel.
*   **Build Pipeline:** GitHub push triggers automated build using Vite.
*   **Routing:** `vercel.json` rewrites support React Router navigation.

## 6. KIRO (Knowledge & Identity Repository Object)
The `.kiro/` directory is a localized repository used to ground the AI's personality:
*   `blueprint.json`: Defines the persona, linguistic markers, and the master dictionary of technical-to-cultural analogies.
*   `config.json`: Contains systemic rules for response shaping, mastery thresholds, and model mappings.

## 7. Data Flow
1.  **User Input** -> 2. **Validation** -> 3. **API Call** -> 4. **Parsing** -> 5. **Context Sync** -> 6. **UI Feedback**.