import { configureStore, createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Player, Character, Ability, GameState, BattleState, CurrentBattle } from '../types';

interface InitializeProfilePayload {
  name: string;
  is8thStudent: boolean;
}

// Create actions
export const updateCharacterHealth = createAction<{
  characterId: string;
  health: number;
}>('game/updateCharacterHealth');

const initialState: GameState = {
  player: {
    name: '',
    level: 1,
    experience: 0,
    characters: [],
    resources: {
      gold: 0,
      gems: 0
    }
  },
  players: [],
  characters: [],
  battle: {
    selectedCharacters: [],
    aiCharacters: [],
    winner: null
  },
  currentBattle: null,
  characterHealth: {}
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
    },
    [updateCharacterHealth.type]: (state, action: PayloadAction<{ characterId: string; health: number }>) => {
      state.characterHealth[action.payload.characterId] = action.payload.health;
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

export const updateCharacterHealth = createAction<{
  characterId: string;
  health: number;
}>('game/updateCharacterHealth'); 
