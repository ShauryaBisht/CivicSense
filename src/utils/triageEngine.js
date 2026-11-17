// Rule-based classification engine for categorizing civic grievances and detecting urgency
// Analyzes ticket text against municipal keywords and priority triggers.

const KEYWORD_RULES = {
  Infrastructure: [
    "pothole", "asphalt", "crater", "road", "pavement", "crack", "bridge",
    "manhole", "sidewalk", "curb", "concrete", "sinkhole", "tunnel", "guardrail", "flyover"
  ],
  Sanitation: [
    "trash", "garbage", "waste", "dumpster", "litter", "rubbish", "refuse",
    "smell", "rodent", "rats", "flies", "overflow", "biohazard", "debris", "rotting", "blackspot"
  ],
  Electrical: [
    "wire", "spark", "streetlight", "light", "transformer", "pole", "blackout",
    "power", "cables", "exposed", "electrocution", "voltage", "fuse", "lamp", "bescom"
  ],
  "Water & Drainage": [
    "water", "leak", "flood", "drain", "sewer", "sewage", "pipe", "burst",
    "pooling", "clogged", "gutter", "runoff", "hydrant", "sprinkler", "overflow", "rajakaluve", "bwssb"
  ],
  "Public Safety": [
    "danger", "unsafe", "hazard", "fall", "collapse", "collision", "blind spot",
    "accident", "fire", "emergency", "pedestrian", "crosswalk", "barrier", "gas", "divider"
  ],
  "Parks & Recreation": [
    "park", "playground", "swing", "bench", "tree", "grass", "fountain",
    "trail", "lawn", "court", "recreation", "flowerbed", "branch"
  ]
};

const EMERGENCY_TRIGGERS = [
  "live wire", "exposed wire", "sparking", "burst main", "flooding", "sinkhole",
  "collapse", "fire", "gas smell", "child", "school", "electrocution", "open manhole",
  "trapped", "immediate danger"
];

const HIGH_TRIGGERS = [
  "deep pothole", "crater", "damage", "accident", "broken glass", "severe",
  "blocked ramp", "wheelchair", "blind spot", "pest infestation", "dead animal"
];

const MEDIUM_TRIGGERS = [
  "clogged", "overflowing", "flickering", "litter", "puddle", "weed", "graffiti",
  "cracked", "delay"
];

export function analyzeIssueContent(title = "", description = "") {
  const combinedText = `${title} ${description}`.toLowerCase();

  // 1. Detect category by counting keyword matches
  const scores = {};
  const matchedKeywords = [];

  for (const [category, keywords] of Object.entries(KEYWORD_RULES)) {
    scores[category] = 0;
    keywords.forEach((kw) => {
      if (combinedText.includes(kw)) {
        scores[category] += 2;
        matchedKeywords.push(kw);
      }
    });
  }

  // Find category with highest match score
  let bestCategory = "Infrastructure";
  let maxScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }

  // 2. Detect Urgency based on trigger words
  let detectedUrgency = "Low";
  let urgencyReason = "Standard municipal maintenance request.";

  const hasEmergency = EMERGENCY_TRIGGERS.some((trig) => combinedText.includes(trig));
  const hasHigh = HIGH_TRIGGERS.some((trig) => combinedText.includes(trig));
  const hasMedium = MEDIUM_TRIGGERS.some((trig) => combinedText.includes(trig));

  if (hasEmergency) {
    detectedUrgency = "Emergency";
    urgencyReason = "High risk to public safety detected in Bengaluru jurisdiction.";
  } else if (hasHigh) {
    detectedUrgency = "High";
    urgencyReason = "Significant safety hazard or vehicle damage risk on Bengaluru roads.";
  } else if (hasMedium || maxScore > 2) {
    detectedUrgency = "Medium";
    urgencyReason = "Moderate civic grievance requiring scheduled ward maintenance.";
  }

  // Get up to 5 unique matched keywords
  const uniqueKeywords = Array.from(new Set(matchedKeywords)).slice(0, 5);

  let confidence = 75;
  if (uniqueKeywords.length >= 3) confidence = 95;
  else if (uniqueKeywords.length === 2) confidence = 85;
  else if (uniqueKeywords.length === 1) confidence = 78;

  const departmentMapping = {
    Infrastructure: "BBMP Road Infrastructure",
    Sanitation: "BBMP Solid Waste Management (SWM)",
    Electrical: "BESCOM (Electricity Supply & Streetlights)",
    "Water & Drainage": "BWSSB (Water Supply & Sewerage)",
    "Public Safety": "Bengaluru Traffic Police & Road Safety",
    "Parks & Recreation": "BBMP Horticulture & Parks"
  };

  return {
    category: bestCategory,
    urgency: detectedUrgency,
    confidence,
    detectedKeywords: uniqueKeywords.length > 0 ? uniqueKeywords : ["general report"],
    reasoning: urgencyReason,
    suggestedDepartment: departmentMapping[bestCategory] || "BBMP Road Infrastructure"
  };
}
