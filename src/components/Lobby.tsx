import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const { player } = useSelector((state: RootState) => state.game);

  return (
    <div className="relative w-full h-full bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 flex flex-col items-center py-8 space-y-12">
        <div className="flex flex-col items-center">
          <img 
            src="/profile-placeholder.png" 
            alt="Profile" 
            className="w-48 h-48 rounded-full bg-gray-700"
          />
          <span className="text-2xl mt-4">Lv.{player.level}</span>
        </div>

        <button
          onClick={() => navigate('/store')}
          className="w-56 h-56 bg-gray-700 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-600 transition-all duration-200"
        >
          <span className="material-icons text-7xl">store</span>
          <span className="text-2xl mt-4">Store</span>
        </button>

        <button
          onClick={() => navigate('/characters')}
          className="w-56 h-56 bg-gray-700 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-600 transition-all duration-200"
        >
          <span className="material-icons text-7xl">groups</span>
          <span className="text-2xl mt-4">Characters</span>
        </button>

        <button
          onClick={() => navigate('/guide')}
          className="w-56 h-56 bg-gray-700 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-600 transition-all duration-200"
        >
          <span className="material-icons text-7xl">help</span>
          <span className="text-2xl mt-4">Guide</span>
        </button>

        <button 
          onClick={() => navigate('/story')}
          className="w-56 h-56 bg-gray-700 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-600"
        >
          <span className="material-icons text-7xl">auto_stories</span>
          <span className="text-2xl mt-4">Story</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 p-12">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-8">
            <div className="bg-gray-800 px-12 py-6 rounded-xl flex items-center">
              <span className="material-icons text-yellow-500 text-5xl mr-4">monetization_on</span>
              <span className="text-3xl">{player.coins}</span>
            </div>
            <div className="bg-gray-800 px-12 py-6 rounded-xl flex items-center">
              <span className="material-icons text-blue-500 text-5xl mr-4">diamond</span>
              <span className="text-3xl">{player.diamonds}</span>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate('/redeem')}
              className="bg-purple-600 px-12 py-6 rounded-xl hover:bg-purple-700 transition-colors duration-200 text-2xl"
            >
              Redeem Code
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="bg-gray-700 px-12 py-6 rounded-xl hover:bg-gray-600 transition-colors duration-200 text-2xl"
            >
              Profile
            </button>
          </div>
        </div>

        {/* Character Display */}
        <div className="relative h-[900px] bg-gray-800 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Character model would go here */}
            <div className="text-8xl text-gray-600">Character Model</div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-gray-900">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-6xl font-bold mb-4">Battle Royale</h2>
                <p className="text-gray-400 text-3xl">Choose your character and join the fight!</p>
              </div>
              {/* Start Button - Right side */}
              <button
                onClick={() => navigate('/battle')}
                className="w-64 h-64 bg-yellow-500 text-black rounded-2xl flex flex-col items-center justify-center hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 font-bold shadow-xl"
              >
                <span className="material-icons text-8xl">play_arrow</span>
                <span className="text-3xl mt-4">Start</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby; 