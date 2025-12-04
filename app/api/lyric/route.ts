import { NextRequest, NextResponse } from 'next/server';
import { extractOpenAiKey } from '../../../lib/api';

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

const demoLyric =
    '若かりし頃の思い出が今も胸に蘇るYo! あの夕焼け、友との語らい、忘れられない宝物だぜ Check it out!';

const errorResponse = (status: number, message: string) => NextResponse.json({ error: message }, { status });

export async function POST(req: NextRequest) {
    const apiKey = extractOpenAiKey(req.headers) ?? process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.warn('OpenAI API key is missing. Returning demo lyric.');
        return NextResponse.json({ text: demoLyric });
    }

    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return errorResponse(400, 'Invalid JSON payload.');
    }

    const { userInput, prompt } = (body as { userInput?: unknown; prompt?: unknown }) ?? {};

    if (typeof userInput !== 'string' || typeof prompt !== 'string') {
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
                temperature: 0.9,
                messages: [
                    {
                        role: 'system',
                        content:
                            'あなたは日本語のラップ作詞家です。ユーザーの思い出をもとに、温かみのある4行程度のラップを生成してください。英語やローマ字は控えめに。'
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
        return NextResponse.json({ text });
    } catch (error) {
        console.error('Lyric generation error:', error);
        return NextResponse.json({ text: demoLyric });
    }
}
