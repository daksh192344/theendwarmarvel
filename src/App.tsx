import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Components
import Lobby from './components/Lobby';
import Battle from './components/Battle';
import Store from './components/Store';
import Profile from './components/Profile';
import Characters from './components/Characters';
import Guide from './components/Guide';
import StoryMode from './components/StoryMode';
import RedeemCode from './components/RedeemCode';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="landscape-container">
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/store" element={<Store />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/story" element={<StoryMode />} />
            <Route path="/redeem" element={<RedeemCode />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 