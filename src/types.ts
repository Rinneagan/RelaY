export interface KnustCollege {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  programmesCount: number;
  documentsCount: number;
}

export interface KnustProgramme {
  id: string;
  collegeId: string;
  name: string;
  degree: string;
  durationYears: number;
  coursesCount: number;
  documentsCount: number;
  popularCourses: string[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  programmeId: string;
  programmeName: string;
  collegeId: string;
  collegeName: string;
  level: 'Level 100' | 'Level 200' | 'Level 300' | 'Level 400' | 'Level 500' | 'Level 600';
  semester: 'Semester 1' | 'Semester 2';
  documentsCount: number;
  rating: number;
  followersCount: number;
  description: string;
}

export interface DocumentPage {
  pageNumber: number;
  title: string;
  contentHtml: string;
  isLocked?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface DocumentComment {
  id: string;
  author: string;
  avatar: string;
  hallOrDept: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  isHelpful?: boolean;
}

export type KnustDocType =
  | 'Past Questions & Answers (Pasco)'
  | 'Lecture Notes'
  | 'Exam Preparation'
  | 'Summary'
  | 'Assignment Solution';

export interface StudyDocument {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  programmeId: string;
  programmeName: string;
  collegeName: string;
  level: 'Level 100' | 'Level 200' | 'Level 300' | 'Level 400' | 'Level 500' | 'Level 600';
  semester: 'Semester 1' | 'Semester 2';
  academicYear: string;
  docType: KnustDocType;
  author: {
    name: string;
    avatar: string;
    hall: string;
    reputation: number;
    uploadsCount: number;
  };
  rating: number;
  reviewsCount: number;
  views: number;
  downloads: number;
  pageCount: number;
  thumbnailUrl: string;
  pages: DocumentPage[];
  aiSummary: {
    executiveSummary: string;
    keyTakeaways: string[];
    coreFormulasOrDefinitions: { term: string; definition: string }[];
    examTips: string[];
  };
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  comments: DocumentComment[];
  isPremiumOnly?: boolean;
  unlockedByDefault?: boolean;
}

export interface Studylist {
  id: string;
  name: string;
  description: string;
  documentIds: string[];
  isPrivate: boolean;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  studentId: string;
  programme: string;
  college: string;
  level: string;
  hall: string;
  credits: number;
  isPremium: boolean;
  freeUnlocksLeft: number;
  uploadedDocs: StudyDocument[];
  savedStudylists: Studylist[];
}
