import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TypographyAnimation from './TypographyAnimation';
import LandingPage from './LandingPage';
import CompetitionsPage from './CompetitionsPage';

const INTRO_KEY = 'portfolioIntroDone';

function getPage() {
  const hash = window.location.hash;
  if (hash === '#/competitions') return 'competitions';
  return 'home';
}

function App() {
  const [showLanding, setShowLanding] = useState(() => {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  });
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, '1');
    setShowLanding(true);
  };

  if (page === 'competitions') {
    return <CompetitionsPage />;
  }

  return (
    <AnimatePresence mode="wait">
      {!showLanding ? (
        <TypographyAnimation key="intro" onComplete={handleIntroComplete} />
      ) : (
        <LandingPage key="landing" />
      )}
    </AnimatePresence>
  );
}

export default App;
