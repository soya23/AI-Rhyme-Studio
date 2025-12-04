import { NextRequest, NextResponse } from 'next/server';
import { extractOpenAiKey } from '../../../lib/api';

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

const demoQuiz = {
    correct: '戦友',
    incorrect: ['平和', '日常', 'お茶']
};

const errorResponse = (status: number, message: string) => NextResponse.json({ error: message }, { status });

export async function POST(req: NextRequest) {
    const apiKey = extractOpenAiKey(req.headers) ?? process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.warn('OpenAI API key is missing. Returning demo rhyme quiz.');
        return NextResponse.json(demoQuiz);
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return errorResponse(400, 'Invalid JSON payload.');
    }

    const { word } = (body as { word?: unknown }) ?? {};

    if (typeof word !== 'string' || word.trim().length === 0) {
        return errorResponse(400, 'Invalid payload.');
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                temperature: 0.8,
                messages: [
                    {
                        role: 'system',
                        content: 'あなたは韻踏みクイズの出題者です。回答は必ずJSON形式で返してください。'
                    },
                    {
                        role: 'user',
                        content: `ターゲットの単語：「${word}」。条件:
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

        return NextResponse.json(quiz);
    } catch (error) {
        console.error('Rhyme quiz generation error:', error);
        return NextResponse.json(demoQuiz);
    }
}
