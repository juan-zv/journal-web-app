const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function callOpenAI(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: OPENAI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API call failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
