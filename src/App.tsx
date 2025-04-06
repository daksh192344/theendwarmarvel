import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Lobby from './components/Lobby';
import Battle from './components/Battle';
import Characters from './components/Characters';
import Store from './components/Store';
import Guide from './components/Guide';
import Profile from './components/Profile';
import RedeemCode from './components/RedeemCode';
import StoryMode from './components/StoryMode';
import { initializeScaling, cleanupScaling } from './utils/scaling';

const App: React.FC = () => {
  useEffect(() => {
    initializeScaling();
    return () => cleanupScaling();
  }, []);

  return (
    <Provider store={store}>
      <Router>
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
      </Router>
    </Provider>
  );
};

export default App; 