export interface RedeemCode {
  code: string;
  reward: {
    type: 'gems' | 'gold' | 'character';
    amount?: number;
    characterId?: string;
  };
  isOneTime: boolean;
  isUsed?: boolean;
}

export const redeemCodes: RedeemCode[] = [
  // One-time use character codes
  { code: 'THORX7K9', reward: { type: 'character', characterId: 'thor' }, isOneTime: true, isUsed: false },
  { code: 'IRONM4N5', reward: { type: 'character', characterId: 'iron-man' }, isOneTime: true, isUsed: false },
  { code: 'CAP4M3R1C4', reward: { type: 'character', characterId: 'captain-america' }, isOneTime: true, isUsed: false },
  { code: 'GR00T123', reward: { type: 'character', characterId: 'groot' }, isOneTime: true, isUsed: false },
  { code: 'DR5TR4NG3', reward: { type: 'character', characterId: 'dr-strange' }, isOneTime: true, isUsed: false },
  { code: 'W0NG456', reward: { type: 'character', characterId: 'wong' }, isOneTime: true, isUsed: false },
  { code: 'L0K1789', reward: { type: 'character', characterId: 'loki' }, isOneTime: true, isUsed: false },
  { code: 'R0CK3T321', reward: { type: 'character', characterId: 'rocket' }, isOneTime: true, isUsed: false },
  { code: 'BL4CKP4NTH3R', reward: { type: 'character', characterId: 'black-panther' }, isOneTime: true, isUsed: false },
  { code: 'W0LV3R1N3', reward: { type: 'character', characterId: 'wolverine' }, isOneTime: true, isUsed: false },
  { code: 'D34DP00L', reward: { type: 'character', characterId: 'deadpool' }, isOneTime: true, isUsed: false },
  { code: 'HULK999', reward: { type: 'character', characterId: 'hulk' }, isOneTime: true, isUsed: false },
  { code: 'SP1D3RM4N', reward: { type: 'character', characterId: 'spider-man' }, isOneTime: true, isUsed: false },
  { code: 'W1NT3R50LD13R', reward: { type: 'character', characterId: 'winter-soldier' }, isOneTime: true, isUsed: false },
  { code: 'BL4CKW1D0W', reward: { type: 'character', characterId: 'black-widow' }, isOneTime: true, isUsed: false },
  { code: 'H4WK3Y3', reward: { type: 'character', characterId: 'hawkeye' }, isOneTime: true, isUsed: false },
  { code: 'M4K4R1', reward: { type: 'character', characterId: 'makari' }, isOneTime: true, isUsed: false },
  { code: '0D1N', reward: { type: 'character', characterId: 'odin' }, isOneTime: true, isUsed: false },
  { code: 'MY5T3R10', reward: { type: 'character', characterId: 'mysterio' }, isOneTime: true, isUsed: false },
  { code: 'C4PT41NM4RV3L', reward: { type: 'character', characterId: 'captain-marvel' }, isOneTime: true, isUsed: false },
  { code: '5T4RL0RD', reward: { type: 'character', characterId: 'star-lord' }, isOneTime: true, isUsed: false },
  { code: '5UPR3M35TR4NG3', reward: { type: 'character', characterId: 'supreme-strange' }, isOneTime: true, isUsed: false },
  { code: 'W4K4ND45H13LD', reward: { type: 'character', characterId: 'wakanda-shield' }, isOneTime: true, isUsed: false },
  { code: '45IMX', reward: { type: 'character', characterId: 'asimx' }, isOneTime: true, isUsed: false },
  { code: 'TH4N05', reward: { type: 'character', characterId: 'thanos' }, isOneTime: true, isUsed: false },

  // Infinite use character codes
  { code: 'TH0R123', reward: { type: 'character', characterId: 'thor' }, isOneTime: false },
  { code: '1R0NM4N456', reward: { type: 'character', characterId: 'iron-man' }, isOneTime: false },
  { code: 'C4P4M789', reward: { type: 'character', characterId: 'captain-america' }, isOneTime: false },
  { code: 'GR00T321', reward: { type: 'character', characterId: 'groot' }, isOneTime: false },
  { code: 'DR5TR654', reward: { type: 'character', characterId: 'dr-strange' }, isOneTime: false },
  { code: 'W0NG987', reward: { type: 'character', characterId: 'wong' }, isOneTime: false },
  { code: 'L0K1123', reward: { type: 'character', characterId: 'loki' }, isOneTime: false },
  { code: 'R0CK456', reward: { type: 'character', characterId: 'rocket' }, isOneTime: false },
  { code: 'BL4CK789', reward: { type: 'character', characterId: 'black-panther' }, isOneTime: false },
  { code: 'W0LV321', reward: { type: 'character', characterId: 'wolverine' }, isOneTime: false },
  { code: 'D34D654', reward: { type: 'character', characterId: 'deadpool' }, isOneTime: false },
  { code: 'HULK987', reward: { type: 'character', characterId: 'hulk' }, isOneTime: false },
  { code: '5P1D123', reward: { type: 'character', characterId: 'spider-man' }, isOneTime: false },
  { code: 'W1NT456', reward: { type: 'character', characterId: 'winter-soldier' }, isOneTime: false },
  { code: 'BL4CK789', reward: { type: 'character', characterId: 'black-widow' }, isOneTime: false },
  { code: 'H4WK321', reward: { type: 'character', characterId: 'hawkeye' }, isOneTime: false },
  { code: 'M4K4654', reward: { type: 'character', characterId: 'makari' }, isOneTime: false },
  { code: '0D1N987', reward: { type: 'character', characterId: 'odin' }, isOneTime: false },
  { code: 'MY5123', reward: { type: 'character', characterId: 'mysterio' }, isOneTime: false },
  { code: 'C4PT456', reward: { type: 'character', characterId: 'captain-marvel' }, isOneTime: false },
  { code: '5T4R789', reward: { type: 'character', characterId: 'star-lord' }, isOneTime: false },
  { code: '5UPR321', reward: { type: 'character', characterId: 'supreme-strange' }, isOneTime: false },
  { code: 'W4K4654', reward: { type: 'character', characterId: 'wakanda-shield' }, isOneTime: false },
  { code: '45IM987', reward: { type: 'character', characterId: 'asimx' }, isOneTime: false },
  { code: 'TH4N123', reward: { type: 'character', characterId: 'thanos' }, isOneTime: false },

  // One-time use gem codes
  { code: 'W3LC0M3', reward: { type: 'gems', amount: 100 }, isOneTime: true, isUsed: false },
  { code: 'M4RV3L', reward: { type: 'gems', amount: 200 }, isOneTime: true, isUsed: false },
  { code: 'TH0R', reward: { type: 'gems', amount: 150 }, isOneTime: true, isUsed: false },
  { code: '1R0N', reward: { type: 'gems', amount: 300 }, isOneTime: true, isUsed: false },
  { code: 'C4P', reward: { type: 'gems', amount: 250 }, isOneTime: true, isUsed: false },
  { code: 'BL4CK', reward: { type: 'gems', amount: 180 }, isOneTime: true, isUsed: false },
  { code: 'H4WK', reward: { type: 'gems', amount: 120 }, isOneTime: true, isUsed: false },
  { code: 'HULK', reward: { type: 'gems', amount: 400 }, isOneTime: true, isUsed: false },
  { code: '5P1D', reward: { type: 'gems', amount: 350 }, isOneTime: true, isUsed: false },
  { code: 'DR5TR', reward: { type: 'gems', amount: 280 }, isOneTime: true, isUsed: false },

  // Infinite use gem codes
  { code: 'D41LY', reward: { type: 'gems', amount: 100 }, isOneTime: false },
  { code: 'W33KLY', reward: { type: 'gems', amount: 500 }, isOneTime: false },
  { code: 'M0NTHLY', reward: { type: 'gems', amount: 1000 }, isOneTime: false },
  { code: 'G0LD1', reward: { type: 'gold', amount: 1000 }, isOneTime: false },
  { code: 'G0LD5', reward: { type: 'gold', amount: 5000 }, isOneTime: false },
  { code: 'G0LD10', reward: { type: 'gold', amount: 10000 }, isOneTime: false }
];

// Helper function to validate and use a redeem code
export const useRedeemCode = (code: string): { success: boolean; reward?: any; message: string } => {
  const redeemCode = redeemCodes.find(rc => rc.code === code);
  
  if (!redeemCode) {
    return { success: false, message: 'Invalid code' };
  }

  if (redeemCode.isOneTime && redeemCode.isUsed) {
    return { success: false, message: 'Code already used' };
  }

  if (redeemCode.isOneTime) {
    redeemCode.isUsed = true;
  }

  return {
    success: true,
    reward: redeemCode.reward,
    message: 'Code redeemed successfully'
  };
}; 