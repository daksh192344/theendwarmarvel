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

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  characters: string[];
  resources: {
    gold: number;
    gems: number;
  };
  wins: number;
  losses: number;
  achievements: Achievement[];
  coins: number;
  diamonds: number;
  rank: string;
  selectedCharacters: string[];
  is8thStudent: boolean;
  isProfileSet: boolean;
}

export interface BattleState {
  selectedCharacters: string[];
  aiCharacters: string[];
  winner: string | null;
}

export interface CurrentBattle {
  player1Character: string;
  player2Character: string;
}

export interface GameState {
  player: Player;
  players: Player[];
  characters: Character[];
  battle: BattleState;
  currentBattle: CurrentBattle | null;
  characterHealth: { [characterId: string]: number };
} 
