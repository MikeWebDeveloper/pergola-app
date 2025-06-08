import { PergolaConfig } from "@/types";

interface ValidationResult {
  isValid: boolean;
  messages: { [key: string]: string };
}

// Temporary fixed min/max values for dimensions. In a full system, these would depend on material.
const DIMENSION_CONSTRAINTS = {
  width: { min: 2, max: 10 },
  length: { min: 2, max: 15 },
  height: { min: 2.2, max: 4 },
};

export function validatePergolaConfig(config: PergolaConfig): ValidationResult {
  const messages: { [key: string]: string } = {};
  let isValid = true;

  // Validate Dimensions
  if (config.width < DIMENSION_CONSTRAINTS.width.min || config.width > DIMENSION_CONSTRAINTS.width.max) {
    messages.width = `Width must be between ${DIMENSION_CONSTRAINTS.width.min}m and ${DIMENSION_CONSTRAINTS.width.max}m.`;
    isValid = false;
  }
  if (config.length < DIMENSION_CONSTRAINTS.length.min || config.length > DIMENSION_CONSTRAINTS.length.max) {
    messages.length = `Length must be between ${DIMENSION_CONSTRAINTS.length.min}m and ${DIMENSION_CONSTRAINTS.length.max}m.`;
    isValid = false;
  }
  if (config.height < DIMENSION_CONSTRAINTS.height.min || config.height > DIMENSION_CONSTRAINTS.height.max) {
    messages.height = `Height must be between ${DIMENSION_CONSTRAINTS.height.min}m and ${DIMENSION_CONSTRAINTS.height.max}m.`;
    isValid = false;
  }

  // Add more rules here in the future (e.g., material compatibility, accessory compatibility)

  return { isValid, messages };
} 