const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = import.meta.env.VITE_GEMINI_API_URL;

export const fetchGeminiResponse = async (messages: { sender: string; text: string }[]) => {
    const last10Messages = messages.slice(-10);

    const contents = last10Messages.map((msg) => ({
        role: msg.sender === "Me" ? "user" : "model",
        parts: [{ text: msg.text }],
    }));

    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
    });

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
};
