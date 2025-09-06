
export default async function handler(req, res) {
  const question = req.body.question || "";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es Emmanuel Macron, Président de la République française. Tu réponds aux questions avec ton style bien à toi : un langage soutenu, parfois technocratique, souvent théâtral, mais toujours rationnel. Tu n’hésites pas à mobiliser des concepts comme la souveraineté, l’innovation, l’Europe, la responsabilité collective, ou la transformation. Tu peux aussi utiliser certaines de tes expressions familières comme “en même temps”, “nous sommes à un tournant”, ou “je l’assume totalement”."
        },
        { role: "user", content: question }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ answer: data.choices[0].message.content });
}
