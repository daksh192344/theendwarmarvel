import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updatePlayer } from '../store';
import { getCharacterById } from '../data/characters';
import { getCharacterImage } from '../utils/characterImages';
import { motion } from 'framer-motion';

type Message = {
  type: 'success' | 'error';
  text: string;
};

const RedeemCode: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { player, characters } = useSelector((state: RootState) => state.game);
  const [redeemCode, setRedeemCode] = useState('');
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
    const characterId = redeemCodes[redeemCode.toUpperCase()];

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
    setRedeemCode('');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
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

      {/* Redeem Code Section */}
      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">Enter Code</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            placeholder="Enter your redeem code"
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRedeem}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Redeem
          </button>
        </div>
      </div>

      {/* Available Characters Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Available Characters</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {characters.map((character) => {
            const characterImage = getCharacterImage(character.name);
            return (
              <motion.div
                key={character.id}
                variants={item}
                className={`bg-gray-800 rounded-xl overflow-hidden transform transition-transform hover:scale-105 ${
                  character.isUnlocked ? 'border-2 border-green-500' : 'border-2 border-gray-700'
                }`}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  {characterImage && (
                    <img
                      src={characterImage.imageUrl}
                      alt={characterImage.altText}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{character.name}</h3>
                    <div className="flex items-center">
                      {character.isUnlocked ? (
                        <span className="text-green-500 text-sm font-semibold flex items-center">
                          <span className="material-icons text-base mr-1">check_circle</span>
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm font-semibold flex items-center">
                          <span className="material-icons text-base mr-1">lock</span>
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <span className="material-icons text-base mr-1">favorite</span>
                    HP: {character.health}
                  </div>
                  {!character.isUnlocked && (
                    <div className="mt-2 text-sm">
                      {character.isPaid ? (
                        <span className="text-yellow-500">
                          Premium: {character.cost} 💎
                        </span>
                      ) : (
                        <span className="text-blue-400">
                          Unlock at Level {character.requiredLevel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
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
  );
};

export default RedeemCode; 