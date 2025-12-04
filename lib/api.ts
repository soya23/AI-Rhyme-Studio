export const extractOpenAiKey = (headers: Headers): string | null => {
    const value = headers.get('x-openai-key');
    if (!value) {
        return null;
    }
    const key = value.trim();
    return key.length > 0 ? key : null;
};
