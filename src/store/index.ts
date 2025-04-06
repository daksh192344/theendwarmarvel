import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, Character, Ability, GameState } from '../types';

const initialState: GameState = {
  player: {
    id: '1',
    name: 'Player',
    level: 1,
    experience: 0,
    characters: ['iron-man', 'thor', 'captain-america', 'hulk', 'black-widow', 'hawkeye'], // Starting characters
    selectedCharacters: [],
    coins: 0,
    diamonds: 0,
    rank: 'Bronze'
  },
  characters: [
    {
      id: 'iron-man',
      name: 'Iron Man',
      health: 1000,
      maxHealth: 1000,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
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
      id: 'thor',
      name: 'Thor',
      health: 1200,
      maxHealth: 1200,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
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
      id: 'captain-america',
      name: 'Captain America',
      health: 900,
      maxHealth: 900,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
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
      isUnlocked: true,
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
      id: 'loki',
      name: 'Loki',
      health: 800,
      maxHealth: 800,
      level: 1,
      experience: 0,
      isPaid: false,
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
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
      isUnlocked: true,
      abilities: [
        {
          id: 'punch',
          name: 'Binary Punch',
          damage: 250,
          cooldown: 15,
          currentCooldown: 0,
          isUltimate: true,
          description: 'Unleash a devastating punch in binary form',
          uses: 1
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
      isUnlocked: true,
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
  battleState: null
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
    }
  }
});

export const { updatePlayer, unlockCharacter, updateCharacter } = gameSlice.actions;

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 