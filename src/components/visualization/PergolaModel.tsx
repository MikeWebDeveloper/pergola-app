import React from 'react';
import useConfigStore from '@/store/config';
import { materials } from '@/data/products';
import Post from './Post';
import Beam from './Beam';
import Roof from './Roof';

function PergolaModel() {
  const { config } = useConfigStore();
  console.log('PergolaModel: Current Config', config);

  const material = materials.find(m => m.id === config.material);
  const materialId = material ? material.id : 'ptp'; // Default to ptp if not found or initial state
  const selectedColor = config.color || (material && material.colors.length > 0 ? material.colors[0].hex : '#8B4513'); // Default to ptp color if not set
  console.log('PergolaModel: Material ID', materialId, 'Selected Color', selectedColor);

  const postThickness = 0.1; // meters, fixed thickness for posts
  const beamHeight = 0.15; // meters, fixed height for beams
  const beamThickness = 0.1; // meters, fixed thickness for beams
  const roofThickness = 0.05; // meters, fixed thickness for roof

  // Calculate positions for posts (relative to center [0,0,0])
  const halfWidth = config.width / 2;
  const halfLength = config.length / 2;
  const postY = config.height / 2; // Posts extend from ground (0) to config.height

  return (
    <group>
      {/* Posts */}
      {config.style === 'freestanding' && (
        <>
          <Post position={[-halfWidth + postThickness / 2, postY, -halfLength + postThickness / 2]} args={[postThickness, config.height, postThickness]} materialId={materialId} color={selectedColor} />
          <Post position={[halfWidth - postThickness / 2, postY, -halfLength + postThickness / 2]} args={[postThickness, config.height, postThickness]} materialId={materialId} color={selectedColor} />
          <Post position={[-halfWidth + postThickness / 2, postY, halfLength - postThickness / 2]} args={[postThickness, config.height, postThickness]} materialId={materialId} color={selectedColor} />
          <Post position={[halfWidth - postThickness / 2, postY, halfLength - postThickness / 2]} args={[postThickness, config.height, postThickness]} materialId={materialId} color={selectedColor} />
        </>
      )}
      {config.style === 'attached' && (
        <>
          {/* Assuming attachment along the back length, so front posts remain */}
          <Post position={[-halfWidth + postThickness / 2, postY, halfLength - postThickness / 2]} args={[postThickness, config.height, postThickness]} materialId={materialId} color={selectedColor} />
          <Post position={[halfWidth - postThickness / 2, postY, halfLength - postThickness / 2]} args={[postThickness, config.height, postThickness]} materialId={materialId} color={selectedColor} />
        </>
      )}

      {/* Beams (spanning width) */}
      <Beam position={[0, config.height - beamHeight / 2, -halfLength + beamThickness / 2]} args={[config.width, beamHeight, beamThickness]} materialId={materialId} color={selectedColor} />
      <Beam position={[0, config.height - beamHeight / 2, halfLength - beamThickness / 2]} args={[config.width, beamHeight, beamThickness]} materialId={materialId} color={selectedColor} />

      {/* Beams (spanning length - perpendicular to width beams) */}
      <Beam position={[-halfWidth + beamThickness / 2, config.height - beamHeight / 2, 0]} args={[beamThickness, beamHeight, config.length]} materialId={materialId} color={selectedColor} />
      <Beam position={[halfWidth - beamThickness / 2, config.height - beamHeight / 2, 0]} args={[beamThickness, beamHeight, config.length]} materialId={materialId} color={selectedColor} />

      {/* Roof */}
      <Roof position={[0, config.height + roofThickness / 2, 0]} args={[config.width, roofThickness, config.length]} materialId={materialId} color={selectedColor} />
    </group>
  );
}

export default PergolaModel; 