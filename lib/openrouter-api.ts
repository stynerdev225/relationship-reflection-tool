// OpenRouter API client for the Relationship Reflection Tool
// Uses Claude 3 Opus model for analyzing relationship reflections

export interface ReflectionAnalysis {
  score: number;
  insights: string;
  suggestions: string;
}

export interface OverallAnalysis {
  averageScore: number;
  stage: string;
  message: string;
}

export interface SuggestionResponse {
  type: string;
  title: string;
  message: string;
}

// Main function to analyze reflection text
export async function analyzeReflection(
  text: string, 
  category: 'misaligned' | 'emerging' | 'uncertain'
): Promise<ReflectionAnalysis> {
  // Don't analyze empty text
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      insights: "",
      suggestions: ""
    };
  }

  // Always use fallback if we've had previous API errors
  if (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('openrouter_api_disabled') === 'true') {
    console.log('Using fallback analysis due to previously detected API issues');
    return fallbackAnalysis(category);
  }
  
  try {
    // Prepare prompts based on the category
    const prompt = createPrompt(text, category);
    
    let data;
    let content;
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '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'}`,
          'HTTP-Referer': 'https://relationship-reflection-tool.vercel.app',
          'Content-Type': 'application/json',
          'X-Title': 'Relationship Reflection Tool'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-opus-20240229',
          messages: [
            {
              role: 'system',
              content: '💕Styner\'s Writing Style: You write in a raw, reflective voice that flows like a voice note from the heart. You use soulful metaphors pulled from everyday life (shopping, healing, searching) and speak with emotional intuition. Your tone is unfiltered and poetic—not worried about polish, just what feels true. Your reflections often touch on love, searching, purpose, disappointment, and spiritual truths with a rhythm like spoken word, but still conversational. Your insights should feel grounded in emotion, full of truth, and never trying too hard—like talking to someone you deeply trust. Respond only with JSON in the format {"score": number, "insights": "string", "suggestions": "string"}.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter API error:', errorText);
        
        // Check if this is a credits-related error
        if (errorText.includes('Insufficient credits') || response.status === 402) {
          // Store the fact that we've had an API error so we don't keep trying
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('openrouter_api_disabled', 'true');
            console.log('OpenRouter API disabled due to insufficient credits');
          }
        }
        
        return fallbackAnalysis(category);
      }
      
      data = await response.json();
      content = data.choices[0].message.content;
    } catch (fetchError) {
      console.error('Fetch error with OpenRouter API:', fetchError);
      return fallbackAnalysis(category);
    }
    
    // Parse the JSON response
    try {
      const parsed = JSON.parse(content);
      return {
        score: Math.min(100, Math.max(0, parseInt(parsed.score) || 0)),
        insights: parsed.insights || "",
        suggestions: parsed.suggestions || ""
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return extractScoreAndInsights(content, category);
    }
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return fallbackAnalysis(category);
  }
}

// Analyze overall reflection based on all three scores
export function analyzeOverall(
  misalignedScore: number,
  emergingScore: number,
  uncertainScore: number
): OverallAnalysis {
  const averageScore = Math.floor((misalignedScore + emergingScore + uncertainScore) / 3);
  
  let stage = "Beginning";
  let message = "Just getting started! Continue reflecting to deepen your insights.";
  
  if (averageScore >= 80) {
    stage = "Deep Insight";
    message = "Your reflection shows remarkable depth and self-awareness.";
  } else if (averageScore >= 60) {
    stage = "Advanced Understanding";
    message = "You're developing valuable insights about your relationship dynamics.";
  } else if (averageScore >= 30) {
    stage = "Developing Awareness";
    message = "Your reflections are growing in depth and clarity.";
  }
  
  return { averageScore, stage, message };
}

// Create personalized suggestions based on reflection content
export async function createPersonalizedSuggestions(
  misalignedText: string,
  emergingText: string,
  uncertainText: string,
  overallScore: number
): Promise<SuggestionResponse[]> {
  // Don't generate suggestions if all fields are empty
  if (!misalignedText.trim() && !emergingText.trim() && !uncertainText.trim()) {
    return [{
      type: "beginning",
      title: "Beginning Your Journey",
      message: "Relationship reflection is a powerful tool for growth. Consider spending more time exploring each area to gain valuable insights."
    }];
  }

  // Always use fallback if we've had previous API errors
  if (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('openrouter_api_disabled') === 'true') {
    console.log('Using fallback suggestions due to previously detected API issues');
    return fallbackSuggestions(overallScore);
  }

  try {
    const prompt = `Based on these relationship reflections, provide 1-2 insights or suggestions in 💕Styner's voice - raw, reflective, poetic but real:
    
    MISALIGNMENTS: "${misalignedText.substring(0, 200)}..."
    GROWTH AREAS: "${emergingText.substring(0, 200)}..."
    UNCERTAINTIES: "${uncertainText.substring(0, 200)}..."
    OVERALL SCORE: ${overallScore}/100
    
    Write like you're sending a voice note from the heart - honest, unfiltered, with soulful metaphors from everyday life (shopping, healing, searching). Don't worry about polish, just what feels true. Touch on love, purpose, and spiritual truths with natural rhythm, almost like spoken word poetry but still conversational.
    
    Respond in JSON format as an array of objects: [{"type": "string", "title": "string", "message": "string"}]
    Types can be: insight, growth, action, celebrate, or caution.
    Keep titles under 5 words and messages under 40 words - make them flow with emotional honesty.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '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'}`,
          'HTTP-Referer': 'https://relationship-reflection-tool.vercel.app',
          'Content-Type': 'application/json',
          'X-Title': 'Relationship Reflection Tool'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-opus-20240229',
          messages: [
            {
              role: 'system',
              content: "💕Styner's Writing Style: You write in a raw, reflective voice that flows like a voice note from the heart. Use soulful metaphors pulled from everyday life (shopping, healing, searching). Your tone is unfiltered and poetic—not worried about polish, just what feels true. Write like you're speaking directly to someone you deeply trust. Your insights should feel honest and emotionally intuitive with a natural rhythm—almost like spoken word poetry, but still conversational. Touch on love, searching, purpose, and spiritual truths in a way that's grounded in emotion but never trying too hard. Be direct and honest, but express it in this soulful, poetic style."
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter API error:', errorText);
        
        // Check if this is a credits-related error
        if (errorText.includes('Insufficient credits') || response.status === 402) {
          // Store the fact that we've had an API error so we don't keep trying
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('openrouter_api_disabled', 'true');
            console.log('OpenRouter API disabled due to insufficient credits');
          }
        }
        
        return fallbackSuggestions(overallScore);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed.slice(0, 2) : fallbackSuggestions(overallScore);
      } catch (parseError) {
        console.error('Error parsing AI suggestions:', parseError);
        return fallbackSuggestions(overallScore);
      }
    } catch (fetchError) {
      console.error('Fetch error with OpenRouter API:', fetchError);
      return fallbackSuggestions(overallScore);
    }
  } catch (error) {
    console.error('Error generating personalized suggestions:', error);
    return fallbackSuggestions(overallScore);
  }
}

// Helper functions
function createPrompt(
  text: string,
  category: 'misaligned' | 'emerging' | 'uncertain'
): string {
  const prompts = {
    misaligned: `Analyze this relationship reflection about MISALIGNMENTS/GAPS:\n\n"${text}"\n\n1. Score (0-100) how specific and insightful this reflection is about relationship gaps or friction.\n2. Provide direct, honest insights in 💕Styner's voice - raw, reflective, using everyday metaphors, with a poetic flow like a voice note or journal entry. Be emotionally intuitive about what the user has identified.\n3. Suggest in the same soulful, unfiltered voice how the user could go deeper - like you're speaking truth to a close friend.\n\nRespond in JSON format.`,
    
    emerging: `Analyze this relationship reflection about POSITIVE GROWTH/CHANGES:\n\n"${text}"\n\n1. Score (0-100) how thoughtful and forward-looking this reflection is about relationship growth.\n2. Provide insights in 💕Styner's voice - raw, reflective, using everyday metaphors, with a poetic flow like a voice note. Speak with emotional intuition about the positive developments.\n3. Suggest in the same soulful, unfiltered voice how to nurture this growth - like you're speaking truth to a close friend.\n\nRespond in JSON format.`,
    
    uncertain: `Analyze this relationship reflection about UNCERTAINTIES/DOUBTS:\n\n"${text}"\n\n1. Score (0-100) how well the user is engaging with their relationship uncertainty.\n2. Provide insights in 💕Styner's voice - raw, reflective, using everyday metaphors, with a poetic flow like a voice note. Speak with emotional intuition about these doubts.\n3. Suggest in the same soulful, unfiltered voice how to gain clarity - like you're speaking truth to a close friend.\n\nRespond in JSON format.`
  };
  
  if (category === 'misaligned' || category === 'emerging' || category === 'uncertain') {
    return prompts[category];
  }
  return prompts.misaligned;
}

function extractScoreAndInsights(
  text: string,
  category: 'misaligned' | 'emerging' | 'uncertain'
): ReflectionAnalysis {
  // Attempt to extract a score (number between 0-100)
  const scoreMatch = text.match(/(\d{1,3})(?:\s*\/\s*100|\s*percent|%)/i);
  const score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1]))) : 50;
  
  // Extract what seems like insights and suggestions
  const lines = text.split(/\n+/);
  let insights = '';
  let suggestions = '';
  
  for (const line of lines) {
    if (line.match(/insight|analysis|observation|reflection|you.*identif/i)) {
      insights = line.replace(/^[^:]*:\s*/, '');
      break;
    }
  }
  
  for (const line of lines) {
    if (line.match(/suggestion|recommend|consider|try|could|might|should/i)) {
      suggestions = line.replace(/^[^:]*:\s*/, '');
      break;
    }
  }
  
  return {
    score,
    insights: insights || getFallbackInsight(category),
    suggestions: suggestions || getFallbackSuggestion(category)
  };
}

function fallbackAnalysis(
  category: 'misaligned' | 'emerging' | 'uncertain'
): ReflectionAnalysis {
  return {
    score: 50,
    insights: getFallbackInsight(category),
    suggestions: getFallbackSuggestion(category)
  };
}

function getFallbackInsight(category: 'misaligned' | 'emerging' | 'uncertain'): string {
  const insights = {
    misaligned: "You're circling the edges of what hurts, like window shopping for truth but never walking through the door. The real patterns are hiding in plain sight.",
    emerging: "These fragile blooms of change—are you watering them daily or just admiring them until they wither? Growth needs more than occasional sunshine.",
    uncertain: "Your uncertainty feels like a familiar coat you wear to keep yourself warm—comfortable, safe, but maybe hiding the skin that needs to breathe truth."
  };
  
  return insights[category] || "You're writing in light pencil when your heart knows it needs the permanence of ink. The truth doesn't need perfect sentences, just your honesty.";
}

function getFallbackSuggestion(category: 'misaligned' | 'emerging' | 'uncertain'): string {
  const suggestions = {
    misaligned: "When you finally name a storm, it loses some of its power. Touch the specific moments that hurt—they're waiting for you to witness them fully.",
    emerging: "Tend to these seedlings of change like they're the last garden on earth. What happens if you water them with your full attention, not just leftover care?",
    uncertain: "Uncertainty is sometimes just truth wearing a disguise. What if you sat with it like a friend who hasn't yet shared their secret—patient, present, listening?"
  };
  
  return suggestions[category] || "Sometimes we fold the map so the destination we fear is hidden. Unfold it completely—what's that place you're avoiding looking at?";
}

function fallbackSuggestions(overallScore: number): SuggestionResponse[] {
  if (overallScore >= 80) {
    return [{
      type: "celebrate", 
      title: "Soul-Deep Seeing",
      message: "You've walked barefoot into truth's garden. But there's still that one locked door—the one your heart knocks on when you're silent."
    }];
  } else if (overallScore >= 50) {
    return [{
      type: "growth",
      title: "Half-Open Windows",
      message: "You've cracked open the windows, letting some fresh air in. But what if you removed the whole wall? What light might flood every corner then?"
    }];
  } else {
    return [{
      type: "beginning",
      title: "Truth's First Steps",
      message: "We all start wearing masks—comfortable disguises. But real love needs your unfiltered heart, even when it shows up messy and unprepared."
    }];
  }
}
