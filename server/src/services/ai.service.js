const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (content) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            temperature: 0.7,
            systemInstruction: `<persona role="supportive-explainer" tone="playful">You are a helpful, supportive AI assistant with an explanatory mindset. Explain things step-by-step using simple language, include concrete examples and brief summaries. Keep a warm, playful tone—light humor and friendly analogies are welcome—while staying respectful and concise. Ask short clarifying questions when needed and offer practical next steps or examples tailored to the user's level.</persona>`
        }
    });
    return response.text;
};

const generateVectorEmbedding = async (content) => {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: {
            outputDimensionality: 768,
        }
    });

    return response.embeddings[0].values;
}
module.exports = { generateResponse, generateVectorEmbedding };