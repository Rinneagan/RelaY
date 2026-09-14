import type {
  KnustCollege,
  KnustProgramme,
  Course,
  StudyDocument,
  UserProfile
} from '../types';

export const KNUST_COLLEGES: KnustCollege[] = [
  {
    id: 'coe',
    name: 'College of Engineering',
    shortName: 'CoE',
    badge: '⚙️',
    description: 'Premier engineering training hub in West Africa producing world-class innovators and industry leaders.',
    programmesCount: 12,
    documentsCount: 14200
  },
  {
    id: 'cos',
    name: 'College of Science',
    shortName: 'CoS',
    badge: '🔬',
    description: 'Advancing scientific discovery in computer science, mathematics, physical and biological sciences.',
    programmesCount: 14,
    documentsCount: 12800
  },
  {
    id: 'cohs',
    name: 'College of Health Sciences',
    shortName: 'CoHS',
    badge: '🩺',
    description: 'Excellence in medical training, pharmacy, nursing, and allied biomedical sciences.',
    programmesCount: 9,
    documentsCount: 10400
  },
  {
    id: 'cohss',
    name: 'College of Humanities & Social Sciences',
    shortName: 'CoHSS',
    badge: '⚖️',
    description: 'KNUST School of Business, Faculty of Law, and Faculty of Social Sciences.',
    programmesCount: 10,
    documentsCount: 11900
  },
  {
    id: 'cabe',
    name: 'College of Art & Built Environment',
    shortName: 'CABE',
    badge: '🏛️',
    description: 'Leading architecture, construction technology, land economy, and industrial art disciplines.',
    programmesCount: 8,
    documentsCount: 7800
  },
  {
    id: 'canr',
    name: 'College of Agriculture & Natural Resources',
    shortName: 'CANR',
    badge: '🌱',
    description: 'Transformative research in sustainable agriculture, forestry, and water resources management.',
    programmesCount: 6,
    documentsCount: 5200
  }
];

export const KNUST_PROGRAMMES: KnustProgramme[] = [
  // CoE Programmes
  {
    id: 'prog-computer-eng',
    collegeId: 'coe',
    name: 'BSc. Computer Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 38,
    documentsCount: 2450,
    popularCourses: ['COE 251', 'COE 158', 'COE 357', 'MATH 151']
  },
  {
    id: 'prog-electrical-eng',
    collegeId: 'coe',
    name: 'BSc. Electrical & Electronic Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 36,
    documentsCount: 2180,
    popularCourses: ['EE 261', 'EE 371', 'MATH 251', 'EE 151']
  },
  {
    id: 'prog-mechanical-eng',
    collegeId: 'coe',
    name: 'BSc. Mechanical Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 35,
    documentsCount: 1940,
    popularCourses: ['ME 251', 'ME 361', 'ME 151', 'MATH 151']
  },
  {
    id: 'prog-civil-eng',
    collegeId: 'coe',
    name: 'BSc. Civil Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 34,
    documentsCount: 1820,
    popularCourses: ['CE 251', 'CE 351', 'GE 151', 'MATH 151']
  },
  {
    id: 'prog-telecom-eng',
    collegeId: 'coe',
    name: 'BSc. Telecommunications Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 32,
    documentsCount: 1350,
    popularCourses: ['TE 251', 'TE 351', 'MATH 251']
  },
  {
    id: 'prog-biomedical-eng',
    collegeId: 'coe',
    name: 'BSc. Biomedical Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 30,
    documentsCount: 1100,
    popularCourses: ['BME 251', 'BME 351', 'MATH 151']
  },
  {
    id: 'prog-chemical-eng',
    collegeId: 'coe',
    name: 'BSc. Chemical Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 32,
    documentsCount: 1240,
    popularCourses: ['CHE 251', 'CHE 351', 'MATH 151']
  },
  {
    id: 'prog-aerospace-eng',
    collegeId: 'coe',
    name: 'BSc. Aerospace Engineering',
    degree: 'BSc. Engineering',
    durationYears: 4,
    coursesCount: 28,
    documentsCount: 890,
    popularCourses: ['AE 251', 'AE 351', 'MATH 251']
  },

  // CoS Programmes
  {
    id: 'prog-computer-science',
    collegeId: 'cos',
    name: 'BSc. Computer Science',
    degree: 'BSc. Science',
    durationYears: 4,
    coursesCount: 36,
    documentsCount: 2820,
    popularCourses: ['CSM 157', 'CSM 283', 'CSM 357', 'MATH 151']
  },
  {
    id: 'prog-information-tech',
    collegeId: 'cos',
    name: 'BSc. Information Technology',
    degree: 'BSc. Science',
    durationYears: 4,
    coursesCount: 34,
    documentsCount: 2150,
    popularCourses: ['BIT 151', 'BIT 251', 'CSM 157']
  },
  {
    id: 'prog-mathematics',
    collegeId: 'cos',
    name: 'BSc. Mathematics',
    degree: 'BSc. Science',
    durationYears: 4,
    coursesCount: 32,
    documentsCount: 1650,
    popularCourses: ['MATH 151', 'MATH 251', 'MATH 351']
  },
  {
    id: 'prog-actuarial-science',
    collegeId: 'cos',
    name: 'BSc. Actuarial Science',
    degree: 'BSc. Science',
    durationYears: 4,
    coursesCount: 30,
    documentsCount: 1420,
    popularCourses: ['ACT 251', 'MATH 151', 'STAT 251']
  },
  {
    id: 'prog-biochemistry',
    collegeId: 'cos',
    name: 'BSc. Biochemistry',
    degree: 'BSc. Science',
    durationYears: 4,
    coursesCount: 31,
    documentsCount: 1390,
    popularCourses: ['BCH 251', 'BCH 351', 'BIO 151']
  },

  // CoHS Programmes
  {
    id: 'prog-medicine',
    collegeId: 'cohs',
    name: 'MB ChB (Human Biology & Medicine)',
    degree: 'MB ChB',
    durationYears: 6,
    coursesCount: 42,
    documentsCount: 3100,
    popularCourses: ['MBCHB 201', 'MBCHB 301', 'ANAT 151']
  },
  {
    id: 'prog-pharmacy',
    collegeId: 'cohs',
    name: 'Pharm D (Doctor of Pharmacy)',
    degree: 'Pharm D',
    durationYears: 6,
    coursesCount: 40,
    documentsCount: 2750,
    popularCourses: ['PHAR 210', 'PHAR 310', 'PCOG 251']
  },
  {
    id: 'prog-nursing',
    collegeId: 'cohs',
    name: 'BSc. Nursing',
    degree: 'BSc. Nursing',
    durationYears: 4,
    coursesCount: 32,
    documentsCount: 1840,
    popularCourses: ['NURS 251', 'NURS 351', 'ANAT 151']
  },

  // CoHSS Programmes
  {
    id: 'prog-business-admin',
    collegeId: 'cohss',
    name: 'BSc. Business Administration (KSB)',
    degree: 'BSc. Business Administration',
    durationYears: 4,
    coursesCount: 38,
    documentsCount: 3400,
    popularCourses: ['BBA 101', 'ACCT 151', 'FIN 251', 'MKT 251']
  },
  {
    id: 'prog-law',
    collegeId: 'cohss',
    name: 'Bachelor of Laws (LL.B)',
    degree: 'LL.B',
    durationYears: 4,
    coursesCount: 28,
    documentsCount: 2200,
    popularCourses: ['LAW 101', 'LAW 201', 'LAW 301']
  },
  {
    id: 'prog-economics',
    collegeId: 'cohss',
    name: 'BA. Economics',
    degree: 'BA. Social Sciences',
    durationYears: 4,
    coursesCount: 30,
    documentsCount: 1750,
    popularCourses: ['ECON 101', 'ECON 201', 'ECON 301']
  },

  // CABE Programmes
  {
    id: 'prog-architecture',
    collegeId: 'cabe',
    name: 'BSc. Architecture',
    degree: 'BSc. Architecture',
    durationYears: 4,
    coursesCount: 30,
    documentsCount: 1540,
    popularCourses: ['ARCH 101', 'ARCH 201', 'BLD 151']
  },
  {
    id: 'prog-construction-mgt',
    collegeId: 'cabe',
    name: 'BSc. Construction Technology & Management',
    degree: 'BSc. Built Environment',
    durationYears: 4,
    coursesCount: 28,
    documentsCount: 1320,
    popularCourses: ['CTM 151', 'CTM 251', 'QS 251']
  },
  {
    id: 'prog-land-economy',
    collegeId: 'cabe',
    name: 'BSc. Land Economy',
    degree: 'BSc. Built Environment',
    durationYears: 4,
    coursesCount: 26,
    documentsCount: 1140,
    popularCourses: ['LE 151', 'LE 251', 'VAL 251']
  },

  // CANR Programmes
  {
    id: 'prog-agriculture',
    collegeId: 'canr',
    name: 'BSc. Agriculture',
    degree: 'BSc. Agriculture',
    durationYears: 4,
    coursesCount: 28,
    documentsCount: 1210,
    popularCourses: ['AGR 151', 'AGR 251', 'SOIL 251']
  },
  {
    id: 'prog-natural-resources',
    collegeId: 'canr',
    name: 'BSc. Natural Resources Management',
    degree: 'BSc. Natural Resources',
    durationYears: 4,
    coursesCount: 26,
    documentsCount: 980,
    popularCourses: ['NRM 151', 'NRM 251', 'FOR 251']
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-coe-251',
    code: 'COE 251',
    name: 'Data Structures and Algorithms',
    programmeId: 'prog-computer-eng',
    programmeName: 'BSc. Computer Engineering',
    collegeId: 'coe',
    collegeName: 'College of Engineering (CoE)',
    level: 'Level 200',
    semester: 'Semester 1',
    documentsCount: 42,
    rating: 4.95,
    followersCount: 1850,
    description: 'Analysis of algorithms, time/space complexity, arrays, singly/doubly linked lists, binary search trees, AVL trees, heaps, hash tables, graph traversals, and dynamic programming with C++ and Java implementations.'
  },
  {
    id: 'course-math-151',
    code: 'MATH 151',
    name: 'Mathematics I (Algebra & Calculus)',
    programmeId: 'prog-computer-eng',
    programmeName: 'BSc. Computer Engineering',
    collegeId: 'coe',
    collegeName: 'College of Engineering (CoE)',
    level: 'Level 100',
    semester: 'Semester 1',
    documentsCount: 68,
    rating: 4.88,
    followersCount: 3200,
    description: 'Calculus of one variable, limits, continuity, differentiation techniques, Mean Value Theorem, Taylor series expansion, integration techniques, partial fractions, and matrix algebra for engineering students.'
  },
  {
    id: 'course-csm-157',
    code: 'CSM 157',
    name: 'Programming and Problem Solving with C++',
    programmeId: 'prog-computer-science',
    programmeName: 'BSc. Computer Science',
    collegeId: 'cos',
    collegeName: 'College of Science (CoS)',
    level: 'Level 100',
    semester: 'Semester 1',
    documentsCount: 54,
    rating: 4.92,
    followersCount: 2400,
    description: 'Problem-solving strategies, algorithm representation using flowcharts and pseudocode, control structures, functions, arrays, pointers, memory allocation, and object-oriented basics in C++.'
  },
  {
    id: 'course-ee-261',
    code: 'EE 261',
    name: 'Electrical Machines I',
    programmeId: 'prog-electrical-eng',
    programmeName: 'BSc. Electrical & Electronic Engineering',
    collegeId: 'coe',
    collegeName: 'College of Engineering (CoE)',
    level: 'Level 200',
    semester: 'Semester 1',
    documentsCount: 38,
    rating: 4.82,
    followersCount: 1450,
    description: 'Electromechanical energy conversion principles, DC machines, generators, motors, single-phase and three-phase transformers, equivalent circuit models, and efficiency tests.'
  },
  {
    id: 'course-phar-210',
    code: 'PHAR 210',
    name: 'General Pharmacology & Pharmacokinetics',
    programmeId: 'prog-pharmacy',
    programmeName: 'Pharm D (Doctor of Pharmacy)',
    collegeId: 'cohs',
    collegeName: 'College of Health Sciences (CoHS)',
    level: 'Level 200',
    semester: 'Semester 1',
    documentsCount: 46,
    rating: 4.94,
    followersCount: 1680,
    description: 'Pharmacodynamics and receptor theories, ADME processes (Absorption, Distribution, Metabolism, Excretion), half-life equations, bioavailability, and autonomic nervous system agonists/antagonists.'
  },
  {
    id: 'course-bba-101',
    code: 'BBA 101',
    name: 'Principles of Management',
    programmeId: 'prog-business-admin',
    programmeName: 'BSc. Business Administration (KSB)',
    collegeId: 'cohss',
    collegeName: 'College of Humanities & Social Sciences (CoHSS)',
    level: 'Level 100',
    semester: 'Semester 1',
    documentsCount: 62,
    rating: 4.8,
    followersCount: 2900,
    description: 'Fundamental management concepts, organizational theory, planning, organizing, leading, controlling (POLC framework), corporate governance, and Ghanaian business environment ethics.'
  },
  {
    id: 'course-law-101',
    code: 'LAW 101',
    name: 'Ghana Legal System & Constitutional Law',
    programmeId: 'prog-law',
    programmeName: 'Bachelor of Laws (LL.B)',
    collegeId: 'cohss',
    collegeName: 'College of Humanities & Social Sciences (CoHSS)',
    level: 'Level 100',
    semester: 'Semester 1',
    documentsCount: 51,
    rating: 4.9,
    followersCount: 1920,
    description: 'Sources of Ghanaian law under the 1992 Constitution: primary legislation, common law, customary law, judicial precedent, separation of powers, and the hierarchy of courts in Ghana.'
  }
];

export const INITIAL_DOCUMENTS: StudyDocument[] = [
  {
    id: 'doc-coe251-pasco',
    title: 'COE 251 End-of-Semester Exam Past Questions with Step-by-Step Worked Answers (2020-2025)',
    courseCode: 'COE 251',
    courseName: 'Data Structures and Algorithms',
    programmeId: 'prog-computer-eng',
    programmeName: 'BSc. Computer Engineering',
    collegeName: 'College of Engineering (CoE)',
    level: 'Level 200',
    semester: 'Semester 1',
    academicYear: '2025/2026',
    docType: 'Past Questions & Answers (Pasco)',
    author: {
      name: 'Kwame Mensah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      hall: 'Unity Hall (Conti)',
      reputation: 99,
      uploadsCount: 18
    },
    rating: 4.98,
    reviewsCount: 214,
    views: 18900,
    downloads: 4120,
    pageCount: 5,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        title: 'Section A: Asymptotic Complexity & Master Theorem (KNUST Pasco Worked Solutions)',
        contentHtml: `
          <div class="doc-sheet">
            <header class="doc-header-banner">
              <span class="doc-badge">KNUST CoE • COE 251 PAST QUESTIONS & ANSWERS</span>
              <h1>Data Structures & Algorithms - End of Semester Solutions</h1>
              <p class="doc-subtitle">Compiled by Unity Hall Academic Board | Level 200 Semester 1</p>
            </header>

            <section class="doc-section">
              <h2>Question 1 (May 2024 End of Sem - 15 Marks):</h2>
              <div class="callout callout-info">
                <strong>Problem Statement:</strong>
                <p>Consider the recurrence relation for an algorithm: <code>T(n) = 3T(n/2) + &Theta;(n)</code>.</p>
                <ol>
                  <li>State the Master Theorem and determine the asymptotic bound for <code>T(n)</code>.</li>
                  <li>Compare its asymptotic runtime with <code>T'(n) = 2T'(n/2) + &Theta;(n)</code> (Merge Sort).</li>
                </ol>
              </div>

              <h3>Worked Model Solution:</h3>
              <p><strong>Part 1:</strong> The Master Theorem form is <code>T(n) = aT(n/b) + f(n)</code>, where <code>a &ge; 1</code> and <code>b &gt; 1</code>.</p>
              <ul>
                <li>Here, <code>a = 3</code>, <code>b = 2</code>, and <code>f(n) = &Theta;(n) = &Theta;(n^1)</code>.</li>
                <li>Calculate critical exponent: <code>log_b(a) = log_2(3) &approx; 1.585</code>.</li>
                <li>Since <code>f(n) = O(n^c)</code> where <code>c = 1 &lt; log_2(3)</code>, we apply <strong>Case 1</strong> of Master Theorem.</li>
                <li><strong>Conclusion:</strong> <code>T(n) = &Theta;(n^(log_2(3))) &approx; &Theta;(n^1.585)</code>.</li>
              </ul>
              <p><strong>Part 2:</strong> Merge Sort has <code>T'(n) = &Theta;(n log n)</code>. Because <code>n log n &lt; n^1.585</code> for large <code>n</code>, Merge Sort is asymptotically strictly faster than <code>T(n)</code>.</p>
            </section>
          </div>
        `
      },
      {
        pageNumber: 2,
        title: 'Section B: AVL Tree Rotations & Heap Construction',
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 2 (KNUST 2023 Exam - 20 Marks):</h2>
            <div class="callout callout-warning">
              <strong>Problem:</strong> Insert the following sequence of keys into an initially empty AVL Tree in order:
              <code>[30, 20, 10, 25, 40, 50, 22]</code>. Show the tree after each rebalancing rotation and calculate balance factors.
            </div>

            <h3>Step-by-Step Worked Solution:</h3>
            <ol>
              <li>Insert 30, then 20 (BF of 30 = +1).</li>
              <li>Insert 10: Node 30 has left child 20, left child 10 &rarr; <strong>Left-Left (LL) Heavy</strong> with BF = +2.
                <div class="formula-box">Right Rotate(30): New root is 20, with left child 10 and right child 30. Perfectly balanced!</div>
              </li>
              <li>Insert 25 (right of 20, left of 30). Insert 40 (right of 30).</li>
              <li>Insert 50: Node 30 becomes <strong>Right-Right (RR) Heavy</strong> &rarr; Left Rotate(30) makes 40 parent of 30 and 50.</li>
              <li>Insert 22: Results in <strong>Left-Right (LR) imbalance</strong> at Node 25. First rotate 22 left, then rotate 25 right.</li>
            </ol>
          </div>
        `
      },
      {
        pageNumber: 3,
        title: 'Section C: Graph Traversal (BFS vs Dijkstra in KNUST Network)',
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 3 (KNUST 2022 Exam - 15 Marks):</h2>
            <p>Suppose you are modeling the KNUST campus fiber optic network between: <em>CoE &rarr; Library &rarr; Great Hall &rarr; Commercial Area &rarr; Conti &rarr; Katanga</em>.</p>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Edge (Fiber Link)</th>
                    <th>Latency (ms)</th>
                    <th>Bandwidth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>CoE &harr; Library</td><td>2 ms</td><td>10 Gbps</td></tr>
                  <tr><td>Library &harr; Great Hall</td><td>3 ms</td><td>10 Gbps</td></tr>
                  <tr><td>Great Hall &harr; Commercial Area</td><td>1 ms</td><td>10 Gbps</td></tr>
                  <tr><td>Commercial Area &harr; Conti</td><td>4 ms</td><td>5 Gbps</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>Solution:</strong> Executing Dijkstra's algorithm with priority queue yields shortest path latency from CoE to Conti of exactly <strong>10 ms</strong>.</p>
          </div>
        `
      },
      {
        pageNumber: 4,
        title: 'Section D: Dynamic Programming Knapsack Solutions',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 4 (KNUST 2021 Exam - 25 Marks): 0/1 Knapsack</h2>
            <p>Formulating the DP table for 4 items with total weight capacity W = 8 kg.</p>
          </div>
        `
      },
      {
        pageNumber: 5,
        title: 'Section E: Hash Tables & Linear Probing Collisions',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 5: Hash Function Division Method & Clustering</h2>
            <p>Analysis of primary and secondary clustering when load factor &alpha; &gt; 0.75.</p>
          </div>
        `
      }
    ],
    aiSummary: {
      executiveSummary: 'Complete compilations of KNUST COE 251 Data Structures past examination questions with detailed lecturer-approved step-by-step solutions, recurrence proofs, and AVL balancing diagrams.',
      keyTakeaways: [
        'Master Theorem Case 1 applies when f(n) is polynomial smaller than n^(log_b a).',
        'In AVL trees, always check balance factors top-down after every single node insertion.',
        'Use BFS for unweighted minimum hops and Dijkstra for latency-weighted shortest paths on campus networks.'
      ],
      coreFormulasOrDefinitions: [
        { term: 'Master Theorem', definition: 'T(n) = aT(n/b) + f(n) enables direct asymptotic complexity derivation for divide-and-conquer algorithms.' },
        { term: 'AVL Balance Factor', definition: 'BF = Height(Left Subtree) - Height(Right Subtree). Valid bounds: -1, 0, +1.' }
      ],
      examTips: [
        'KNUST lecturers frequently penalize students who do not show the intermediate tree before and after rotations.',
        'State whether an algorithm is in-place and show auxiliary space complexity.'
      ]
    },
    quiz: [
      {
        id: 'kq1',
        question: 'In COE 251 past questions, what is the critical exponent log_b(a) for the recurrence T(n) = 3T(n/2) + n?',
        options: ['log_2(3) ≈ 1.585', 'log_3(2) ≈ 0.63', '1.0', '2.0'],
        correctIndex: 0,
        explanation: 'a = 3, b = 2, so the critical exponent is log_2(3) ≈ 1.585. Since c = 1 < 1.585, Case 1 yields Θ(n^1.585).',
        hint: 'b is the division factor (2), and a is the multiplier (3).'
      },
      {
        id: 'kq2',
        question: 'Which rotation is performed when an AVL node has Balance Factor +2 and its left child has Balance Factor -1?',
        options: ['Left-Right (LR) Double Rotation', 'Single Left Rotation', 'Single Right Rotation', 'Right-Left (RL) Double Rotation'],
        correctIndex: 0,
        explanation: 'A left-heavy node (+2) whose left child is right-heavy (-1) forms a "dogleg" shape requiring a Left-Right double rotation.',
        hint: 'First rotate the child left, then rotate the parent right.'
      }
    ],
    flashcards: [
      { id: 'kf1', front: 'What is the worst-case search time in an unbalanced BST vs an AVL tree?', back: 'Unbalanced BST degrades to O(n) (skewed linked list); AVL guarantees strictly O(log n) worst-case.', category: 'Trees' },
      { id: 'kf2', front: 'What causes primary clustering in hash tables?', back: 'Linear probing: occupied adjacent buckets form long contiguous clusters, increasing average probe lengths.', category: 'Hashing' }
    ],
    comments: [
      {
        id: 'kc1',
        author: 'Yaw Boateng',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        hallOrDept: 'University Hall (Katanga)',
        date: '2 days ago',
        rating: 5,
        text: 'This pasco breakdown is the reason I survived COE 251 midsem! Clear explanations for the Master Theorem questions.',
        likes: 38,
        isHelpful: true
      }
    ]
  },
  {
    id: 'doc-math151-calc',
    title: 'MATH 151 Complete Engineering Calculus & Algebra Lecture Notes (Level 100 CoE)',
    courseCode: 'MATH 151',
    courseName: 'Mathematics I (Algebra & Calculus)',
    programmeId: 'prog-computer-eng',
    programmeName: 'BSc. Computer Engineering',
    collegeName: 'College of Engineering (CoE)',
    level: 'Level 100',
    semester: 'Semester 1',
    academicYear: '2025/2026',
    docType: 'Lecture Notes',
    author: {
      name: 'Abena Osei',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      hall: 'Queen Elizabeth II Hall',
      reputation: 98,
      uploadsCount: 12
    },
    rating: 4.93,
    reviewsCount: 148,
    views: 16200,
    downloads: 3890,
    pageCount: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        title: 'Limits, L’Hôpital’s Rule & Continuity',
        contentHtml: `
          <div class="doc-sheet">
            <header class="doc-header-banner">
              <span class="doc-badge">KNUST CoE & CoS • MATH 151 LECTURE NOTES</span>
              <h1>Differential Calculus for First Year Engineers & Scientists</h1>
              <p class="doc-subtitle">KNUST Department of Mathematics | Level 100 Semester 1</p>
            </header>
            <section class="doc-section">
              <h2>1. Indeterminate Forms & L’Hôpital’s Rule</h2>
              <p>When evaluating <code>lim_{x&rarr;a} [f(x) / g(x)]</code> yields <code>0/0</code> or <code>&infin;/&infin;</code>, differentiate numerator and denominator independently:</p>
              <div class="formula-box">
                <code>lim_{x&rarr;a} [f(x) / g(x)] = lim_{x&rarr;a} [f'(x) / g'(x)]</code>
              </div>
              <div class="callout callout-warning">
                <strong>Crucial Exam Rule:</strong> Verify the expression is strictly an indeterminate form before applying L’Hôpital's rule!
              </div>
            </section>
          </div>
        `
      },
      {
        pageNumber: 2,
        title: 'Taylor & Maclaurin Series Expansions',
        contentHtml: `
          <div class="doc-sheet">
            <h2>2. Series Expansion Formulas</h2>
            <p>Maclaurin series for <em>f(x)</em> around <em>x = 0</em>:</p>
            <div class="formula-box">
              <code>f(x) = f(0) + f'(0)x + [f''(0)/2!]x^2 + [f'''(0)/3!]x^3 + ... + [f^(n)(0)/n!]x^n</code>
            </div>
            <ul>
              <li><code>e^x = 1 + x + x^2/2! + x^3/3! + ...</code></li>
              <li><code>sin(x) = x - x^3/3! + x^5/5! - ...</code></li>
              <li><code>cos(x) = 1 - x^2/2! + x^4/4! - ...</code></li>
            </ul>
          </div>
        `
      },
      {
        pageNumber: 3,
        title: 'Integration Techniques: By Parts & Partial Fractions',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>3. Integration by Parts: LIATE Rule</h2>
            <p>Formula: <code>&int; u dv = uv - &int; v du</code>.</p>
          </div>
        `
      },
      {
        pageNumber: 4,
        title: 'Past Exam Midterm Practice Problems & Answers',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>Midsem Sample Questions with Step-by-Step Proofs</h2>
          </div>
        `
      }
    ],
    aiSummary: {
      executiveSummary: 'Covers essential first-year KNUST engineering calculus including L’Hôpital’s rule, Taylor series expansions, integration techniques, and common midterm past questions.',
      keyTakeaways: [
        'Always check for 0/0 or inf/inf before applying L’Hôpital.',
        'Use LIATE (Logarithmic, Inverse trig, Algebraic, Trig, Exponential) to select u in integration by parts.'
      ],
      coreFormulasOrDefinitions: [
        { term: 'LIATE Rule', definition: 'Priority order for choosing u in integration by parts.' }
      ],
      examTips: [
        'Remember the constant of integration (+ C) for indefinite integrals to avoid losing marks.'
      ]
    },
    quiz: [
      {
        id: 'mq1',
        question: 'According to the LIATE rule in MATH 151, which function should be chosen as u when integrating ∫ x ln(x) dx?',
        options: ['ln(x) (Logarithmic)', 'x (Algebraic)', 'Neither', 'Either works equally'],
        correctIndex: 0,
        explanation: 'L (Logarithmic) has higher priority than A (Algebraic) in the LIATE order, so u = ln(x) and dv = x dx.',
        hint: 'L comes before A in LIATE.'
      }
    ],
    flashcards: [
      { id: 'mf1', front: 'What is the derivative of arcsin(x)?', back: '1 / sqrt(1 - x^2)', category: 'Calculus' }
    ],
    comments: [
      {
        id: 'mc1',
        author: 'Kofi Asante',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        hallOrDept: 'Independence Hall',
        date: '4 days ago',
        rating: 5,
        text: 'Best calculus notes on campus. Clean layout and helpful worked examples.',
        likes: 19
      }
    ]
  },
  {
    id: 'doc-phar210-qa',
    title: 'PHAR 210 Autonomic Nervous System & Drug Receptor Kinetics Q&A Study Guide',
    courseCode: 'PHAR 210',
    courseName: 'General Pharmacology & Pharmacokinetics',
    programmeId: 'prog-pharmacy',
    programmeName: 'Pharm D (Doctor of Pharmacy)',
    collegeName: 'College of Health Sciences (CoHS)',
    level: 'Level 200',
    semester: 'Semester 1',
    academicYear: '2025/2026',
    docType: 'Past Questions & Answers (Pasco)',
    author: {
      name: 'Esi Annan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      hall: 'Africa Hall',
      reputation: 97,
      uploadsCount: 15
    },
    rating: 4.96,
    reviewsCount: 98,
    views: 11400,
    downloads: 2450,
    pageCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        title: 'Adrenergic & Cholinergic Receptor Subtypes',
        contentHtml: `
          <div class="doc-sheet">
            <header class="doc-header-banner">
              <span class="doc-badge">KNUST CoHS • PHARM D PHARMACOLOGY COMPANION</span>
              <h1>Autonomic Pharmacology & Receptor Signaling</h1>
              <p class="doc-subtitle">KNUST Faculty of Pharmacy & Pharmaceutical Sciences | Level 200</p>
            </header>
            <section class="doc-section">
              <h2>Question 1 (Past Exam): Receptor Subtypes Distribution</h2>
              <div class="doc-table-wrapper">
                <table class="doc-table">
                  <thead>
                    <tr><th>Receptor</th><th>G-Protein</th><th>Primary Tissue</th><th>Major Physiological Effect</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>&alpha;1</strong></td><td>Gq (IP3 / DAG)</td><td>Vascular smooth muscle</td><td>Vasoconstriction, pupil dilation</td></tr>
                    <tr><td><strong>&alpha;2</strong></td><td>Gi (Decreases cAMP)</td><td>Presynaptic nerve terminal</td><td>Inhibits norepinephrine release</td></tr>
                    <tr><td><strong>&beta;1</strong></td><td>Gs (Increases cAMP)</td><td>Heart (myocardium)</td><td>Increases heart rate and contractility</td></tr>
                    <tr><td><strong>&beta;2</strong></td><td>Gs (Increases cAMP)</td><td>Bronchial smooth muscle</td><td>Bronchodilation, vasodilation</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        `
      },
      {
        pageNumber: 2,
        title: 'Pharmacokinetic Half-Life & Clearance Equations',
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 2: Clearance & Steady State Concentrations</h2>
            <div class="formula-box">
              <code>t_{1/2} = (0.693 &times; V_d) / Cl</code>
            </div>
            <p>Steady state is reached after approximately <strong>4 to 5 half-lives</strong> of continuous drug administration.</p>
          </div>
        `
      },
      {
        pageNumber: 3,
        title: 'Worked Exam Case Studies & Antidotes',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>Exam Clinical Vignettes: Organophosphate Poisoning</h2>
            <p>Treatment protocol: Atropine (blocks muscarinic effects) followed by Pralidoxime (2-PAM to regenerate acetylcholinesterase).</p>
          </div>
        `
      }
    ],
    aiSummary: {
      executiveSummary: 'Covers KNUST Pharm D autonomic pharmacology, receptor G-protein coupling mechanisms, half-life formulas, and organophosphate toxicity management.',
      keyTakeaways: [
        'Beta-1 receptors are predominantly cardiac (increase contractility); Beta-2 receptors are predominantly bronchial (cause dilation).',
        'Steady state plasma concentration is achieved after 4 to 5 elimination half-lives.'
      ],
      coreFormulasOrDefinitions: [
        { term: 'Elimination Half-life', definition: 't1/2 = (0.693 * Vd) / Cl' }
      ],
      examTips: [
        'Know the difference between competitive antagonists (parallel right shift in dose-response) and non-competitive antagonists (decreased Emax).'
      ]
    },
    quiz: [
      {
        id: 'pq1',
        question: 'Which receptor subtype is stimulated by salbutamol to induce bronchodilation during an asthma attack?',
        options: ['Beta-2 Adrenergic Receptor', 'Beta-1 Adrenergic Receptor', 'Alpha-1 Adrenergic Receptor', 'Muscarinic M2 Receptor'],
        correctIndex: 0,
        explanation: 'Salbutamol is a selective Beta-2 agonist that relaxes bronchial smooth muscle via Gs activation and cAMP elevation.',
        hint: 'Beta-2 dilates the airways.'
      }
    ],
    flashcards: [
      { id: 'pf1', front: 'What antidote regenerates acetylcholinesterase in organophosphate poisoning?', back: 'Pralidoxime (2-PAM).', category: 'Toxicology' }
    ],
    comments: [
      {
        id: 'pc1',
        author: 'Benedicta Mensah',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        hallOrDept: 'Faculty of Pharmacy',
        date: '3 days ago',
        rating: 5,
        text: 'The receptor table is a lifesaver for our upcoming pharmacology midsem. Thanks for uploading!',
        likes: 22
      }
    ]
  },
  {
    id: 'doc-csm157-code',
    title: 'CSM 157 C++ Programming Lab Exercises, Quizzes & Past Midterm Solutions',
    courseCode: 'CSM 157',
    courseName: 'Programming and Problem Solving with C++',
    programmeId: 'prog-computer-science',
    programmeName: 'BSc. Computer Science',
    collegeName: 'College of Science (CoS)',
    level: 'Level 100',
    semester: 'Semester 1',
    academicYear: '2025/2026',
    docType: 'Past Questions & Answers (Pasco)',
    author: {
      name: 'Michael Addo',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      hall: 'Republic Hall',
      reputation: 96,
      uploadsCount: 10
    },
    rating: 4.89,
    reviewsCount: 84,
    views: 9800,
    downloads: 2100,
    pageCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        title: 'C++ Pointers, Dynamic Memory & Array Processing',
        contentHtml: `
          <div class="doc-sheet">
            <header class="doc-header-banner">
              <span class="doc-badge">KNUST CoS • CSM 157 PRACTICAL REVISION</span>
              <h1>C++ Problem Solving & Pointer Mechanics</h1>
              <p class="doc-subtitle">KNUST Department of Computer Science | Level 100</p>
            </header>
            <section class="doc-section">
              <h2>Question 1: Dynamic Array Allocation & Pointer Traversal</h2>
              <div class="code-snippet-box">
                <pre><code>#include &lt;iostream&gt;
using namespace std;

int main() {
    int n;
    cout &lt;&lt; "Enter size of KNUST student array: ";
    cin &gt;&gt; n;
    int* scores = new int[n]; // Heap allocation
    
    for(int i = 0; i &lt; n; i++) {
        *(scores + i) = (i + 1) * 10;
    }
    
    // Always free allocated heap memory
    delete[] scores;
    scores = nullptr;
    return 0;
}</code></pre>
              </div>
            </section>
          </div>
        `
      },
      {
        pageNumber: 2,
        title: 'Structs, File I/O & Past Exam Code Traces',
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 2: Student Record Management System Struct</h2>
            <div class="code-snippet-box">
              <pre><code>struct KnustStudent {
    string indexNumber;
    string programme;
    int level;
    double cwa;
};</code></pre>
            </div>
          </div>
        `
      },
      {
        pageNumber: 3,
        title: 'Midterm Practical Exam Questions & Solutions',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>Past Practical Exam Prompts</h2>
          </div>
        `
      }
    ],
    aiSummary: {
      executiveSummary: 'Concise review of C++ memory management, arrays, pointers, struct data models, and recurring KNUST CSM 157 practical lab exam questions.',
      keyTakeaways: [
        'Always delete dynamic heap memory allocated with new to avoid memory leaks.',
        'Array indexing scores[i] is mathematically equivalent to *(scores + i).'
      ],
      coreFormulasOrDefinitions: [
        { term: 'Pointer Dereference (*p)', definition: 'Accesses the value stored at the memory address held by the pointer p.' }
      ],
      examTips: [
        'Double check semicolons after struct definitions (struct MyStruct {};).'
      ]
    },
    quiz: [
      {
        id: 'cq1',
        question: 'What is the correct C++ syntax to deallocate a dynamically allocated array created with `int* arr = new int[10];`?',
        options: ['delete[] arr;', 'delete arr;', 'free(arr);', 'remove(arr);'],
        correctIndex: 0,
        explanation: 'Dynamic arrays allocated with `new[]` must be deallocated using `delete[]` in C++.',
        hint: 'Use the array delete operator with brackets.'
      }
    ],
    flashcards: [
      { id: 'cf1', front: 'What is a Dangling Pointer in C++?', back: 'A pointer pointing to a memory location that has already been deallocated/deleted.', category: 'Memory' }
    ],
    comments: [
      {
        id: 'cc1',
        author: 'Emmanuel Darko',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        hallOrDept: 'Unity Hall (Conti)',
        date: '1 week ago',
        rating: 5,
        text: 'Super helpful pointer code snippets! Prepared me well for the lab test.',
        likes: 15
      }
    ]
  },
  {
    id: 'doc-law101-pasco',
    title: 'LAW 101 Ghana Legal System & Constitutional Precedents Past Questions Compendium',
    courseCode: 'LAW 101',
    courseName: 'Ghana Legal System & Constitutional Law',
    programmeId: 'prog-law',
    programmeName: 'Bachelor of Laws (LL.B)',
    collegeName: 'College of Humanities & Social Sciences (CoHSS)',
    level: 'Level 100',
    semester: 'Semester 1',
    academicYear: '2025/2026',
    docType: 'Past Questions & Answers (Pasco)',
    author: {
      name: 'Akua Serwaa',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      hall: 'Queen Elizabeth II Hall',
      reputation: 99,
      uploadsCount: 20
    },
    rating: 4.97,
    reviewsCount: 112,
    views: 12800,
    downloads: 2980,
    pageCount: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        title: 'Article 11 Hierarchy of Laws in Ghana',
        contentHtml: `
          <div class="doc-sheet">
            <header class="doc-header-banner">
              <span class="doc-badge">KNUST FACULTY OF LAW • LAW 101 PASCO</span>
              <h1>The Laws of Ghana & Sources of Law</h1>
              <p class="doc-subtitle">KNUST Faculty of Law | Level 100 Semester 1</p>
            </header>
            <section class="doc-section">
              <h2>Question 1: The Hierarchy of Laws under Article 11(1)</h2>
              <ol>
                <li><strong>The 1992 Constitution:</strong> The supreme law of the Republic of Ghana (Article 1(2)). Any law inconsistent with it is void to the extent of the inconsistency.</li>
                <li><strong>Enactments made by or under the authority of the Parliament:</strong> Primary statutes and Acts of Parliament.</li>
                <li><strong>Orders, Rules, and Regulations:</strong> Subsidiary or delegated legislation.</li>
                <li><strong>The Existing Law:</strong> Written and unwritten laws operating before the Constitution.</li>
                <li><strong>The Common Law of Ghana:</strong> Comprising the rules of customary law and doctrines of equity.</li>
              </ol>
            </section>
          </div>
        `
      },
      {
        pageNumber: 2,
        title: 'Landmark Precedents: Tuffuor v Attorney-General & Judicial Review',
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 2: Seminal Ghanaian Constitutional Rulings</h2>
            <div class="concept-card">
              <h3>Tuffuor v Attorney-General [1980] GLR 637</h3>
              <p>Established the "Living Constitution" doctrine: The Constitution is a living organism capable of growth and development, to be interpreted as a harmonious whole.</p>
            </div>
          </div>
        `
      },
      {
        pageNumber: 3,
        title: 'Customary Law Ascertainment & Chieftaincy Rulings',
        isLocked: true,
        contentHtml: `
          <div class="doc-sheet">
            <h2>Question 3: Ascertainment of Customary Law under Section 55 of Courts Act</h2>
          </div>
        `
      }
    ],
    aiSummary: {
      executiveSummary: 'Thorough synthesis of KNUST Faculty of Law examination topics including Article 11 sources of law, customary law definitions, and landmark Supreme Court decisions.',
      keyTakeaways: [
        'Article 1(2) of the 1992 Constitution establishes supreme constitutional supremacy over parliamentary sovereignty in Ghana.',
        'Tuffuor v Attorney-General is the bedrock authority for the living constitution approach.'
      ],
      coreFormulasOrDefinitions: [
        { term: 'Article 11(1)', definition: 'The constitutional provision establishing the five-tier hierarchy of the laws of Ghana.' }
      ],
      examTips: [
        'Always cite law report references (e.g. [1980] GLR 637) when discussing landmark Supreme Court precedents.'
      ]
    },
    quiz: [
      {
        id: 'lq1',
        question: 'Under Article 11(1) of the 1992 Constitution of Ghana, what is the supreme source of law in the Republic?',
        options: ['The 1992 Constitution', 'Acts of Parliament', 'Customary Law of Chieftaincy', 'English Common Law'],
        correctIndex: 0,
        explanation: 'Article 1(2) confirms the Constitution is supreme and any law inconsistent with it is void to the extent of inconsistency.',
        hint: 'It sits at the pinnacle of the hierarchy of laws.'
      }
    ],
    flashcards: [
      { id: 'lf1', front: 'What principle did Tuffuor v Attorney-General establish in Ghanaian constitutional jurisprudence?', back: 'The doctrine of the Constitution as a living organism to be interpreted purposively.', category: 'Constitutional Law' }
    ],
    comments: [
      {
        id: 'lc1',
        author: 'Nana Ama Poku',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=150&q=80',
        hallOrDept: 'Faculty of Law',
        date: '5 days ago',
        rating: 5,
        text: 'Exact questions that came in our semester exam! Brilliant case summaries.',
        likes: 27
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Kwame Mensah',
  email: 'kmensah.coe@st.knust.edu.gh',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  studentId: '20849120',
  programme: 'BSc. Computer Engineering',
  college: 'College of Engineering (CoE)',
  level: 'Level 300',
  hall: 'Unity Hall (Conti)',
  credits: 150,
  isPremium: false,
  freeUnlocksLeft: 3,
  uploadedDocs: [],
  followedCourseIds: [],
  studyStreak: 1,
  lastVisitDate: new Date().toISOString().split('T')[0],
  savedStudylists: [
    {
      id: 'list-1',
      name: 'Level 200 Semester 1 Finals Pasco 🎯',
      description: 'Compiled past questions and solutions for COE 251, MATH 151, and CSM 157',
      documentIds: ['doc-coe251-pasco', 'doc-math151-calc'],
      isPrivate: false,
      updatedAt: 'Yesterday'
    },
    {
      id: 'list-2',
      name: 'Algorithm Mastery & Code Snippets 💡',
      description: 'Recursion, BSTs, Heap Construction, and C++ Labs',
      documentIds: ['doc-coe251-pasco', 'doc-csm157-code'],
      isPrivate: true,
      updatedAt: '3 days ago'
    }
  ]
};

