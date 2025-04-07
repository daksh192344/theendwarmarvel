import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updatePlayer } from '../store';
import styles from './Battle.module.css';
import VersusScreen from './VersusScreen';
import SoundManager from '../utils/sound/SoundManager';

type Fighter = {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  isBlocking: boolean;
  isStunned: boolean;
};

const Battle: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { player, characters, currentBattle } = useSelector((state: RootState) => state.game);
  
  // States for character selection
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [aiCharacters, setAiCharacters] = useState<string[]>([]);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentFighterIndex, setCurrentFighterIndex] = useState(0);
  const [currentAiFighterIndex, setCurrentAiFighterIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Track whose turn it is
  const [showVersus, setShowVersus] = useState(true);
  const soundManager = SoundManager.getInstance();

  // Get available characters (unlocked for player, non-paid for AI)
  const availableCharacters = characters.filter(c => player.characters.includes(c.id));
  const aiAvailableCharacters = characters.filter(c => !c.isPaid);

  // Battle states
  const [playerFighter, setPlayerFighter] = useState<Fighter | null>(null);
  const [opponentFighter, setOpponentFighter] = useState<Fighter | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // Select AI characters randomly
  useEffect(() => {
    if (selectedCharacters.length === 3 && aiCharacters.length === 0) {
      const shuffled = [...aiAvailableCharacters]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(char => char.id);
      setAiCharacters(shuffled);
    }
  }, [selectedCharacters, aiAvailableCharacters]);

  // Start battle with current fighters
  useEffect(() => {
    if (battleStarted && selectedCharacters.length > 0 && aiCharacters.length > 0) {
      const playerChar = characters.find(c => c.id === selectedCharacters[currentFighterIndex]);
      const aiChar = characters.find(c => c.id === aiCharacters[currentAiFighterIndex]);

      if (playerChar && aiChar) {
        setPlayerFighter({
          id: playerChar.id,
          name: playerChar.name,
          health: playerChar.health,
          maxHealth: playerChar.maxHealth,
          isBlocking: false,
          isStunned: false
        });

        setOpponentFighter({
          id: aiChar.id,
          name: aiChar.name,
          health: aiChar.health,
          maxHealth: aiChar.maxHealth,
          isBlocking: false,
          isStunned: false
        });
      }
    }
  }, [battleStarted, currentFighterIndex, currentAiFighterIndex, selectedCharacters, aiCharacters, characters]);

  const handleCharacterSelect = (characterId: string) => {
    // Check if character is unlocked
    const character = characters.find(c => c.id === characterId);
    if (!character?.isUnlocked) return;

    if (selectedCharacters.includes(characterId)) {
      setSelectedCharacters(prev => prev.filter(id => id !== characterId));
    } else if (selectedCharacters.length < 3) {
      setSelectedCharacters(prev => [...prev, characterId]);
    }
  };

  const startBattle = () => {
    if (selectedCharacters.length === 3) {
      setBattleStarted(true);
      setIsPlayerTurn(true);
      addToBattleLog("Battle starts! It's your turn!");
    }
  };

  const addToBattleLog = (message: string) => {
    setBattleLog(prev => [...prev, message].slice(-5));
  };

  const performAttack = (damage: number, isPlayer: boolean) => {
    if (!playerFighter || !opponentFighter) return;

    if (isPlayer && !opponentFighter.isBlocking) {
      const newHealth = Math.max(0, opponentFighter.health - damage);
      setOpponentFighter(prev => prev ? { ...prev, health: newHealth } : null);
      addToBattleLog(`${playerFighter.name} deals ${damage} damage!`);
      
      if (newHealth === 0) {
        if (currentAiFighterIndex < 2) {
          // Next AI fighter
          setCurrentAiFighterIndex(prev => prev + 1);
          // Get next AI character with their current health (not max health)
          const nextAiChar = characters.find(c => c.id === aiCharacters[currentAiFighterIndex + 1]);
          if (nextAiChar) {
            setOpponentFighter({
              id: nextAiChar.id,
              name: nextAiChar.name,
              health: nextAiChar.health, // Use current health instead of maxHealth
              maxHealth: nextAiChar.maxHealth,
              isBlocking: false,
              isStunned: false
            });
          }
        } else {
          // Player wins
          setGameOver(true);
          setWinner('player');
          dispatch(updatePlayer({ experience: player.experience + 10 }));
        }
      } else {
        setIsPlayerTurn(false);
        addToBattleLog("Opponent's turn!");
      }
    } else if (!isPlayer && !playerFighter.isBlocking) {
      const newHealth = Math.max(0, playerFighter.health - damage);
      setPlayerFighter(prev => prev ? { ...prev, health: newHealth } : null);
      addToBattleLog(`${opponentFighter.name} deals ${damage} damage!`);
      
      if (newHealth === 0) {
        if (currentFighterIndex < 2) {
          // Next player fighter
          setCurrentFighterIndex(prev => prev + 1);
          // Get next player character with their current health (not max health)
          const nextPlayerChar = characters.find(c => c.id === selectedCharacters[currentFighterIndex + 1]);
          if (nextPlayerChar) {
            setPlayerFighter({
              id: nextPlayerChar.id,
              name: nextPlayerChar.name,
              health: nextPlayerChar.health, // Use current health instead of maxHealth
              maxHealth: nextPlayerChar.maxHealth,
              isBlocking: false,
              isStunned: false
            });
          }
        } else {
          // AI wins
          setGameOver(true);
          setWinner('opponent');
        }
      } else {
        setIsPlayerTurn(true);
        addToBattleLog("Your turn!");
      }
    }
  };

  // AI opponent logic
  useEffect(() => {
    if (battleStarted && !gameOver && opponentFighter && !isPlayerTurn) {
      // Add a delay before AI acts to make it more natural
      const aiActionTimeout = setTimeout(() => {
        const actions = ['attack', 'block', 'special'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        switch (randomAction) {
          case 'attack':
            performAttack(50, false);
            break;
          case 'block':
            setOpponentFighter(prev => prev ? { ...prev, isBlocking: true } : null);
            addToBattleLog(`${opponentFighter.name} is blocking!`);
            setTimeout(() => {
              if (!gameOver) {
                setOpponentFighter(prev => prev ? { ...prev, isBlocking: false } : null);
                setIsPlayerTurn(true);
                addToBattleLog("Your turn!");
              }
            }, 2000);
            break;
          case 'special':
            performAttack(100, false);
            break;
        }
      }, 1500); // 1.5 second delay before AI acts

      return () => clearTimeout(aiActionTimeout);
    }
  }, [battleStarted, gameOver, opponentFighter, isPlayerTurn]);

  const handleVersusComplete = () => {
    soundManager.play('battle');
    setShowVersus(false);
  };

  if (showVersus) {
    return (
      <VersusScreen
        player1Character={currentBattle?.player1Character || "Captain America"}
        player2Character={currentBattle?.player2Character || "Iron Man"}
        onAnimationComplete={handleVersusComplete}
      />
    );
  }

  if (!battleStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Battle</h1>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Back
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Select Your Team (3 Characters)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map(character => (
                <div
                  key={character.id}
                  onClick={() => handleCharacterSelect(character.id)}
                  className={`relative w-96 h-96 bg-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                    selectedCharacters.includes(character.id) ? 'ring-4 ring-yellow-500' : ''
                  } ${character.isUnlocked ? '' : 'opacity-50'}`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-4xl font-bold mb-4">{character.name}</h3>
                      <div className="flex items-center mb-4">
                        <span className="material-icons text-3xl mr-2">favorite</span>
                        <span className="text-2xl">{character.health}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {character.abilities.map(ability => (
                        <div key={ability.id} className="bg-gray-700 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-semibold">{ability.name}</span>
                            <span className="text-xl text-yellow-500">
                              {ability.damage ? `${ability.damage} DMG` : 'Special'}
                            </span>
                          </div>
                          <p className="text-xl text-gray-400">{ability.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!character.isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <span className="material-icons text-6xl text-yellow-500">lock</span>
                        <p className="text-2xl mt-4">Unlock this character</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedCharacters.length === 3 && (
            <button
              onClick={startBattle}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-8 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              BATTLE!
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Health Bars and Battle Status - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-95 z-20">
        {playerFighter && opponentFighter && (
          <div className="p-2">
            {/* Player Health */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{playerFighter.name}</span>
                <span className="text-sm">{playerFighter.health}/{playerFighter.maxHealth}</span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 transition-all duration-300"
                  style={{ width: `${(playerFighter.health / playerFighter.maxHealth) * 100}%` }}
                />
              </div>
            </div>

            {/* Opponent Health */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{opponentFighter.name}</span>
                <span className="text-sm">{opponentFighter.health}/{opponentFighter.maxHealth}</span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${(opponentFighter.health / opponentFighter.maxHealth) * 100}%` }}
                />
              </div>
            </div>

            {/* Turn Indicator and Teams */}
            <div className="flex justify-between items-center mt-2">
              {/* Player Team */}
              <div className="flex items-center gap-1">
                {selectedCharacters.map((id, index) => (
                  <div 
                    key={id}
                    className={`w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center
                      ${index === currentFighterIndex ? 'ring-2 ring-yellow-500' : 'opacity-50'}
                    `}
                  >
                    <span className="material-icons text-sm">person</span>
                  </div>
                ))}
              </div>

              {/* Turn Indicator */}
              <div className="text-sm font-bold px-2">
                {isPlayerTurn ? "Your Turn" : "Opponent's Turn"}
              </div>

              {/* AI Team */}
              <div className="flex items-center gap-1">
                {aiCharacters.map((id, index) => (
                  <div 
                    key={id}
                    className={`w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center
                      ${index === currentAiFighterIndex ? 'ring-2 ring-red-500' : 'opacity-50'}
                    `}
                  >
                    <span className="material-icons text-sm">person</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Battle Arena - Adjusted top padding to account for fixed header */}
      <div className={`${styles.arena} pt-28`}>
        <div className={styles.arenaFloor} />

        {/* Player Character */}
        {playerFighter && (
          <div className={`${styles.character} ${styles.characterLeft} 
            ${playerFighter.isBlocking ? styles.blocking : ''}
            ${playerFighter.isStunned ? styles.stunned : ''}`}
          >
            <div className={`${styles.characterModel} ${styles.playerModel}`}>
              <span className="material-icons text-6xl md:text-8xl">person</span>
            </div>
          </div>
        )}

        {/* Opponent Character */}
        {opponentFighter && (
          <div className={`${styles.character} ${styles.characterRight}
            ${opponentFighter.isBlocking ? styles.blocking : ''}
            ${opponentFighter.isStunned ? styles.stunned : ''}`}
          >
            <div className={`${styles.characterModel} ${styles.opponentModel}`}>
              <span className="material-icons text-6xl md:text-8xl">person</span>
            </div>
          </div>
        )}

        {/* Arena Lighting */}
        <div className={styles.arenaLighting} />
      </div>

      {/* Battle Log - Hidden on mobile */}
      <div className="fixed left-2 top-32 w-48 md:w-64 bg-gray-800 bg-opacity-90 rounded-lg p-3 md:p-4 hidden md:block">
        <h3 className="font-bold mb-2 text-sm">Battle Log</h3>
        <div className="space-y-1">
          {battleLog.map((log, index) => (
            <p key={index} className="text-xs text-gray-300">{log}</p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {playerFighter && opponentFighter && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-gray-800 bg-opacity-95">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <button
                onClick={() => performAttack(50, true)}
                disabled={gameOver || !isPlayerTurn || playerFighter.isStunned}
                className="w-full bg-blue-600 px-4 py-3 rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                Attack
              </button>
              <button
                onClick={() => {
                  setPlayerFighter(prev => prev ? { ...prev, isBlocking: true } : null);
                  addToBattleLog(`${playerFighter.name} is blocking!`);
                  setTimeout(() => {
                    if (!gameOver) {
                      setPlayerFighter(prev => prev ? { ...prev, isBlocking: false } : null);
                      setIsPlayerTurn(false);
                      addToBattleLog("Opponent's turn!");
                    }
                  }, 2000);
                }}
                disabled={gameOver || !isPlayerTurn || playerFighter.isStunned}
                className="w-full bg-green-600 px-4 py-3 rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-50"
              >
                Block
              </button>
            </div>

            <div className="space-y-2">
              {characters.find(c => c.id === selectedCharacters[currentFighterIndex])?.abilities.map((ability) => (
                <button
                  key={ability.id}
                  onClick={() => performAttack(ability.damage, true)}
                  disabled={gameOver || !isPlayerTurn || playerFighter.isStunned}
                  className="w-full bg-purple-600 px-4 py-3 rounded-lg text-sm font-bold hover:bg-purple-700 disabled:opacity-50"
                >
                  {ability.name}
                </button>
              ))}
              <button
                onClick={() => navigate('/')}
                className="w-full bg-red-600 px-4 py-3 rounded-lg text-sm font-bold hover:bg-red-700"
              >
                Surrender
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">
              {winner === 'player' ? 'Victory!' : 'Defeat!'}
            </h2>
            <p className="mb-6 text-sm">
              {winner === 'player' 
                ? 'Congratulations! You won the battle!' 
                : 'Better luck next time!'}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700"
              >
                Fight Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-600 px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-700"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Battle; 