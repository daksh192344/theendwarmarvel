import { Character } from '../types';

export const characters: Character[] = [
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
        id: 'superbeam',
        name: 'Superbeam',
        damage: 100,
        cooldown: 10,
        currentCooldown: 0,
        isUltimate: false,
        description: 'Unleash a powerful beam attack',
      },
      {
        id: 'stormbreaker-shield',
        name: 'Stormbreaker Shield',
        damage: 15,
        duration: 15,
        cooldown: 20,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Create a shield that deals damage over time',
      },
    ],
    skins: ['default', 'endgame'],
    currentSkin: 'default',
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
        id: 'sacrifice',
        name: 'Ultimate Sacrifice',
        damage: 0,
        cooldown: 0,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Revive one teammate by sacrificing yourself',
      },
    ],
    skins: ['default', 'mark-85'],
    currentSkin: 'default',
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
        id: 'extra-life',
        name: 'Extra Life',
        damage: 0,
        cooldown: 0,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Gain one extra life',
      },
    ],
    skins: ['default', 'stealth'],
    currentSkin: 'default',
  },
  // Locked characters
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
        id: 'time-reverse',
        name: 'Time Reverse',
        damage: 0,
        cooldown: 30,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Reverse last 3 enemy moves',
      },
    ],
    skins: ['default'],
    currentSkin: 'default',
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
        id: 'position-swap',
        name: 'Position Swap',
        damage: 0,
        cooldown: 0,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Swap position with opponent (1-time use)'
      }
    ],
    skins: ['default'],
    currentSkin: 'default'
  },
  // Add more characters with increasing level requirements...
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
        id: 'portal-strike',
        name: 'Portal Strike',
        damage: 100,
        cooldown: 8,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Strike through portals dealing massive damage'
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
    id: 'groot',
    name: 'Groot',
    health: 1100,
    maxHealth: 1100,
    level: 1,
    experience: 0,
    isPaid: false,
    isUnlocked: false,
    cost: 0,
    unlockCost: 0,
    requiredLevel: 2,
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
  },
  {
    id: 'thanos',
    name: 'Thanos',
    health: 1500,
    maxHealth: 1500,
    level: 1,
    experience: 0,
    isPaid: true,
    isUnlocked: false,
    cost: 1000,
    unlockCost: 0,
    requiredLevel: 0,
    abilities: [
      {
        id: 'snap',
        name: 'Infinity Snap',
        damage: 500,
        cooldown: 30,
        currentCooldown: 0,
        isUltimate: true,
        description: 'Snap half of enemy team out of existence'
      }
    ],
    skins: ['default'],
    currentSkin: 'default',
  },
];

// Helper function to get character by ID
export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(char => char.id === id);
};

// Helper function to get character abilities
export const getCharacterAbilities = (id: string) => {
  const character = getCharacterById(id);
  return character ? character.abilities : [];
};

// Helper function to check if a character is premium
export const isCharacterPremium = (id: string): boolean => {
  const character = getCharacterById(id);
  return character ? character.isPaid : false;
};

//152 lines of code