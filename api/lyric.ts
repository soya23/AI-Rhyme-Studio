import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

const errorResponse = (res: VercelResponse, status: number, message: string) => {
    res.status(status).json({ error: message });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return errorResponse(res, 405, 'Method Not Allowed');
    }

    if (!OPENAI_API_KEY) {
        return errorResponse(res, 500, 'OpenAI API key is not configured.');
    }

    const { userInput, prompt } = req.body ?? {};

    if (typeof userInput !== 'string' || typeof prompt !== 'string') {
        return errorResponse(res, 400, 'Invalid payload.');
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                temperature: 0.9,
                messages: [
                    {
                        role: 'system',
                        content:
                            'あなたは日本語のラップ作詞家です。ユーザーの思い出をもとに、温かみのある4行程度の日本語ラップを生成してください。英語やローマ字は控えめに。'
                    },
                    {
                        role: 'user',
                        content: `思い出メモ:\n${userInput}\n\n作詞ガイドライン:\n${prompt}\n\n出力はラップ本文のみ。`
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content?.trim() ?? '';
        res.status(200).json({ text });
    } catch (error) {
        console.error('Lyric generation error:', error);
        errorResponse(res, 500, 'AIの調子が悪いみたいです。少し時間を置いてからもう一度試してください。');
    }
}
