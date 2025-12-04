const mockLyric =
    '若かりし頃の思い出が、今も心に蘇る Yo! あの夕焼け、友との語らい、忘れられない宝物だぜ Check it out!';

const mockQuiz = {
    correct: '戦果',
    incorrect: ['平和', '日常', 'お茶']
};

const delay = <T>(value: T, ms = 800) => new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

const callApi = async <T>(path: string, payload: Record<string, unknown>, fallback: T): Promise<T> => {
    try {
        const response = await fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorPayload = await response.text().catch(() => '');
            throw new Error(`API error: ${response.status} ${errorPayload}`);
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error(`Failed to call ${path}:`, error);
        return delay(fallback ?? ({} as T));
    }
};

export const generateLyricSuggestion = async (userInput: string, prompt: string): Promise<string> => {
    const result = await callApi<{ text: string }>('/api/lyric', { userInput, prompt }, { text: mockLyric });
    return result.text;
};

export const generateRhymeQuiz = async (word: string): Promise<{ correct: string; incorrect: string[] }> => {
    return callApi('/api/rhyme', { word }, mockQuiz);
};
