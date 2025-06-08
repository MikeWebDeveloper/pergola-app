import React from 'react';
import { Box, useTexture } from '@react-three/drei';
import { Texture } from 'three';

interface PostProps {
  position: [number, number, number];
  args?: [number, number, number];
  materialId: string;
  color: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export default function Post({ position, args = [0.1, 0.1, 2.5], materialId, color, castShadow = true, receiveShadow = true }: PostProps) {
  console.log('Post: Rendering with position', position, 'args', args, 'materialId', materialId, 'color', color);

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