import { useState, useEffect } from 'react';
import { useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { UploadModal } from './components/UploadModal';
import { AddCourseModal } from './components/AddCourseModal';
import { PremiumModal } from './components/PremiumModal';

import { HomeView } from './views/HomeView';
import { ProgrammeView } from './views/ProgrammeView';
import { CourseView } from './views/CourseView';
import { DocumentView } from './views/DocumentView';
import { StudylistsView } from './views/StudylistsView';
import { UploadsDashboardView } from './views/UploadsDashboardView';
import { LeaderboardView } from './views/LeaderboardView';

import {
  KNUST_COLLEGES,
  KNUST_PROGRAMMES,
  INITIAL_COURSES,
  INITIAL_DOCUMENTS,
  INITIAL_USER
} from './data/mockData';
import type {
  KnustProgramme,
  Course,
  StudyDocument,
  UserProfile
} from './types';

export function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'programme' | 'course' | 'document' | 'studylists' | 'uploads' | 'leaderboard'
  >('home');

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('relay-dark-mode') === 'true';
  });

  const [colleges] = useState(KNUST_COLLEGES);
  const [programmes, setProgrammes] = useState<KnustProgramme[]>(KNUST_PROGRAMMES);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [documents, setDocuments] = useState<StudyDocument[]>(INITIAL_DOCUMENTS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  const [selectedProgramme, setSelectedProgramme] = useState<KnustProgramme | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<StudyDocument | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  const [addCourseInitialProgId, setAddCourseInitialProgId] = useState<string | undefined>();
  const [uploadInitialCourseId, setUploadInitialCourseId] = useState<string | undefined>();

  // Toast notifications
  const { showToast } = useToast();

  // Apply / remove dark mode class on html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('relay-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Study streak — update on each app load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setUser((prev) => {
      if (prev.lastVisitDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = prev.lastVisitDate === yesterday ? prev.studyStreak + 1 : 1;
      return { ...prev, studyStreak: newStreak, lastVisitDate: today };
    });
  }, []);

  // Global shortcut Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSelectProgramme = (prog: KnustProgramme) => {
    setSelectedProgramme(prog);
    setCurrentView('programme');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDocument = (doc: StudyDocument) => {
    setSelectedDocument(doc);
    setCurrentView('document');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAddCourse = (progId?: string) => {
    setAddCourseInitialProgId(progId);
    setIsAddCourseOpen(true);
  };

  const handleCourseAdded = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);

    // Update programme course count
    setProgrammes((prev) =>
      prev.map((p) =>
        p.id === newCourse.programmeId
          ? { ...p, coursesCount: p.coursesCount + 1 }
          : p
      )
    );

    showToast({
      type: 'success',
      title: '✅ Course Added Successfully',
      message: `${newCourse.code} – ${newCourse.name} is now available for uploads.`,
      duration: 4000,
    });
  };

  const handleOpenUploadForCourse = (course: Course) => {
    setUploadInitialCourseId(course.id);
    setIsUploadOpen(true);
  };


  const handleUploadSuccess = (newDoc: StudyDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);

    // Update user stats
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + 50,
      freeUnlocksLeft: prev.freeUnlocksLeft + 1,
      uploadedDocs: [newDoc, ...prev.uploadedDocs]
    }));

    // Increment document count on course & programme
    setCourses((prev) =>
      prev.map((c) =>
        c.code.toLowerCase() === newDoc.courseCode.toLowerCase()
          ? { ...c, documentsCount: c.documentsCount + 1 }
          : c
      )
    );

    setProgrammes((prev) =>
      prev.map((p) =>
        p.id === newDoc.programmeId
          ? { ...p, documentsCount: p.documentsCount + 1 }
          : p
      )
    );

    showToast({
      type: 'success',
      title: '🎉 Upload Successful! +50 Tek Credits',
      message: `"${newDoc.title.slice(0, 60)}${newDoc.title.length > 60 ? '...' : ''}" is now live and earning you credits!`,
      duration: 5000,
    });
  };

  const handleUnlockWithCredits = (_docId: string) => {
    setUser((prev) => ({
      ...prev,
      credits: Math.max(0, prev.credits - 50)
    }));
  };

  const handleTogglePremium = () => {
    setUser((prev) => ({
      ...prev,
      isPremium: !prev.isPremium
    }));
  };

  // Studylist helper
  const savedDocIds = user.savedStudylists.flatMap((list) => list.documentIds);

  const handleToggleSaveStudylist = (doc: StudyDocument) => {
    let willBeSaved = false;
    setUser((prev) => {
      const defaultList = prev.savedStudylists[0];
      if (!defaultList) return prev;

      const isAlreadySaved = defaultList.documentIds.includes(doc.id);
      willBeSaved = !isAlreadySaved;
      const updatedDocIds = isAlreadySaved
        ? defaultList.documentIds.filter((id) => id !== doc.id)
        : [...defaultList.documentIds, doc.id];

      const updatedLists = prev.savedStudylists.map((list) =>
        list.id === defaultList.id ? { ...list, documentIds: updatedDocIds } : list
      );

      return { ...prev, savedStudylists: updatedLists };
    });

    // Show toast after state update
    setTimeout(() => {
      if (willBeSaved) {
        showToast({
          type: 'info',
          title: '📚 Saved to Studylist',
          message: `"${doc.title.slice(0, 50)}${doc.title.length > 50 ? '...' : ''}" added to your default studylist.`,
          duration: 3000,
        });
      } else {
        showToast({
          type: 'warning',
          title: 'Removed from Studylist',
          message: `"${doc.title.slice(0, 50)}${doc.title.length > 50 ? '...' : ''}" was removed.`,
          duration: 2500,
        });
      }
    }, 0);
  };

  const handleCreateStudylist = (name: string, description: string, isPrivate: boolean) => {
    const newList = {
      id: `list-${Date.now()}`,
      name,
      description,
      documentIds: [],
      isPrivate,
      updatedAt: 'Just now'
    };
    setUser((prev) => ({
      ...prev,
      savedStudylists: [newList, ...prev.savedStudylists]
    }));
  };

  const handleRemoveDocFromStudylist = (listId: string, docId: string) => {
    setUser((prev) => ({
      ...prev,
      savedStudylists: prev.savedStudylists.map((list) =>
        list.id === listId
          ? { ...list, documentIds: list.documentIds.filter((id) => id !== docId) }
          : list
      )
    }));
  };

  // Course follow / watchlist
  const handleToggleFollowCourse = (courseId: string) => {
    setUser((prev) => {
      const isFollowing = prev.followedCourseIds.includes(courseId);
      const followedCourseIds = isFollowing
        ? prev.followedCourseIds.filter((id) => id !== courseId)
        : [...prev.followedCourseIds, courseId];
      return { ...prev, followedCourseIds };
    });
    const course = courses.find((c) => c.id === courseId);
    const isNowFollowing = !user.followedCourseIds.includes(courseId);
    showToast({
      type: isNowFollowing ? 'success' : 'info',
      title: isNowFollowing ? `📌 Following ${course?.code}` : `Unfollowed ${course?.code}`,
      message: isNowFollowing
        ? `You'll be notified when new materials are added to ${course?.name}.`
        : `Removed from your watchlist.`,
      duration: 3000,
    });
  };

  return (
    <div className="app-container">
      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view: any) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenUpload={() => {
          setUploadInitialCourseId(undefined);
          setIsUploadOpen(true);
        }}
        onOpenPremium={() => setIsPremiumOpen(true)}
        user={user}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        followedCount={user.followedCourseIds.length}
      />

      {/* Main Content Router */}
      <div className="main-content">
        {currentView === 'home' && (
          <HomeView
            colleges={colleges}
            programmes={programmes}
            courses={courses}
            documents={documents}
            onSelectDocument={handleSelectDocument}
            onSelectProgramme={handleSelectProgramme}
            onSelectCourse={handleSelectCourse}
            onOpenUpload={() => {
              setUploadInitialCourseId(undefined);
              setIsUploadOpen(true);
            }}
            onOpenAddCourse={handleOpenAddCourse}
            onOpenSearch={() => setIsSearchOpen(true)}
            onSaveToStudylist={(doc, e) => {
              e.stopPropagation();
              handleToggleSaveStudylist(doc);
            }}
            savedDocIds={savedDocIds}
          />
        )}

        {currentView === 'programme' && selectedProgramme && (
          <ProgrammeView
            programme={selectedProgramme}
            courses={courses}
            onBack={() => setCurrentView('home')}
            onSelectCourse={handleSelectCourse}
            onOpenAddCourse={handleOpenAddCourse}
            onOpenUploadForCourse={handleOpenUploadForCourse}
          />
        )}

        {currentView === 'course' && selectedCourse && (
          <CourseView
            course={selectedCourse}
            documents={documents}
            isFollowing={user.followedCourseIds.includes(selectedCourse.id)}
            onToggleFollow={() => handleToggleFollowCourse(selectedCourse.id)}
            onBack={() => {
              if (selectedProgramme) {
                setCurrentView('programme');
              } else {
                setCurrentView('home');
              }
            }}
            onSelectDocument={handleSelectDocument}
            onOpenUpload={() => handleOpenUploadForCourse(selectedCourse)}
            onSaveToStudylist={(doc, e) => {
              e.stopPropagation();
              handleToggleSaveStudylist(doc);
            }}
            savedDocIds={savedDocIds}
          />
        )}

        {currentView === 'document' && selectedDocument && (
          <DocumentView
            document={selectedDocument}
            user={user}
            onBack={() => {
              if (selectedCourse) {
                setCurrentView('course');
              } else {
                setCurrentView('home');
              }
            }}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenPremium={() => setIsPremiumOpen(true)}
            onUnlockWithCredits={handleUnlockWithCredits}
            onToggleSaveStudylist={handleToggleSaveStudylist}
            isSaved={savedDocIds.includes(selectedDocument.id)}
          />
        )}

        {currentView === 'studylists' && (
          <StudylistsView
            user={user}
            documents={documents}
            onSelectDocument={handleSelectDocument}
            onCreateStudylist={handleCreateStudylist}
            onRemoveDocFromStudylist={handleRemoveDocFromStudylist}
          />
        )}

        {currentView === 'uploads' && (
          <UploadsDashboardView
            user={user}
            onSelectDocument={handleSelectDocument}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenPremium={() => setIsPremiumOpen(true)}
          />
        )}

        {currentView === 'leaderboard' && (
          <LeaderboardView
            onBack={() => setCurrentView('home')}
            onOpenUpload={() => {
              setUploadInitialCourseId(undefined);
              setIsUploadOpen(true);
            }}
          />
        )}
      </div>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        courses={courses}
        programmes={programmes}
        onSelectDocument={handleSelectDocument}
        onSelectCourse={handleSelectCourse}
        onSelectProgramme={handleSelectProgramme}
      />

      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        programmes={programmes}
        initialProgrammeId={addCourseInitialProgId}
        onCourseAdded={handleCourseAdded}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        programmes={programmes}
        courses={courses}
        initialCourseId={uploadInitialCourseId}
        onOpenAddCourse={(progId) => {
          setIsUploadOpen(false);
          handleOpenAddCourse(progId);
        }}
        onUploadSuccess={handleUploadSuccess}
      />

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        isPremium={user.isPremium}
        onTogglePremium={handleTogglePremium}
      />

      {/* Global Footer (shown on non-fullscreen-reader views) */}
      {currentView !== 'document' && <Footer />}
    </div>
  );
}

export default App;
