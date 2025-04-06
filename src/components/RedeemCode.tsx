import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updatePlayer } from '../store';
import { getCharacterById } from '../data/characters';

type Message = {
  type: 'success' | 'error';
  text: string;
};

const RedeemCode: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.game);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<Message | null>(null);

  // Example redeem codes for characters
  const redeemCodes: { [key: string]: string } = {
    'THOR2024': 'thor',
    'IRONMAN': 'iron-man',
    'CAPSHIELD': 'captain-america',
    'STRANGE': 'dr-strange',
    'WONG123': 'wong',
    // Add more codes as needed
  };

  const handleRedeem = () => {
    const characterId = redeemCodes[code.toUpperCase()];

    if (!characterId) {
      setMessage({
        type: 'error',
        text: 'Invalid redeem code',
      });
      return;
    }

    // Check if character is already unlocked
    const hasCharacter = player.characters.includes(characterId);

    if (hasCharacter) {
      setMessage({
        type: 'error',
        text: 'You already have this character',
      });
      return;
    }

    // Get character details
    const character = getCharacterById(characterId);

    if (!character) {
      setMessage({
        type: 'error',
        text: 'Character not found',
      });
      return;
    }

    // Add character to player's collection
    dispatch(updatePlayer({
      characters: [...player.characters, characterId]
    }));

    setMessage({
      type: 'success',
      text: `Successfully unlocked ${character.name}!`,
    });

    // Reset code input
    setCode('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 hover:text-gray-300"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold">Redeem Code</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Enter Code</label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your redeem code"
              />
              <button
                onClick={handleRedeem}
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Redeem
              </button>
            </div>
          </div>

          {message && (
            <div 
              className={`p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-800' : 'bg-red-800'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        {/* Available Characters */}
        <div>
          <h2 className="text-xl font-bold mb-4">Available Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.values(redeemCodes).map((characterId) => {
              const character = getCharacterById(characterId);
              if (!character) return null;
              
              return (
                <div 
                  key={characterId}
                  className={`p-4 rounded-lg ${
                    player.characters.includes(characterId)
                      ? 'bg-green-800'
                      : 'bg-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="material-icons mr-2">person</span>
                    <div>
                      <div className="font-bold">{character.name}</div>
                      <div className="text-sm text-gray-400">
                        {player.characters.includes(characterId)
                          ? 'Unlocked'
                          : 'Locked'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemCode; 