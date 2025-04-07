import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import Lobby from './components/Lobby';
import Battle from './components/Battle';
import Characters from './components/Characters';
import Store from './components/Store';
import Guide from './components/Guide';
import Profile from './components/Profile';
import RedeemCode from './components/RedeemCode';
import StoryMode from './components/StoryMode';
import LoadingScreen from './components/LoadingScreen';
import { initializeScaling, cleanupScaling } from './utils/scaling';
import { RootState } from './store';

const AppContent: React.FC = () => {
  const { isProfileSet } = useSelector((state: RootState) => state.game.player);
  const existingUsernames = useSelector((state: RootState) => 
    state.game.players?.map(p => p.name) || []
  );

  useEffect(() => {
    initializeScaling();
    return () => cleanupScaling();
  }, []);

  if (!isProfileSet) {
    return (
      <LoadingScreen
        onComplete={() => {}}
        existingUsernames={existingUsernames}
      />
    );
  }

  return (
    <div className="scale-container">
      <div className="w-[2556px] h-[1179px] relative bg-gray-900">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/store" element={<Store />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/redeem" element={<RedeemCode />} />
          <Route path="/story" element={<StoryMode />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App; 
