// Utility functions for reflection insights and transformations
// Uses Styner's voice - raw, reflective, poetic, with soulful metaphors and emotionally intuitive tone

// Transform ordinary text into more poetic, Styner-voice formatted text
export function transformToStynerVoice(text: string, intensity: 'gentle' | 'moderate' | 'intense' = 'moderate'): string {
  if (!text || text.trim().length === 0) return text;
  
  // Don't transform if already in Styner-style (contains poetic elements or metaphors)
  if (hasStynerElements(text)) return text;
  
  const stynerPhrases = {
    gentle: [
      "like whispers between closed doors",
      "a soft echo of what your heart already knows",
      "the way morning light finds cracks in drawn curtains",
      "gentle as fingerprints on foggy glass"
    ],
    moderate: [
      "shopping for truth in aisles you've been avoiding",
      "like trying to hold water with fingers spread wide",
      "the way old photographs hide in forgotten boxes",
      "searching through rooms where the lights won't turn on"
    ],
    intense: [
      "bleeding truth onto pages you're afraid to read later",
      "standing naked in front of mirrors that don't forgive",
      "mining for diamonds in the dark corners you've been running from",
      "peeling back skin to find the bones of what's really happening"
    ]
  };
  
  // Select deterministic phrase based on the content of the text
  const selectedPhrases = stynerPhrases[intensity];
  // Use the length of the text as a simple deterministic seed
  const index = text.length % selectedPhrases.length;
  const phrase = selectedPhrases[index];
  
  // Transform based on text length and type
  if (text.length < 40) {
    return `${text} — ${phrase}.`;
  } else if (text.includes('?')) {
    return `${text} It's ${phrase}, isn't it?`;
  } else {
    // Insert phrase in the middle for longer text
    const midPoint = Math.floor(text.length / 2);
    let insertPoint = text.indexOf('. ', midPoint);
    insertPoint = insertPoint > 0 ? insertPoint + 1 : text.length;
    
    return `${text.substring(0, insertPoint)} And maybe that's ${phrase}. ${text.substring(insertPoint)}`;
  }
}

// Check if text already contains poetic elements characteristic of Styner's voice
function hasStynerElements(text: string): boolean {
  const stynerPatterns = [
    /like [a-z]+ that/i,
    /shopping for/i,
    /whisper(s|ing)/i,
    /soul('s| is| was)/i,
    /heart('s| is| knows)/i,
    /mirror(s| of| that)/i,
    /truth('s| is| that)/i,
    /search(ing|ed) (for|through)/i
  ];
  
  return stynerPatterns.some(pattern => pattern.test(text));
}

// Generate reflective question prompts to inspire deeper reflection
export function generateReflectionPrompt(area: 'misaligned' | 'emerging' | 'uncertain', seed: number = 0): string {
  const prompts = {
    misaligned: [
      "What patterns keep repeating like stubborn stains you can't wash out?",
      "If your relationship friction had a name, what would it whisper at 3am?",
      "Where do your expectations collide like strangers in a narrow hallway?",
      "What truth sits in your throat, collecting dust because speaking it feels too raw?"
    ],
    emerging: [
      "What fragile growth is happening in shadows you haven't fully named?",
      "Which seeds were planted in your hardest conversations that surprise you now?",
      "What quiet victories deserved champagne but only got quiet nods?",
      "When did you last notice something healing without you forcing it to?"
    ],
    uncertain: [
      "What questions keep circling back like birds looking for somewhere to land?",
      "Which doubts wear disguises during the day but reveal themselves at night?",
      "What do you pretend not to know because knowing would require action?",
      "Where are you substituting maybes for the certainty your soul already holds?"
    ]
  };
  
  const selectedPrompts = prompts[area];
  // Use a deterministic approach based on seed to select a prompt
  const index = Math.abs(seed % selectedPrompts.length);
  return selectedPrompts[index];
}

// Create share-ready summary with a unique Styner-style voice 
export function createShareSummary(
misalignedScore: number, emergingScore: number, uncertainScore: number, overallScore: number): string {
  let summary = "A soul-mirror reflection on us — ";
  
  const highestArea = Math.max(misalignedScore, emergingScore, uncertainScore);
  
  if (overallScore >= 80) {
    summary += "raw truth telling with depth & clarity. ";
  } else if (overallScore >= 60) {
    summary += "honest wandering through what matters. ";
  } else if (overallScore >= 30) {
    summary += "beginning to peel back comfortable masks. ";
  } else {
    summary += "first steps on a path of braver truth. ";
  }
  
  if (highestArea === misalignedScore && misalignedScore > 50) {
    summary += "I see our gaps most clearly — where we've been speaking different languages without translators.";
  } else if (highestArea === emergingScore && emergingScore > 50) {
    summary += "I feel our growth the strongest — tiny seeds pushing through concrete when no one's watching.";
  } else if (highestArea === uncertainScore && uncertainScore > 50) {
    summary += "I'm facing our question marks — those uncertainties that dress themselves as 'maybe' when they're really truths in waiting.";
  } else {
    summary += "Still searching for the words that feel true enough to build a future on.";
  }
  
  return summary;
}

// Generate journal prompts based on reflection scores and content
export function generateJournalPrompts(
  misalignedScore: number,
  emergingScore: number,
  uncertainScore: number
): string[] {
  const prompts: string[] = [];
  
  // Add area-specific prompts based on scores
  if (misalignedScore < 40) {
    prompts.push("Write about the conversation you've been avoiding — the one that makes your stomach tighten when you imagine having it.");
  } else if (misalignedScore >= 70) {
    prompts.push("What patterns in your relationship have you named but not yet addressed? What would addressing them actually look like?");
  }
  
  if (emergingScore < 40) {
    prompts.push("What small positive changes have you overlooked because they don't fix everything at once?");
  } else if (emergingScore >= 70) {
    prompts.push("How can you protect and nurture the growth you've recognized, especially when old patterns try to pull you backward?");
  }
  
  if (uncertainScore < 40) {
    prompts.push("What certainties are you dressing up as questions because the answers feel too demanding?");
  } else if (uncertainScore >= 70) {
    prompts.push("How has sitting with uncertainty changed your relationship? What wisdom lives in the spaces between knowing?");
  }
  
  // Add general prompts
  prompts.push("If your relationship could speak directly to you, what would it ask for right now?");
  prompts.push("What conversation would change everything if you could have it with complete honesty and zero fear?");
  
  return prompts;
}

// Generate a personalized quote in Styner's voice based on the overall reflection score
export function generateStynerQuote(overallScore: number): string {
  // Array of quotes for different score ranges
  if (overallScore < 30) {
    const beginnerQuotes = [
      "Your relationship is like a garden where you've just turned the soil — full of potential, but requiring patience and daily tending to see what might grow.",
      "Sometimes the bravest thing is just showing up with a pen, staring at blank pages that don't judge how slowly you fill them.",
      "The first step in mapping any journey is admitting you're not sure where you stand. That honesty alone is worth honoring.",
      "Truth doesn't demand perfection, just willingness to stand in rooms where lights aren't fully on yet."
    ];
    // Use a deterministic approach based on score to select a quote
    const index = Math.abs(Math.floor(overallScore)) % beginnerQuotes.length;
    return beginnerQuotes[index];
  } else if (overallScore < 60) {
    const developingQuotes = [
      "You're learning to speak a language that has no dictionary — where the grammar is written in gestures, in silences, in the spaces between what's said and what's felt.",
      "The middle of anything is messy. But it's where the magic happens, where you stop performing and start unwrapping what's real.",
      "There's courage in naming what hurts without knowing how to fix it. Sometimes naming is the medicine itself.",
      "You're peeling layers from an onion that makes everyone cry. But beneath the tears is flavor that makes everything worth tasting."
    ];
    const index = Math.abs(Math.floor(overallScore)) % developingQuotes.length;
    return developingQuotes[index];
  } else if (overallScore < 80) {
    const advancedQuotes = [
      "The maps you're drawing have fewer blank spaces now. You're learning to mark both the dangerous waters and the hidden treasures with equal precision.",
      "Your truths are no longer hiding behind politeness. They're standing in the room with you, wearing your clothes, speaking in your voice.",
      "Growth means holding contradictions — seeing both the beauty and the breaking, the victory and the grief, and making room for all of it.",
      "There's a rhythm to how you dance with darkness now — not with fear, but with familiarity, like greeting an old friend who always has something important to say."
    ];
    const index = Math.abs(Math.floor(overallScore)) % advancedQuotes.length;
    return advancedQuotes[index];
  } else {
    const insightfulQuotes = [
      "Some relationships become masterpieces when we learn to paint with all the colors — not just the bright ones, but the deep blues of sorrow and rich browns of hard-earned wisdom.",
      "You've learned to carry truth like water in cupped hands — carefully, reverently, knowing both its power to sustain and its tendency to slip through cracks.",
      "The softest revolution happens when two people stop performing and start witnessing each other's unfiltered humanity. You're living in that quiet revolution.",
      "True intimacy isn't about perfect understanding, but perfect witnessing — standing beside each other as you both become more fully yourselves."
    ];
    const index = Math.abs(Math.floor(overallScore)) % insightfulQuotes.length;
    return insightfulQuotes[index];
  }
}

// Generate comprehensive personalized feedback in Styner's voice
export function generatePersonalizedStynerFeedback(
  overallScore: number,
  misalignedText?: string,
  emergingText?: string,
  uncertainText?: string,
  suggestions?: Array<{message: string}>
): string {
  // Start with the personalized quote
  let feedback = generateStynerQuote(overallScore);
  
  // Add a separator
  feedback += "\n\n---\n\n";
  
  // Generate personalized insights based on what the user has written
  const hasContent = (misalignedText && misalignedText.trim().length > 10) || 
                    (emergingText && emergingText.trim().length > 10) || 
                    (uncertainText && uncertainText.trim().length > 10);
  
  if (!hasContent) {
    feedback = "Share your reflections in the boxes above to receive personalized therapeutic insights.\n\nAs you write about what feels misaligned, what's emerging, or what uncertainties you're carrying, this space will transform into a mirror of Styner's wisdom - offering you the raw, poetic truths your relationship is asking you to see.";
    return feedback;
  }
  
  // Create personalized insights based on the content areas
  const insights: string[] = [];
  
  if (misalignedText && misalignedText.trim().length > 10) {
    insights.push(generateMisalignedInsight(misalignedText, overallScore));
  }
  
  if (emergingText && emergingText.trim().length > 10) {
    insights.push(generateEmergingInsight(emergingText, overallScore));
  }
  
  if (uncertainText && uncertainText.trim().length > 10) {
    insights.push(generateUncertainInsight(uncertainText, overallScore));
  }
  
  // If we have AI suggestions, incorporate them in Styner's voice
  if (suggestions && suggestions.length > 0) {
    const stynerSuggestions = suggestions.map(suggestion => 
      transformToStynerVoice(suggestion.message, overallScore > 60 ? 'intense' : 'moderate')
    );
    insights.push(...stynerSuggestions);
  }
  
  // Add general relationship wisdom based on score
  insights.push(generateGeneralWisdom(overallScore));
  
  feedback += insights.join('\n\n');
  
  return feedback;
}

// Generate insights for misaligned feelings
function generateMisalignedInsight(text: string, score: number): string {
  const intensity = score < 40 ? 'gentle' : score < 70 ? 'moderate' : 'intense';
  
  if (text.length < 50) {
    return transformToVoice("The disconnection you're feeling is real, and naming it is the first step toward bridging the gap", intensity);
  } else {
    return transformToStynerVoice("The patterns you're noticing in your misalignment deserve attention. They're trying to teach you something about what you both need to feel truly connected", intensity);
  }
}

// Generate insights for emerging growth
function generateEmergingInsight(text: string, score: number): string {
  const intensity = score < 40 ? 'gentle' : score < 70 ? 'moderate' : 'intense';
  
  if (text.length < 50) {
    return transformToStynerVoice("Even small growth deserves celebration. You're noticing changes that others might miss", intensity);
  } else {
    return transformToStynerVoice("The growth you're witnessing is fragile and precious. Protect it by continuing to name it, to honor it, to give it space to unfold naturally", intensity);
  }
}

// Generate insights for uncertain areas
function generateUncertainInsight(text: string, score: number): string {
  const intensity = score < 40 ? 'gentle' : score < 70 ? 'moderate' : 'intense';
  
  if (text.length < 50) {
    return transformToStynerVoice("Uncertainty isn't the enemy of love—it's often love asking for deeper truth", intensity);
  } else {
    return transformToStynerVoice("The questions you're sitting with are important. They're not obstacles to clarity—they're doorways to deeper understanding", intensity);
  }
}

// Generate general relationship wisdom based on reflection depth
function generateGeneralWisdom(score: number): string {
  if (score < 30) {
    return "Remember: every relationship expert was once a beginner. What matters isn't having all the answers, but staying curious about the questions that matter most.";
  } else if (score < 60) {
    return "You're building emotional muscles you didn't know you had. The work you're doing now—this honest looking—it's creating space for deeper intimacy than you've known before.";
  } else if (score < 80) {
    return "There's a difference between knowing about relationships and knowing your relationship. You're crossing that bridge, moving from theory into the messy, beautiful reality of two people learning to love better.";
  } else {
    return "The depth you've reached isn't about perfection—it's about presence. You're learning to hold space for both the light and shadow in your connection, and that's where real love lives.";
  }
}
function transformToVoice(arg0: string, intensity: string): string {
  throw new Error("Function not implemented.");
}

