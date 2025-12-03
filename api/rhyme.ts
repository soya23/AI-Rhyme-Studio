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

    const { word } = req.body ?? {};

    if (typeof word !== 'string' || word.trim().length === 0) {
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
                temperature: 0.8,
                messages: [
                    {
                        role: 'system',
                        content: 'あなたは韻踏みクイズの出題者です。回答は必ずJSONのみで返してください。'
                    },
                    {
                        role: 'user',
                        content: `ターゲットの単語:「${word}」。
条件:
- この単語と韻を踏む面白い日本語の単語を1つ提示する
- 韻を踏まない一般的な日本語の単語を3つ提示する
- 以下のJSON形式のみで出力する: {"correct":"...", "incorrect":["...","...","..."]}
- 解説や余計な文章は書かない`
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content?.trim() ?? '';
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        const quizText = jsonStart >= 0 && jsonEnd >= jsonStart ? content.slice(jsonStart, jsonEnd + 1) : content;
        const quiz = JSON.parse(quizText);

        if (!quiz.correct || !Array.isArray(quiz.incorrect)) {
            throw new Error('Invalid JSON structure');
        }

        res.status(200).json(quiz);
    } catch (error) {
        console.error('Rhyme quiz generation error:', error);
        res.status(200).json({
            correct: 'エラー',
            incorrect: ['AIの', '調子が', '悪いみたい']
        });
    }
}
