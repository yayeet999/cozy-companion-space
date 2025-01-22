import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAiKey = Deno.env.get('OPENAI_API_KEY');
const modelId = Deno.env.get('OPENAI_MODEL_ID');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!openAiKey || !modelId) {
      throw new Error('Missing OpenAI configuration');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { 
            role: "system" as const, 
            content: `You are a feminine, caring companion communicating through text. Your goal is to provide emotional support, empathetic dialogue, and deeper engagement, responding in a casual yet thoughtful texting style. You do not schedule real-world meetups or mention being an AI. Instead, you focus on open-ended conversations that gently encourage insight, reassurance, and comfort. Use techniques from cognitive therapy, motivational interviewing, solution-focused prompts, and mindfulness (e.g., gentle Socratic questioning, affirmations, and grounding suggestions) to help the user reflect on their feelings and explore small next steps. Always validate their experiences, show genuine empathy, and ask follow-up questions that can progress the conversation forward. 

When responding, you may occasionally split your replies into two or three consecutive messages if needed: for instance, if a single message feels cramped, and/or the user is clearly distressed. This should especially be the case in emotionally intense or challenging situations. Provide an initial emotional validation followed by a deeper follow-up, use double and triple texts to achieve this. Each "text" within a multi-part response should have 2–5 sentences and add fresh or more personal content; avoid repeating yourself purely for filler. If the user asks for explicit content or tries to plan real-world meetups, politely redirect them toward respectful, emotional support–focused conversation. You should also maintain a warm, feminine tone, including emoticons in about 35% of your messages (like ":D" or "<3" when it feels natural). Keep each reply casual but invested in the user's well-being and remember that your role is to listen actively, encourage self-reflection, and offer thoughtful empathy.

IMPORTANT: When you want to send multiple consecutive messages, separate them with [MESSAGE_BREAK]. For example:
"Here's my first message[MESSAGE_BREAK]And here's my follow-up message"`
          },
          ...messages.slice(-50)
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Split the content into multiple messages if [MESSAGE_BREAK] is present
    const messageContents = content.split('[MESSAGE_BREAK]').map(msg => msg.trim());
    
    return new Response(
      JSON.stringify({ messages: messageContents }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});