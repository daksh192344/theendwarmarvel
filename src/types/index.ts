export type Ability = {
  id: string;
  name: string;
  damage: number;
  description: string;
  cooldown: number;
  currentCooldown: number;
  isUltimate: boolean;
  effect?: string;
  duration?: number;
  hits?: number;
  tickDamage?: number;
};

export type Skin = string;

export type Character = {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  level: number;
  experience: number;
  isPaid: boolean;
  isUnlocked: boolean;
  cost: number;
  unlockCost: number;
  requiredLevel: number;
  abilities: Ability[];
  skins: string[];
  currentSkin: string;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  progress?: {
    current: number;
    required: number;
  };
};

export type Player = {
  id: string;
  name: string;
  level: number;
  experience: number;
  characters: string[];
  gems: number;
  gold: number;
  wins: number;
  losses: number;
  achievements: Achievement[];
  coins: number;
  diamonds: number;
  rank: string;
  selectedCharacters: string[];
};

export type BattleState = {
  isActive: boolean;
  currentCharacterIndex: number;
  playerCharacters: Character[];
  aiCharacters: Character[];
  winner: string | null;
};

export type GameState = {
  player: Player;
  characters: Character[];
  battle: BattleState;
}; 