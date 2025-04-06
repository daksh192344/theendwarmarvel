export interface PlayerData {
  id: string;
  name: string;
  ip: string;
  level: number;
  experience: number;
  characters: string[];
  gems: number;
  gold: number;
  wins: number;
  losses: number;
  achievements: string[];
  coins: number;
  diamonds: number;
  rank: string;
  selectedCharacters: string[];
  lastLogin: Date;
  createdAt: Date;
  usedCodes: string[];
}

export const players: PlayerData[] = [
  {
    id: '1',
    name: 'Player',
    ip: '127.0.0.1',
    level: 1,
    experience: 0,
    characters: ['thor', 'iron-man', 'captain-america'],
    gems: 1000,
    gold: 1000,
    wins: 0,
    losses: 0,
    achievements: [],
    coins: 0,
    diamonds: 0,
    rank: 'Bronze',
    selectedCharacters: [],
    lastLogin: new Date(),
    createdAt: new Date(),
    usedCodes: []
  }
];

// Helper function to add a new player
export const addPlayer = (player: Omit<PlayerData, 'id' | 'createdAt' | 'lastLogin' | 'usedCodes'>): PlayerData => {
  const newPlayer: PlayerData = {
    ...player,
    id: (players.length + 1).toString(),
    createdAt: new Date(),
    lastLogin: new Date(),
    usedCodes: []
  };
  players.push(newPlayer);
  return newPlayer;
};

// Helper function to update player data
export const updatePlayer = (id: string, updates: Partial<PlayerData>): PlayerData | null => {
  const playerIndex = players.findIndex(p => p.id === id);
  if (playerIndex === -1) return null;
  
  players[playerIndex] = {
    ...players[playerIndex],
    ...updates,
    lastLogin: new Date()
  };
  
  return players[playerIndex];
};

// Helper function to get player by IP
export const getPlayerByIP = (ip: string): PlayerData | null => {
  return players.find(p => p.ip === ip) || null;
};

// Helper function to add used code
export const addUsedCode = (playerId: string, code: string): boolean => {
  const player = players.find(p => p.id === playerId);
  if (!player) return false;
  
  if (!player.usedCodes.includes(code)) {
    player.usedCodes.push(code);
    return true;
  }
  
  return false;
}; 