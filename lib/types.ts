export interface Planeswalker {
    name: string; 
    cmc: number;
    homeLand: Plane;
}

export interface Plane {
    name: string; 
    tribes: Monster[];
}

export interface Monster {
    name: string;
    cmc: number;
    power: number;
    toughness: number;
    abilities: string[];
}