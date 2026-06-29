import React, { Suspense, lazy, useMemo } from 'react';
import ParticleBackground from './ParticleBackground';

// three lives behind this lazy boundary, so it is only fetched when we actually
// render the 3D backdrop (never for reduced-motion or no-WebGL visitors).
const NeuralNetwork3D = lazy(() => import('./NeuralNetwork3D'));

/** Cheap one-off probe: does this browser/device give us a WebGL context? */
function supportsWebGL() {
  if (typeof window === 'undefined' || !window.WebGLRenderingContext) return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

/**
 * Backdrop — chooses the ambient background once, before the lazy boundary:
 *   • motion allowed + WebGL available → 3D NeuralNetwork3D (code-split three)
 *   • otherwise                        → lightweight 2D ParticleBackground
 */
const Backdrop = () => {
  const useThree = useMemo(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return !reduceMotion && supportsWebGL();
  }, []);

  if (!useThree) return <ParticleBackground />;

  return (
    <Suspense fallback={null}>
      <NeuralNetwork3D />
    </Suspense>
  );
};

export default Backdrop;
