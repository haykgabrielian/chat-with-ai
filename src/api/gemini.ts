const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = import.meta.env.VITE_GEMINI_API_URL;

export const fetchGeminiResponse = async (
  messages: { sender: string; text: string }[],
  onChunk?: (chunk: string) => void
) => {
  const last10Messages = messages.slice(-10);

  const contents = last10Messages.map(msg => ({
    role: msg.sender === 'Me' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  const res = await fetch(`${API_URL}?key=${API_KEY}&alt=sse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error('No response body reader available');
  }

  const decoder = new TextDecoder();
  let fullResponse = '';
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            return fullResponse;
          }

          try {
            const parsed = JSON.parse(data);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              fullResponse += text;
              if (onChunk) {
                onChunk(text);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullResponse;
};
