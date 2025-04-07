import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, Character, Ability, GameState } from '../types';

interface InitializeProfilePayload {
  name: string;
  is8thStudent: boolean;
}

const initialState: GameState = {
  player: {
    id: '',
    name: '',
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
    is8thStudent: false,
    isProfileSet: false
  },
  players: [],
  characters: [
    {
      id: 'thor',
      name: 'Thor',
      health: 1000,
      maxHealth: 1000,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
      cost: 0,
      unlockCost: 0,
      requiredLevel: 1,
      abilities: [
        { 
          id: 'lightning',
          name: 'Lightning Strike',
          damage: 100,
          cooldown: 4,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Call down lightning from the sky'
        },
        {
          id: 'mjolnir',
          name: 'Mjolnir Throw',
          damage: 90,
          cooldown: 3,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Throw Mjolnir at the enemy'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'iron-man',
      name: 'Iron Man',
      health: 900,
      maxHealth: 900,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
      cost: 0,
      unlockCost: 0,
      requiredLevel: 1,
      abilities: [
        { 
          id: 'repulsor',
          name: 'Repulsor Blast',
          damage: 80,
          cooldown: 3,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Fire a powerful energy blast'
        },
        {
          id: 'unibeam',
          name: 'Unibeam',
          damage: 120,
          cooldown: 5,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Fire a massive beam of energy'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'captain-america',
      name: 'Captain America',
      health: 1200,
      maxHealth: 1200,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
      cost: 0,
      unlockCost: 0,
      requiredLevel: 1,
      abilities: [
        {
          id: 'shield-throw',
          name: 'Shield Throw',
          damage: 70,
          cooldown: 4,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Throw shield at enemy'
        },
        {
          id: 'shield-bash',
          name: 'Shield Bash',
          damage: 85,
          cooldown: 3,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Bash enemy with shield'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'groot',
      name: 'Groot',
      health: 1100,
      maxHealth: 1100,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 2,
      abilities: [
        {
          id: 'trap',
          name: 'Root Trap (10s Stun)',
          damage: 0,
          cooldown: 15,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Trap enemy in roots',
          effect: 'stun',
          duration: 10
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'dr-strange',
      name: 'Dr. Strange',
      health: 800,
      maxHealth: 800,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 3,
      abilities: [
        {
          id: 'steal',
          name: 'Ability Theft',
          damage: 0,
          cooldown: 10,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Steal enemy ability',
          effect: 'steal'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'wong',
      name: 'Wong',
      health: 900,
      maxHealth: 900,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 4,
      abilities: [
        {
          id: 'speed',
          name: 'Speed Burst',
          damage: 0,
          cooldown: 10,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Temporarily increase movement speed',
          effect: 'speed-boost',
          duration: 5
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'loki',
      name: 'Loki',
      health: 800,
      maxHealth: 800,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 5,
      abilities: [
        {
          id: 'steal',
          name: 'Ability Theft',
          damage: 0,
          cooldown: 10,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Steal enemy ability',
          effect: 'steal'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'rocket',
      name: 'Rocket',
      health: 700,
      maxHealth: 700,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 6,
      abilities: [
        {
          id: 'rockets',
          name: '50 Rockets Barrage',
          damage: 2500,
          cooldown: 20,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Launch a barrage of rockets',
          hits: 50
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'black-panther',
      name: 'Black Panther',
      health: 900,
      maxHealth: 900,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 7,
      abilities: [
        {
          id: 'speed-boost',
          name: 'Ultimate Warrior',
          damage: 0,
          cooldown: 12,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Increase speed significantly',
          effect: 'speed-boost',
          duration: 5
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'wolverine',
      name: 'Wolverine',
      health: 1000,
      maxHealth: 1000,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 8,
      abilities: [
        {
          id: 'double-claw',
          name: 'Double Claw Strike',
          damage: 100,
          cooldown: 4,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Strike twice with adamantium claws',
          hits: 2
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'deadpool',
      name: 'Deadpool',
      health: 900,
      maxHealth: 900,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 9,
      abilities: [
        {
          id: 'extra-life',
          name: 'Extra Life',
          damage: 0,
          cooldown: 30,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Revive with full health',
          effect: 'revive'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'hulk',
      name: 'Hulk',
      health: 1500,
      maxHealth: 1500,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 10,
      abilities: [
        {
          id: 'rage',
          name: 'Hulk Rage',
          damage: 0,
          cooldown: 15,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Increase strength significantly',
          effect: 'strength-boost',
          duration: 5
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'spider-man',
      name: 'Spider-Man',
      health: 800,
      maxHealth: 800,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 11,
      abilities: [
        {
          id: 'web',
          name: 'Web Freeze',
          damage: 0,
          cooldown: 30,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Immobilize enemy with web',
          effect: 'freeze',
          duration: 3
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'winter-soldier',
      name: 'Winter Soldier',
      health: 850,
      maxHealth: 850,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 12,
      abilities: [
        {
          id: 'punch',
          name: 'Metal Arm Punch',
          damage: 70,
          cooldown: 3,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Powerful punch with metal arm'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'black-widow',
      name: 'Black Widow',
      health: 750,
      maxHealth: 750,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 13,
      abilities: [
        {
          id: 'shock',
          name: 'Widow\'s Bite',
          damage: 200,
          cooldown: 8,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Electric shock that deals damage over time',
          effect: 'dot',
          duration: 5,
          tickDamage: 40
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'hawkeye',
      name: 'Hawkeye',
      health: 700,
      maxHealth: 700,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 14,
      abilities: [
        {
          id: 'combo',
          name: 'Arrow Bomb Combo',
          damage: 170,
          cooldown: 6,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Fire multiple explosive arrows',
          hits: 3
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'makari',
      name: 'Makari',
      health: 750,
      maxHealth: 750,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 15,
      abilities: [
        {
          id: 'speed',
          name: 'Speed Burst',
          damage: 0,
          cooldown: 10,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Temporarily increase movement speed',
          effect: 'speed-boost',
          duration: 5
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'odin',
      name: 'Odin',
      health: 1200,
      maxHealth: 1200,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 16,
      abilities: [
        {
          id: 'jewel',
          name: 'Jewel Strike',
          damage: 175,
          cooldown: 8,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Strike with power of the infinity jewel',
          effect: 'dot',
          duration: 5,
          tickDamage: 5
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'mysterio',
      name: 'Mysterio',
      health: 800,
      maxHealth: 800,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 17,
      abilities: [
        {
          id: 'darkness',
          name: 'Dark Illusion',
          damage: 0,
          cooldown: 12,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Blind enemy with illusions',
          effect: 'blind',
          duration: 5
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'captain-marvel',
      name: 'Captain Marvel',
      health: 1000,
      maxHealth: 1000,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 18,
      abilities: [
        {
          id: 'binary',
          name: 'Binary Punch',
          damage: 300,
          cooldown: 15,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Unleash a devastating punch in binary form'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'star-lord',
      name: 'Star Lord',
      health: 850,
      maxHealth: 850,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: false,
      cost: 0,
      unlockCost: 500,
      requiredLevel: 19,
      abilities: [
        {
          id: 'combo',
          name: 'Element Gun Combo',
          damage: 240,
          cooldown: 8,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Fire multiple elemental shots',
          hits: 4
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'supreme-strange',
      name: 'Supreme Strange',
      health: 1000,
      maxHealth: 1000,
      level: 1,
      experience: 0,
      isPaid: true,
      isUnlocked: false,
      cost: 2000,
      unlockCost: 0,
      requiredLevel: 0,
      abilities: [
        {
          id: 'portal',
          name: 'Portal Strike',
          damage: 100,
          cooldown: 5,
          currentCooldown: 0,
          isUltimate: false,
          description: 'Attack through mystical portals'
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'wakanda-shield',
      name: 'Wakanda Shield',
      health: 1200,
      maxHealth: 1200,
      level: 1,
      experience: 0,
      isPaid: true,
      isUnlocked: false,
      cost: 2500,
      unlockCost: 0,
      requiredLevel: 0,
      abilities: [
        {
          id: 'reflect',
          name: 'Poison Reflect',
          damage: 120,
          cooldown: 10,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Reflect damage with poisonous effect',
          effect: 'dot',
          duration: 3,
          tickDamage: 40
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    },
    {
      id: 'asimx',
      name: 'Asimx',
      health: 900,
      maxHealth: 900,
      level: 1,
      experience: 0,
      isPaid: true,
      isUnlocked: false,
      cost: 3000,
      unlockCost: 0,
      requiredLevel: 0,
      abilities: [
        {
          id: 'steal',
          name: 'Power Steal',
          damage: 0,
          cooldown: 20,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Steal all enemy abilities temporarily',
          effect: 'steal-all',
          duration: 30
        }
      ],
      skins: ['default'],
      currentSkin: 'default'
    }
  ],
  battle: {
    isActive: false,
    currentCharacterIndex: 0,
    playerCharacters: [],
    aiCharacters: [],
    winner: null
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeProfile: (state, action: PayloadAction<InitializeProfilePayload>) => {
      const { name, is8thStudent } = action.payload;
      const newPlayer = {
        ...state.player,
        id: Math.random().toString(36).substr(2, 9),
        name,
        is8thStudent,
        isProfileSet: true
      };
      
      // Update current player
      state.player = newPlayer;
      
      // Add to players list
      state.players.push(newPlayer);
      
      // Give bonus resources to 8th students
      if (is8thStudent) {
        state.player.gems += 500;
        state.player.gold += 1000;
      }
    },
    updatePlayer: (state, action: PayloadAction<Partial<Player>>) => {
      state.player = { ...state.player, ...action.payload };
    },
    unlockCharacter: (state, action: PayloadAction<string>) => {
      const character = state.characters.find((c: Character) => c.id === action.payload);
      if (character) {
        character.isUnlocked = true;
        if (!state.player.characters.includes(action.payload)) {
          state.player.characters.push(action.payload);
        }
      }
    },
    updateCharacter: (state, action: PayloadAction<{ id: string; updates: Partial<Character> }>) => {
      const character = state.characters.find((c: Character) => c.id === action.payload.id);
      if (character) {
        Object.assign(character, action.payload.updates);
      }
    },
    switchCharacter: (state, action: PayloadAction<number>) => {
      if (state.battle) {
        state.battle.currentCharacterIndex = action.payload;
      }
    },
    endBattle: (state) => {
      if (state.battle) {
        const playerCharacters = state.battle.playerCharacters;
        state.battle = {
          isActive: false,
          currentCharacterIndex: 0,
          playerCharacters: [],
          aiCharacters: [],
          winner: null
        };
      }
    },
    damageCharacter: (state, action: PayloadAction<{index: number, damage: number}>) => {
      if (state.battle) {
        const character = state.battle.playerCharacters[action.payload.index];
        if (character) {
          character.health = Math.max(0, character.health - action.payload.damage);
        }
      }
    }
  }
});

export const { initializeProfile, updatePlayer, unlockCharacter, updateCharacter, switchCharacter, endBattle, damageCharacter } = gameSlice.actions;

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 