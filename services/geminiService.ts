
import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty } from "../types";

// Always use named parameter for API Key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPersona = (userName: string) => {
  const name = userName.split(' ')[0];
  return `You are CodeSakhi, a brilliant senior engineer and a supportive big-sister/friend to the student. 
Tone: Friendly, encouraging, informal, and relatable. 
Style: Use fun Indian analogies (like chai stalls, traffic jams, tiffin boxes).
Goal: Provide high-quality technical feedback while keeping the student motivated. 
Constraint: Be a supportive peer, not a parental figure. Address the user as ${name}. 
IMPORTANT: Never use the word 'beta' or 'child'. Use 'friend', 'buddy', 'yaar', or 'partner' instead.`;
};

export const geminiService = {
  // Analyzes code submissions for interviews with structured feedback
  async analyzeSubmission(code: string, language: string, problemTitle: string, company: string, userName: string) {
    const prompt = `${getPersona(userName)}
      Analyze this ${language} code for the problem "${problemTitle}". 
      Context: This is being evaluated for an interview at ${company || 'a top tech firm'}.
      
      Tasks:
      1. Determine Time and Space Complexity.
      2. Rate Correctness, Efficiency, and Readability (0-100).
      3. Provide ${company}-specific feedback (e.g., if Google, mention naming or edge cases).
      4. Suggest a more efficient approach if one exists.
      5. Provide a short "Sakhi Note" of encouragement.
      
      Code:
      ${code}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            complexity: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                space: { type: Type.STRING },
                isOptimal: { type: Type.BOOLEAN },
                suggestion: { type: Type.STRING }
              },
              required: ["time", "space", "isOptimal", "suggestion"]
            },
            quality: {
              type: Type.OBJECT,
              properties: {
                correctness: { type: Type.NUMBER },
                efficiency: { type: Type.NUMBER },
                readability: { type: Type.NUMBER },
                companyReadiness: { type: Type.NUMBER },
                feedback: { type: Type.STRING }
              },
              required: ["correctness", "efficiency", "readability", "companyReadiness", "feedback"]
            },
            idealSolution: { type: Type.STRING, description: "Small industry-grade snippet of the best approach" }
          },
          required: ["complexity", "quality", "idealSolution"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  },

  // Line-by-line explanation of code using Gemini API
  async explainCode(code: string, difficulty: Difficulty, userName: string) {
    const prompt = `${getPersona(userName)} Explain this code line-by-line for a ${difficulty} level student. Breakdown complex logic into simple stories.
    
    Code:
    ${code}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              line: { type: Type.NUMBER },
              conceptType: { type: Type.STRING },
              code: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["line", "conceptType", "code", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  },

  // Direct conceptual tutoring through the Gemini Chat interface
  async tutorConcept(query: string, difficulty: Difficulty, userName: string) {
    const prompt = `${getPersona(userName)} Explain the concept of "${query}" for a ${difficulty} level student using relatable Indian analogies.`;
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt
    });
    return response.text;
  },

  // Advanced debugging with identified fixes and learning tips
  async debugCode(code: string, errorMsg: string, userName: string) {
    const prompt = `${getPersona(userName)} Identify the logical bugs in this code and provide a fix. Terminal noise: ${errorMsg || 'None'}.
    
    Code:
    ${code}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            errorSummary: { type: Type.STRING },
            suggestedFix: { type: Type.STRING },
            improvedCode: { type: Type.STRING },
            learningTip: { type: Type.STRING }
          },
          required: ["errorSummary", "suggestedFix", "improvedCode", "learningTip"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  },

  // Note synthesis for student productivity using Flash model
  async summarizeNotes(notes: string, userName: string) {
    const prompt = `${getPersona(userName)} Transmute these lecture notes into structured study nuggets, flashcards, and a core summary.
    
    Notes:
    ${notes}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING },
            flashCards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING }
                },
                required: ["question", "answer"]
              }
            }
          },
          required: ["bulletPoints", "summary", "flashCards"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  },

  // Adaptive quiz generation focusing on weak logical nodes
  async generateQuiz(topic: string, difficulty: Difficulty, userName: string, weakTopics?: string[]) {
    const prompt = `${getPersona(userName)} Generate a 5-question adaptive multiple choice quiz on "${topic}". 
    Complexity Level: ${difficulty}.
    ${weakTopics && weakTopics.length > 0 ? `Targeted logic nodes to verify: ${weakTopics.join(', ')}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.NUMBER, description: "0-based index of the correct answer" },
              explanation: { type: Type.STRING },
              conceptTag: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation", "conceptTag"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  },

  // Generates in-depth problem editorials
  async getEditorial(problemTitle: string, userName: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `${getPersona(userName)} Write a clear, pedagogical editorial for "${problemTitle}". Include a high-level strategy and a logic implementation in Python.`
    });
    return response.text;
  }
};
