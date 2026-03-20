export interface PlayerState {
    id: string;
    hiddenCards: any[];
    openCards: any[];
    folded: boolean;
  }
  
  export interface GameState {
    players: PlayerState[];
    deck: any[];
    currentTurn: number;
    phase: string;
  }