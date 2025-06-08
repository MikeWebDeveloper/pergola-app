export interface User {
  email: string;
  name: string;
}

export type Material = {
  id: string;
  name: string;
  description: string;
  priceModifier: number; // e.g., 1.0 for base, 1.2 for premium
  colors: { id: string; name: string; hex: string; }[];
};

export type RoofType = {
  id: string;
  name: string;
  description: string;
  pricePerSqm: number;
};

export type Accessory = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export interface PergolaConfig {
  width: number; // in meters
  length: number; // in meters
  height: number; // in meters
  material: Material['id'];
  roofType: RoofType['id'];
  accessories: Accessory['id'][];
  style: 'freestanding' | 'attached';
  color: string; // Hex color code or a predefined color ID
} 