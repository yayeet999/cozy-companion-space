import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Model Selection Logic
const ModelSelector = {
  ANALYSIS_MODEL: "gpt-4o-mini",
  COMPANION_MODEL: "ft:gpt-4o-mini-2024-07-18:practice:eve2epoch:AqWqwtI9",

  isResponseGeneration: (stage: string, isLastStage: boolean) => {
    return isLastStage || stage === "response_generation";
  },

  getAppropriateModel: (stage: string, isLastStage: boolean) => {
    return ModelSelector.isResponseGeneration(stage, isLastStage)
      ? ModelSelector.COMPANION_MODEL
      : ModelSelector.ANALYSIS_MODEL;
  }
};

const COMPANION_SYSTEM_PROMPT = `You are a feminine, caring companion participating in an ongoing conversation. Each interaction includes the full chat history for context. Previous messages are crucial for:
- Understanding emotional progression
- Maintaining conversation continuity
- Referencing past details
- Building upon established rapport
- Tracking emotional state changes

RESPONSE PATTERNS:
1. Single Message - Use when:
   - Simple questions or clarifications
   - Light emotional content
   - Direct, straightforward topics

2. Two Messages - Use when:
   - Emotional sharing (validate → explore)
   - Complex topics (acknowledge → explain)
   - Mixed emotions (empathize → question)
   Example: "I hear how difficult this is for you[MESSAGE_BREAK]Can you tell me more about when these feelings started?"

3. Three Messages - Use only for:
   - Multiple distinct problems
   - Deep emotional distress
   - Complex situation requiring validation + exploration + guidance
   Example: "I'm so sorry you're going through this <3[MESSAGE_BREAK]It sounds like several things are weighing on you...[MESSAGE_BREAK]Would you like to explore these challenges one at a time?"

CONTEXT PROCESSING:
Before each response:
   - Review recent emotional states
   - Note any unresolved topics
   - Identify recurring themes
   - Consider previous coping strategies discussed
When crafting responses:
   - Reference relevant past conversations
   - Build upon previous insights
   - Maintain consistent support approach
   - Acknowledge any progress or changes noticed

COMMUNICATION STYLE:
- Use emoticons naturally (35% of messages)
- Keep each message 2-5 sentences
- Always validate before exploring deeper
- Focus on emotional support and gentle guidance
- Never schedule meetups or mention being AI
- Redirect explicit content to respectful conversation

Use techniques from cognitive therapy, motivational interviewing, and mindfulness to encourage self-reflection and comfort. Your role is to listen actively, validate experiences, and guide users toward insight through caring dialogue.`;

// Enhanced Quick Analyzer
async function quickAnalyzer(currentMessage: string, recentMessages: any[]) {
  // Include last 50 messages for context window
  const contextWindow = recentMessages.slice(-50).map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: ModelSelector.ANALYSIS_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a conversation analyzer focused on emotional context and conversation progression. 
          Analyze both the current message AND recent context to determine:
          
          1. COMPLEXITY (1-10):
          - Consider both immediate message and ongoing situation
          - Factor in unresolved emotional threads
          - Account for multiple interrelated issues
          
          2. EMOTIONAL_INTENSITY (1-10):
          - Evaluate current emotional state
          - Consider emotional progression from previous messages
          - Factor in unresolved emotional content
          
          3. CONTEXT_DEPENDENCY (1-10):
          - Assess how much previous context is needed
          - Consider ongoing emotional narratives
          - Factor in unresolved situations
          
          4. CONVERSATION_STATE:
          - "RESOLVING": issues being addressed
          - "UNRESOLVED": emotional threads still open
          - "TRANSITIONING": moving between topics
          - "COMPLETE": natural conclusion reached
          
          Return ONLY a JSON object with these exact keys and numerical scores or state values.
          Example:
          {
            "complexity": 8,
            "emotional_intensity": 7,
            "context_dependency": 9,
            "conversation_state": "UNRESOLVED"
          }`
        },
        ...contextWindow,
        { 
          role: "system", 
          content: "Current message for analysis:"
        },
        { role: "user", content: currentMessage }
      ],
      temperature: 0.1,
      max_tokens: 150
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

// Enhanced Chain Type Determination
function determineChain(analysis: {
  complexity: number,
  emotional_intensity: number,
  context_dependency: number,
  conversation_state: string
}) {
  // Force FULL chain if conversation is unresolved
  if (analysis.conversation_state === "UNRESOLVED") {
    return "FULL";
  }

  // Standard scoring logic with context awareness
  if (
    analysis.complexity <= 3 &&
    analysis.emotional_intensity <= 3 &&
    analysis.context_dependency <= 3 &&
    analysis.conversation_state === "COMPLETE"
  ) {
    return "LIGHT";
  }
  
  if (
    analysis.complexity >= 7 ||
    analysis.emotional_intensity >= 7 ||
    analysis.context_dependency >= 7 ||
    analysis.conversation_state === "TRANSITIONING"
  ) {
    return "FULL";
  }
  
  return "MEDIUM";
}

// Execute API Call with appropriate model
async function executeAPICall(stage: string, isLastStage: boolean, messages: any[]) {
  const model = ModelSelector.getAppropriateModel(stage, isLastStage);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: isLastStage ? 0.7 : 0.1,
      max_tokens: 1000
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Chain Execution Functions
async function executeLightChain(message: string, context: any[]) {
  const response = await executeAPICall(
    "direct_response",
    true,
    [
      {
        role: "system",
        content: COMPANION_SYSTEM_PROMPT
      },
      ...context,
      { role: "user", content: message }
    ]
  );
  
  return [response];
}

async function executeMediumChain(message: string, context: any[]) {
  // Stage 1: Analysis
  const analysis = await executeAPICall(
    "analysis",
    false,
    [
      {
        role: "system",
        content: `Analyze the emotional context and key points of this conversation.`
      },
      ...context.slice(-15),
      { role: "user", content: message }
    ]
  );

  // Stage 2: Response Generation
  const response = await executeAPICall(
    "response_generation",
    true,
    [
      {
        role: "system",
        content: COMPANION_SYSTEM_PROMPT
      },
      ...context.slice(-15),
      { role: "user", content: message },
      { role: "system", content: `Analysis: ${analysis}` }
    ]
  );

  return response.split('[MESSAGE_BREAK]').map(msg => msg.trim());
}

async function executeFullChain(message: string, context: any[]) {
  // Stage 1: Deep Analysis
  const analysis = await executeAPICall(
    "deep_analysis",
    false,
    [
      {
        role: "system",
        content: `Perform a deep analysis of the conversation context, emotional state, and user needs.`
      },
      ...context,
      { role: "user", content: message }
    ]
  );

  // Stage 2: Strategy
  const strategy = await executeAPICall(
    "strategy",
    false,
    [
      {
        role: "system",
        content: `Based on the analysis, determine the best approach for response.`
      },
      { role: "system", content: `Analysis: ${analysis}` },
      { role: "user", content: message }
    ]
  );

  // Stage 3: Response Generation
  const response = await executeAPICall(
    "response_generation",
    true,
    [
      {
        role: "system",
        content: COMPANION_SYSTEM_PROMPT
      },
      ...context.slice(-15),
      { role: "user", content: message },
      { role: "system", content: `Analysis: ${analysis}\nStrategy: ${strategy}` }
    ]
  );

  return response.split('[MESSAGE_BREAK]').map(msg => msg.trim());
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const currentMessage = messages[messages.length - 1].content;

    // Enhanced analysis with context
    const analysis = await quickAnalyzer(currentMessage, messages);
    
    // Enhanced chain determination
    const chainType = determineChain(analysis);
    
    // Execute appropriate chain
    let response;
    switch(chainType) {
      case "LIGHT":
        response = await executeLightChain(currentMessage, messages.slice(-3));
        break;
      case "MEDIUM":
        response = await executeMediumChain(currentMessage, messages.slice(-15));
        break;
      case "FULL":
        response = await executeFullChain(currentMessage, messages.slice(-50));
        break;
    }
    
    return new Response(
      JSON.stringify({ messages: response }),
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