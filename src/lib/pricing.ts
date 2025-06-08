import { PergolaConfig } from "@/types";
import { accessories } from "@/data/products";

interface ComponentPrice {
  min: number;
  max: number;
  unit: string;
}

// Define pricing data based on Table 5 from "Pricing" notepad (using min price for simplicity)
const componentPricing: { [key: string]: ComponentPrice } = {
  // FRAMEWORK
  "ptp_post": { min: 9.00, max: 15.00, unit: "per linear metre" },
  "cedar_post": { min: 19.80, max: 19.90, unit: "per linear metre" },
  "aluminium_post": { min: 28.39, max: 28.39, unit: "per linear metre" },
  "steel_post": { min: 12.32, max: 29.94, unit: "per linear metre" },

  "ptp_beam": { min: 3.58, max: 3.58, unit: "per linear metre" },
  "cedar_beam": { min: 12.38, max: 12.46, unit: "per linear metre" },
  "aluminium_beam": { min: 30.00, max: 50.00, unit: "per linear metre" },
  "steel_beam": { min: 24.00, max: 24.00, unit: "per linear metre" },

  "ptp_rafter": { min: 2.39, max: 2.39, unit: "per linear metre" },
  "cedar_rafter": { min: 8.25, max: 8.33, unit: "per linear metre" },
  "aluminium_rafter": { min: 15.00, max: 25.00, unit: "per linear metre" }, // Estimate for smaller alu profile
  "steel_rafter": { min: 14.40, max: 21.60, unit: "per linear metre" }, // Estimate for smaller steel profile

  // ROOFING
  "slatted_roof": { min: 280.00, max: 300.00, unit: "per 12m² area" },
  "polycarbonate_roof": { min: 18.00, max: 36.00, unit: "per m²" },
  "glass_roof": { min: 88.80, max: 120.00, unit: "per m²" },
  "louvered-manual_roof": { min: 1800.00, max: 3000.00, unit: "per kit/system" },
  "louvered-motorised_roof": { min: 2600.00, max: 5000.00, unit: "per kit/system" },
  "roof_canopy_manual": { min: 150.00, max: 400.00, unit: "per system" },
  "roof_canopy_motorised": { min: 450.00, max: 1200.00, unit: "per system" },

  // ACCESSORIES (prices here are placeholders, actual come from products.ts)
  "led": { min: 0, max: 0, unit: "per item" }, 
  "heater": { min: 0, max: 0, unit: "per item" },
  "side-screen": { min: 0, max: 0, unit: "per item" },
  "fan": { min: 0, max: 0, unit: "per item" },

  // LABOUR
  "basic_installation": { min: 400.00, max: 900.00, unit: "per project" },
  "complex_installation": { min: 1200.00, max: 2500.00, unit: "per project" },
};

export function calculatePrice(config: PergolaConfig): {
  totalPrice: number;
  materialPrice: number;
  roofPrice: number;
  accessoriesPrice: number;
  installationPrice: number;
} {
  const area = config.width * config.length;
  if (area <= 0) return { totalPrice: 0, materialPrice: 0, roofPrice: 0, accessoriesPrice: 0, installationPrice: 0 };

  let currentMaterialPrice = 0;
  let currentRoofPrice = 0;
  let currentAccessoriesPrice = 0;
  let currentInstallationPrice = 0;

  // 1. Calculate Material Price for Posts, Beams, Rafters
  const selectedMaterialId = config.material;

  let postPriceKey: string;
  let beamPriceKey: string;
  let rafterPriceKey: string;

  switch (selectedMaterialId) {
    case 'ptp':
      postPriceKey = 'ptp_post';
      beamPriceKey = 'ptp_beam';
      rafterPriceKey = 'ptp_rafter';
      break;
    case 'cedar':
      postPriceKey = 'cedar_post';
      beamPriceKey = 'cedar_beam';
      rafterPriceKey = 'cedar_rafter';
      break;
    case 'aluminium':
      postPriceKey = 'aluminium_post';
      beamPriceKey = 'aluminium_beam';
      rafterPriceKey = 'aluminium_rafter';
      break;
    case 'steel':
      postPriceKey = 'steel_post';
      beamPriceKey = 'steel_beam';
      rafterPriceKey = 'steel_rafter';
      break;
    default:
      postPriceKey = 'ptp_post'; // Default to PTP
      beamPriceKey = 'ptp_beam';
      rafterPriceKey = 'ptp_rafter';
  }

  // Number of posts depends on pergola style
  const numPosts = config.style === 'freestanding' ? 4 : 2;
  const postLength = config.height; // Assuming height is the length of the post
  currentMaterialPrice += (componentPricing[postPriceKey]?.min || 0) * numPosts * postLength;

  // Assume 2 main beams (running along length) and 2 secondary beams (running along width)
  const numMainBeams = 2; // Along length
  const mainBeamLength = config.length;
  currentMaterialPrice += (componentPricing[beamPriceKey]?.min || 0) * numMainBeams * mainBeamLength;

  const numSecondaryBeams = 2; // Along width, perpendicular to main beams
  const secondaryBeamLength = config.width;
  currentMaterialPrice += (componentPricing[beamPriceKey]?.min || 0) * numSecondaryBeams * secondaryBeamLength;

  // Assume rafters based on width or length, simplified to 4 for now
  const numRafters = Math.ceil(config.width / 0.6); // Example: one rafter every 0.6m
  const rafterLength = config.length;
  currentMaterialPrice += (componentPricing[rafterPriceKey]?.min || 0) * numRafters * rafterLength;

  // 2. Calculate Roof Price
  const selectedRoofType = config.roofType;
  switch (selectedRoofType) {
    case 'slatted':
      const slattedPricePer12Sqm = componentPricing["slatted_roof"]?.min || 0;
      currentRoofPrice = (area / 12) * slattedPricePer12Sqm;
      break;
    case 'polycarbonate':
      currentRoofPrice = area * (componentPricing["polycarbonate_roof"]?.min || 0);
      break;
    case 'louvered-manual':
      // For MVP, scale kit price linearly by area. In real scenario, would use fixed kit price for specific sizes.
      const manualLouveredPrice = componentPricing["louvered-manual_roof"]?.min || 0;
      currentRoofPrice = (area / 12) * manualLouveredPrice;
      break;
    case 'louvered-motorised':
      const motorisedLouveredPrice = componentPricing["louvered-motorised_roof"]?.min || 0;
      currentRoofPrice = (area / 12) * motorisedLouveredPrice;
      break;
    default:
      currentRoofPrice = 0; 
  }

  // 3. Calculate Accessories Price (from products.ts as these are already defined with prices there)
  currentAccessoriesPrice = config.accessories.reduce((sum, accId) => {
    const accessory = accessories.find((a) => a.id === accId);
    return sum + (accessory?.price || 0);
  }, 0);

  // 4. Calculate Installation Price (simplified based on material and roof type complexity)
  if (['ptp', 'cedar'].includes(selectedMaterialId) && ['slatted', 'polycarbonate'].includes(selectedRoofType)) {
    currentInstallationPrice = componentPricing["basic_installation"]?.min || 0;
  } else if (['aluminium', 'steel'].includes(selectedMaterialId) || ['louvered-motorised'].includes(selectedRoofType)) {
    currentInstallationPrice = componentPricing["complex_installation"]?.min || 0;
  }

  const totalPrice = currentMaterialPrice + currentRoofPrice + currentAccessoriesPrice + currentInstallationPrice;

  return {
    totalPrice,
    materialPrice: currentMaterialPrice,
    roofPrice: currentRoofPrice,
    accessoriesPrice: currentAccessoriesPrice,
    installationPrice: currentInstallationPrice,
  };
} 