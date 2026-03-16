import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TypographyAnimation from './TypographyAnimation';
import LandingPage from './LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showLanding ? (
        <TypographyAnimation key="intro" onComplete={() => setShowLanding(true)} />
      ) : (
        <LandingPage key="landing" />
      )}
    </AnimatePresence>
  );
}

export default App;
