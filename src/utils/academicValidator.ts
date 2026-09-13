import type { Course, KnustProgramme, KnustDocType } from '../types';

export interface AcademicVerificationResult {
  status: 'approved' | 'warning' | 'rejected';
  score: number; // 0 to 100
  titleScore: number;
  reason: string;
  matchedTopics: string[];
  flags: string[];
  detectedCategory: string;
  suggestedFix?: string;
}

// Common spam / non-academic terms that indicate abuse or bypass attempts
const SPAM_BLACKLIST = [
  'free money', 'crypto', 'bitcoin', 'forex', 'betting', 'betway', '1xbet',
  'lyrics', 'music', 'song', 'mp3', 'album', 'afrobeat',
  'movie', 'netflix', 'series', 'stream', 'episode',
  'vacation', 'selfie', 'recipe', 'cooking', 'shopping', 'receipt', 'invoice',
  'dating', 'hookup', 'instagram', 'tiktok', 'cheat code', 'hack tool',
  'asdf', 'qwerty', 'testing upload', 'random text', 'bypass'
];

// Academic keywords commonly found in legitimate KNUST course uploads
const GENERAL_ACADEMIC_KEYWORDS = [
  'exam', 'examination', 'pasco', 'past question', 'question', 'questions',
  'midsem', 'midterm', 'end of sem', 'semester', 'solution', 'solutions',
  'solved', 'answers', 'marking scheme', 'lecture', 'notes', 'slides',
  'review', 'summary', 'syllabus', 'assignment', 'tutorial', 'lab',
  'practical', 'formula', 'handout', 'derivation', 'proof', 'exercise',
  'coursework', 'handwritten', 'revision', 'module', 'unit'
];

// Course-specific keyword dictionary for KNUST subjects
const COURSE_SYLLABUS_KEYWORDS: Record<string, string[]> = {
  'COE 251': ['microprocessor', 'embedded', '8086', 'assembly', 'registers', 'alu', 'bus', 'interrupt', 'timing', 'memory', 'instruction', 'addressing', 'hardware', 'intel'],
  'MATH 151': ['calculus', 'limits', 'derivatives', 'integrals', 'differentiation', 'continuity', 'functions', 'series', 'taylor', 'rolle', 'mean value', 'vectors', 'algebra'],
  'CSM 157': ['computer science', 'programming', 'c++', 'java', 'python', 'oop', 'algorithms', 'data structures', 'variables', 'pointers', 'arrays', 'recursion', 'compiler'],
  'EE 261': ['electric', 'circuits', 'kirchhoff', 'thevenin', 'norton', 'impedance', 'ac', 'dc', 'phasors', 'capacitance', 'inductance', 'mesh', 'nodal', 'power'],
  'ME 159': ['applied electricity', 'current', 'voltage', 'resistors', 'magnetic', 'transformer', 'generators', 'motors', 'circuits', 'schematics'],
  'COE 252': ['data structures', 'algorithms', 'trees', 'binary tree', 'graphs', 'stacks', 'queues', 'linked list', 'big-o', 'sorting', 'hashing', 'dijkstra'],
  'PHAR 210': ['pharmacology', 'drugs', 'receptors', 'pharmacokinetics', 'pharmacodynamics', 'dosage', 'toxicity', 'antibiotics', 'cardiovascular', 'cns', 'bioavailability'],
  'LAW 101': ['law of contract', 'offer', 'acceptance', 'consideration', 'intention', 'breach', 'remedies', 'damages', 'ghana law', 'constitution', 'tort', 'precedent'],
  'CE 265': ['fluid mechanics', 'bernoulli', 'hydrostatics', 'viscosity', 'pipe flow', 'reynolds', 'buoyancy', 'hydraulics', 'pressure'],
  'ARCH 151': ['architectural', 'design', 'drawing', 'scale', 'spatial', 'plan', 'elevation', 'axonometric', 'composition', 'studio', 'drafting'],
};

/**
 * Validates uploaded material to ensure it is academically relevant to the specified KNUST course
 */
export function validateAcademicMaterial(
  title: string,
  fileName: string | null,
  course: Course | undefined,
  programme: KnustProgramme | undefined,
  docType: KnustDocType
): AcademicVerificationResult {
  const flags: string[] = [];
  const matchedTopics: string[] = [];

  const cleanTitle = title.trim().toLowerCase();
  const cleanFileName = (fileName || '').toLowerCase();
  const combinedText = `${cleanTitle} ${cleanFileName}`;

  // 1. Basic length check
  if (!cleanTitle || cleanTitle.length < 5) {
    return {
      status: 'rejected',
      score: 10,
      titleScore: 10,
      reason: 'Title is too short or empty. Please enter a descriptive title mentioning the course, year, or topic.',
      matchedTopics: [],
      flags: ['Title length < 5 characters'],
      detectedCategory: 'Incomplete',
      suggestedFix: `Example: ${course ? course.code : 'Course'} 2024 End of Semester Past Questions & Full Solutions`,
    };
  }

  // 2. Spam & Gibberish Detection
  for (const spam of SPAM_BLACKLIST) {
    if (combinedText.includes(spam)) {
      flags.push(`Spam/unrelated term detected: "${spam}"`);
    }
  }

  // Check for keyboard smash (e.g., 'asdfgh', 'aaaaaa', '12345678')
  if (/(.)\1{4,}/.test(cleanTitle) || /^[b-df-hj-np-tv-z]{6,}$/i.test(cleanTitle.replace(/\s+/g, ''))) {
    flags.push('Unintelligible random characters detected (gibberish pattern)');
  }

  if (flags.length > 0) {
    return {
      status: 'rejected',
      score: 5,
      titleScore: 5,
      reason: 'Academic Integrity Alert: Upload appears to contain non-academic or spam content. To maintain quality and earn Tek Credits, uploads must be genuine KNUST study materials.',
      matchedTopics: [],
      flags,
      detectedCategory: 'Flagged Content',
      suggestedFix: `Make sure the title and document describe your ${course?.code || 'KNUST course'} lecture notes or pasco.`,
    };
  }

  // 3. Match against General Academic Keywords
  let academicKeywordMatches = 0;
  for (const word of GENERAL_ACADEMIC_KEYWORDS) {
    if (combinedText.includes(word)) {
      academicKeywordMatches++;
      if (!matchedTopics.includes(word)) {
        matchedTopics.push(word);
      }
    }
  }

  // 4. Match against Course-Specific Syllabus
  let courseSpecificMatches = 0;
  if (course) {
    const courseCodeClean = course.code.toLowerCase().replace(/\s+/g, '');
    const cleanCombinedNoSpaces = combinedText.replace(/\s+/g, '');

    // Check if course code is present (e.g. 'coe251' or 'coe 251')
    if (cleanCombinedNoSpaces.includes(courseCodeClean)) {
      courseSpecificMatches += 3;
      matchedTopics.push(course.code);
    }

    // Check course title words (e.g. 'microprocessors', 'calculus', 'embedded')
    const titleWords = course.name.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !['with', 'into', 'from', 'over'].includes(w));
    for (const word of titleWords) {
      if (combinedText.includes(word)) {
        courseSpecificMatches += 2;
        matchedTopics.push(word);
      }
    }

    // Check specific syllabus keywords
    const syllabus = COURSE_SYLLABUS_KEYWORDS[course.code];
    if (syllabus) {
      for (const kw of syllabus) {
        if (combinedText.includes(kw)) {
          courseSpecificMatches += 2;
          if (!matchedTopics.includes(kw)) {
            matchedTopics.push(kw);
          }
        }
      }
    }
  }

  // 5. Cross-Programme Mismatch Check
  // E.g., uploading Law materials under an Engineering course or vice-versa
  if (course && programme) {
    const isEngineering = course.collegeName.toLowerCase().includes('engineering');
    const isLaw = course.collegeName.toLowerCase().includes('humanities') || course.name.toLowerCase().includes('law');
    const isMedical = course.collegeName.toLowerCase().includes('health') || course.name.toLowerCase().includes('pharm');

    if (isEngineering && (combinedText.includes('contract law') || combinedText.includes('tort') || combinedText.includes('pharmacology') || combinedText.includes('botany'))) {
      flags.push('Course mismatch: Material appears to belong to another college/discipline');
    }
    if (isLaw && (combinedText.includes('microprocessor') || combinedText.includes('fluid mechanics') || combinedText.includes('kirchhoff'))) {
      flags.push('Course mismatch: Material appears to belong to Engineering');
    }
    if (isMedical && (combinedText.includes('microprocessor') || combinedText.includes('circuit theory') || combinedText.includes('law of contract'))) {
      flags.push('Course mismatch: Material appears to belong to Engineering or Law rather than Health Sciences');
    }
  }

  // 6. Calculate Overall Relevance Score
  let score = 25; // baseline for valid text
  if (fileName && (fileName.endsWith('.pdf') || fileName.endsWith('.docx') || fileName.endsWith('.pptx'))) {
    score += 15; // valid academic document format
  }

  score += Math.min(30, academicKeywordMatches * 8);
  score += Math.min(35, courseSpecificMatches * 10);

  if (flags.length > 0) {
    score = Math.max(15, score - 50);
  }

  score = Math.min(100, Math.max(0, score));

  // Determine status
  if (score >= 65 && flags.length === 0) {
    return {
      status: 'approved',
      score,
      titleScore: score,
      reason: `Verified Academic Match: High relevance to ${course ? course.code : 'course'} syllabus. Eligible for +50 Tek Credits upon publishing!`,
      matchedTopics,
      flags,
      detectedCategory: docType,
    };
  } else if (score >= 40 && flags.length === 0) {
    return {
      status: 'warning',
      score,
      titleScore: score,
      reason: `Moderate Relevance (${score}%): We detected general study keywords, but adding the course code (${course?.code || ''}) or specific lecture topic will boost visibility and guarantee quick approval.`,
      matchedTopics,
      flags,
      detectedCategory: docType,
      suggestedFix: `Consider mentioning "${course?.code || ''} - ${course?.name || ''}" in the title.`,
    };
  } else {
    return {
      status: 'rejected',
      score,
      titleScore: score,
      reason: `Course Relevance Check Failed (${score}%): The title or file does not appear related to ${course?.code || 'this course'} (${course?.name || ''}). Irrelevant or non-academic files are blocked to protect quality.`,
      matchedTopics,
      flags,
      detectedCategory: 'Unverified Content',
      suggestedFix: `Please ensure your upload is for ${course?.code || 'the selected course'} (${course?.name || ''}) and contains legitimate past exam questions, lecture slides, or course notes.`,
    };
  }
}
