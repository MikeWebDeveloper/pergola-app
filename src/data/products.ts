import { Material, RoofType, Accessory } from '@/types';

export type ColorOption = {
  id: string;
  name: string;
  hex: string; // Hex color code
};

export const materials: Material[] = [
  {
    id: 'ptp',
    name: 'Pressure-Treated Pine',
    description: 'A cost-effective and durable wood option.',
    priceModifier: 1.0,
    colors: [
      { id: 'natural-ptp', name: 'Natural Pine', hex: '#8B4513' },
      { id: 'dark-ptp', name: 'Dark Stain', hex: '#5C4033' },
    ],
  },
  {
    id: 'cedar',
    name: 'Cedar',
    description: 'A beautiful and naturally rot-resistant wood.',
    priceModifier: 1.5,
    colors: [
      { id: 'natural-cedar', name: 'Natural Cedar', hex: '#A0522D' },
      { id: 'redwood-cedar', name: 'Redwood Stain', hex: '#8B0000' },
    ],
  },
  {
    id: 'aluminium',
    name: 'Aluminium',
    description: 'A lightweight, low-maintenance, and modern option.',
    priceModifier: 2.0,
    colors: [
      { id: 'black-alu', name: 'Black Powder Coat', hex: '#000000' },
      { id: 'grey-alu', name: 'Anthracite Grey', hex: '#36454F' },
      { id: 'white-alu', name: 'White Powder Coat', hex: '#FFFFFF' },
    ],
  },
  {
    id: 'steel',
    name: 'Steel',
    description: 'A very strong and durable material, ideal for large structures.',
    priceModifier: 2.5,
    colors: [
      { id: 'black-steel', name: 'Matte Black', hex: '#1A1A1A' },
      { id: 'bronze-steel', name: 'Bronze Finish', hex: '#CD7F32' },
    ],
  },
];

export const roofTypes: RoofType[] = [
  {
    id: 'slatted',
    name: 'Traditional Slatted',
    description: 'Offers partial shade with a classic look.',
    pricePerSqm: 50,
  },
  {
    id: 'polycarbonate',
    name: 'Solid Polycarbonate',
    description: 'Provides full rain protection and UV filtering.',
    pricePerSqm: 120,
  },
  {
    id: 'louvered-manual',
    name: 'Manual Louvered',
    description: 'Adjustable slats for flexible sun and shade control.',
    pricePerSqm: 250,
  },
  {
    id: 'louvered-motorised',
    name: 'Motorised Louvered',
    description: 'Premium adjustable slats with remote control operation.',
    pricePerSqm: 400,
  },
];

export const accessories: Accessory[] = [
  {
    id: 'led',
    name: 'Integrated LED Lighting',
    description: 'Ambient lighting for evening use.',
    price: 350,
  },
  {
    id: 'heater',
    name: 'Infrared Heater',
    description: 'Extends the use of your pergola into cooler months.',
    price: 500,
  },
  {
    id: 'side-screen',
    name: 'Retractable Side Screen',
    description: 'Provides privacy and protection from wind.',
    price: 450,
  },
  {
    id: 'fan',
    name: 'Outdoor Ceiling Fan',
    description: 'Improves comfort on warm days.',
    price: 600,
  },
]; 