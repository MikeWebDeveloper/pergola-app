import React from 'react';
import { Box, useTexture } from '@react-three/drei';
import { Texture } from 'three';

interface RoofProps {
  position: [number, number, number];
  args: [number, number, number]; // [width, height, depth]
  materialId: string;
  color: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export default function Roof({ position, args, materialId, color, castShadow = true, receiveShadow = true }: RoofProps) {
  console.log('Roof: Rendering with position', position, 'args', args, 'materialId', materialId, 'color', color);

  const [woodTexture, metalTexture] = useTexture([
    '/textures/wood_grain.svg',
    '/textures/metal_texture.svg',
  ]);

  const materialProps: { map?: Texture; color: string } = { color: color };

  if (materialId.includes('wood') || materialId.includes('pine') || materialId.includes('cedar')) {
    materialProps.map = woodTexture;
  } else {
    materialProps.map = metalTexture;
  }

  return (
    <Box position={position} args={args} castShadow={castShadow} receiveShadow={receiveShadow}>
      <meshStandardMaterial {...materialProps} />
    </Box>
  );
} 