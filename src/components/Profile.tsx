import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const { player } = useSelector((state: RootState) => state.game);

  return (
    <div className="relative w-full h-full bg-gray-900 text-white overflow-hidden">
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
      </div>

      {/* Scrollable Main Content */}
      <div className="ml-64 h-full overflow-y-auto">
        <div className="p-12">
          <div className="mb-12">
            <h2 className="text-6xl font-bold mb-6">Profile</h2>
            <p className="text-3xl text-gray-400">Player Stats & Achievements</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-4xl font-bold mb-8">Stats</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Level</span>
                  <span className="text-2xl font-bold">{player.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Experience</span>
                  <span className="text-2xl font-bold">{player.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Wins</span>
                  <span className="text-2xl font-bold">{player.wins}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Losses</span>
                  <span className="text-2xl font-bold">{player.losses}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-4xl font-bold mb-8">Currency</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Gems</span>
                  <span className="text-2xl font-bold">💎 {player.gems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Gold</span>
                  <span className="text-2xl font-bold">🪙 {player.gold}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-gray-800 rounded-2xl p-8">
            <h3 className="text-4xl font-bold mb-8">Achievements</h3>
            <div className="grid grid-cols-2 gap-8">
              {player.achievements.map(achievement => (
                <div key={achievement.id} className="bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold">{achievement.name}</span>
                    <span className="material-icons text-3xl text-yellow-500">
                      {achievement.completed ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <p className="text-xl text-gray-400">{achievement.description}</p>
                  {achievement.progress && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xl mb-2">
                        <span>Progress</span>
                        <span>{achievement.progress.current}/{achievement.progress.required}</span>
                      </div>
                      <div className="h-4 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 transition-all duration-300"
                          style={{ width: `${(achievement.progress.current / achievement.progress.required) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 