import React from 'react';
import { motion } from 'framer-motion';
import { getCharacterImage } from '../utils/characterImages';

interface VersusScreenProps {
  player1Character: string;
  player2Character: string;
  onAnimationComplete?: () => void;
}

const VersusScreen: React.FC<VersusScreenProps> = ({
  player1Character,
  player2Character,
  onAnimationComplete
}) => {
  const player1Image = getCharacterImage(player1Character);
  const player2Image = getCharacterImage(player2Character);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-between px-20">
        {/* Player 1 (Left Side) */}
        <motion.div
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-1/3 aspect-square relative"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-2xl overflow-hidden shadow-2xl">
            {player1Image && (
              <img
                src={player1Image.imageUrl}
                alt={player1Image.altText}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-4xl font-bold text-white text-center">{player1Character}</h2>
          </div>
        </motion.div>

        {/* VS Text */}
        <motion.div
          initial={{ scale: 5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-9xl font-extrabold text-white stroke-black">VS</h1>
        </motion.div>

        {/* Player 2 (Right Side) */}
        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={onAnimationComplete}
          className="w-1/3 aspect-square relative"
        >
          <div className="absolute inset-0 bg-red-600 rounded-2xl overflow-hidden shadow-2xl">
            {player2Image && (
              <img
                src={player2Image.imageUrl}
                alt={player2Image.altText}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-4xl font-bold text-white text-center">{player2Character}</h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VersusScreen; 