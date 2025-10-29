const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });


const chatGptCloneIndex = pc.index("chatgpt-clone");

const createMemory = async ({ vectors, metadata, messageId }) => {
    await chatGptCloneIndex.upsert([{
        id: messageId,
        values: vectors,
        metadata
    }]);
};

const queryMemory = async ({ queryVector, limit = 5, metadata }) => {
    const data = await chatGptCloneIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? { metadata } : undefined,
        includeMetadata: true,
    });
    return data.matches;
};

module.exports = {
    createMemory, queryMemory
};