/**
 * CivicFix Intelligent AI Analyzer
 * Scans citizen issue title and description to detect civic category,
 * risk factors, urgency level, and routing priority.
 */

const KEYWORD_RULES = {
  Infrastructure: [
    "pothole", "asphalt", "crater", "road", "pavement", "crack", "bridge",
    "manhole", "sidewalk", "curb", "concrete", "sinkhole", "tunnel", "guardrail"
  ],
  Sanitation: [
    "trash", "garbage", "waste", "dumpster", "litter", "rubbish", "refuse",
    "smell", "rodent", "rats", "flies", "overflow", "biohazard", "debris", "rotting"
  ],
  Electrical: [
    "wire", "spark", "streetlight", "light", "transformer", "pole", "blackout",
    "power", "cables", "exposed", "electrocution", "voltage", "fuse", "lamp"
  ],
  "Water & Drainage": [
    "water", "leak", "flood", "drain", "sewer", "sewage", "pipe", "burst",
    "pooling", "clogged", "gutter", "runoff", "hydrant", "sprinkler", "overflow"
  ],
  "Public Safety": [
    "danger", "unsafe", "hazard", "fall", "collapse", "collision", "blind spot",
    "accident", "fire", "emergency", "pedestrian", "crosswalk", "barrier", "gas"
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

  // 1. Detect Category by keyword scoring
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

  // Find best scoring category
  let bestCategory = "Infrastructure";
  let maxScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }

  // 2. Detect Urgency
  let detectedUrgency = "Low";
  let urgencyReason = "Standard civic maintenance request without acute hazard indicators.";

  const hasEmergency = EMERGENCY_TRIGGERS.some((trig) => combinedText.includes(trig));
  const hasHigh = HIGH_TRIGGERS.some((trig) => combinedText.includes(trig));
  const hasMedium = MEDIUM_TRIGGERS.some((trig) => combinedText.includes(trig));

  if (hasEmergency) {
    detectedUrgency = "Emergency";
    urgencyReason = "Critical public safety alert: immediate threat to life, property, or high risk of electrocution/structural failure.";
  } else if (hasHigh) {
    detectedUrgency = "High";
    urgencyReason = "Elevated safety hazard detected with vehicle damage or pedestrian injury risk.";
  } else if (hasMedium || maxScore > 2) {
    detectedUrgency = "Medium";
    urgencyReason = "Moderate municipal degradation requiring scheduled maintenance within standard SLA.";
  }

  // Unique detected keywords
  const uniqueKeywords = Array.from(new Set(matchedKeywords)).slice(0, 5);

  // Confidence calculation
  let confidence = 70;
  if (uniqueKeywords.length >= 3) confidence = 95;
  else if (uniqueKeywords.length === 2) confidence = 88;
  else if (uniqueKeywords.length === 1) confidence = 81;

  // Department suggestion
  const departmentMapping = {
    Infrastructure: "Department of Public Works",
    Sanitation: "Department of Sanitation",
    Electrical: "Bureau of Electrical Grid & Lighting",
    "Water & Drainage": "Water & Sewer Authority",
    "Public Safety": "Department of Transportation & Safety",
    "Parks & Recreation": "Parks & Recreation Maintenance"
  };

  return {
    category: bestCategory,
    urgency: detectedUrgency,
    confidence,
    detectedKeywords: uniqueKeywords.length > 0 ? uniqueKeywords : ["general report"],
    reasoning: urgencyReason,
    suggestedDepartment: departmentMapping[bestCategory] || "Department of Public Works"
  };
}
