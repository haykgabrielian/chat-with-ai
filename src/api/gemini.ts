const API_KEY = "AIzaSyBFyrzpsk5ywSQ88AfbtUsAY8QJCN6mal8";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

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