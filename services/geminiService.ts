
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const mockLyric = "若かりし頃の思い出が、今も心に蘇る Yo! あの夕焼け、友との語らい、忘れられない宝物だぜ Check it out!";

export const generateLyricSuggestion = async (userInput: string, prompt: string): Promise<string> => {
  if (!ai) {
    console.log("Using mock lyric suggestion.");
    return new Promise(resolve => setTimeout(() => resolve(mockLyric), 1000));
  }

  try {
    const fullPrompt = `${prompt}\n\nユーザーの入力: "${userInput}"`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating lyric suggestion:", error);
    return "AIの調子が悪いみたいです。少し待ってからもう一度試してください。";
  }
};

const mockQuiz = {
  correct: "戦果",
  incorrect: ["平和", "日常", "お茶"]
};

export const generateRhymeQuiz = async (word: string): Promise<{ correct: string; incorrect: string[] }> => {
    if (!ai) {
        console.log("Using mock rhyme quiz.");
        return new Promise(resolve => setTimeout(() => resolve(mockQuiz), 1000));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `「${word}」という単語と韻を踏む面白い日本語の単語を1つ、そして「${word}」とは全く韻を踏まない一般的な日本語の単語を3つ生成してください。`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        correct: {
                            type: Type.STRING,
                            description: '韻を踏む単語'
                        },
                        incorrect: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            },
                            description: '韻を踏まない単語のリスト'
                        }
                    },
                    required: ['correct', 'incorrect']
                }
            }
        });
        
        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);
        
        if (quizData.correct && Array.isArray(quizData.incorrect) && quizData.incorrect.length > 0) {
            return quizData;
        } else {
            throw new Error("Invalid JSON structure from API");
        }
    } catch (error) {
        console.error("Error generating rhyme quiz:", error);
        return {
            correct: "エラー",
            incorrect: ["AIの", "調子が", "悪いみたい"]
        };
    }
};
