export type Ability = {
  id: string;
  name: string;
  damage: number;
  cooldown: number;
  currentCooldown: number;
  isUltimate: boolean;
  description: string;
  duration?: number;
  speedMultiplier?: number;
  strengthMultiplier?: number;
  effect?: 'stun' | 'steal' | 'speed-boost' | 'strength-boost' | 'freeze' | 'blind' | 'dot' | 'revive' | 'steal-all';
  hits?: number;
  uses?: number;
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
  requiredLevel?: number;
  abilities: Ability[];
  skins: Skin[];
  currentSkin: Skin;
};

export type Player = {
  id: string;
  name: string;
  coins: number;
  diamonds: number;
  rank: string;
  experience: number;
  level: number;
  characters: string[];
  selectedCharacters: string[];
};

export type BattleState = {
  mode: 'ranked' | 'casual' | 'tournament';
  players: string[];
  status: 'waiting' | 'in-progress' | 'completed';
  winner?: string;
};

export type GameState = {
  player: Player;
  characters: Character[];
  battleState: BattleState | null;
}; 