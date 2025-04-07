import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ParticleEffectProps {
  type: 'hit' | 'victory' | 'unlock' | 'levelUp';
  x: number;
  y: number;
  onComplete?: () => void;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ type, x, y, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = type === 'victory' ? 30 : 15;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360,
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [type, onComplete]);

  const getParticleColor = () => {
    switch (type) {
      case 'hit':
        return '#ff4444';
      case 'victory':
        return '#ffdd44';
      case 'unlock':
        return '#44ff44';
      case 'levelUp':
        return '#4444ff';
      default:
        return '#ffffff';
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
              rotate: particle.rotation,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: getParticleColor(),
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleEffect; 