import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

// 3D image sphere (Fibonacci distribution, drag + momentum + auto-rotate).
// Adapted to JSX; images render as white circular badges (logos contained).

const SPHERE_MATH = {
  degreesToRadians: (d) => d * (Math.PI / 180),
  normalizeAngle: (a) => {
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  },
};

export default function SphereImageGrid({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = '',
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePositions, setImagePositions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  const generateSpherePositions = useCallback(() => {
    const positions = [];
    const imageCount = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) phi = Math.max(5, phi - poleBonus);
      else phi = Math.min(175, phi + poleBonus);
      phi = 15 + (phi / 180) * 150;

      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({ theta, phi, radius: actualSphereRadius });
    }
    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback(() => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1; z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2; z = z2;

      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = z > fadeZoneEnd;
      let fadeOpacity = 1;
      if (z <= fadeZoneStart) fadeOpacity = Math.max(0, (z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));

      const isPoleImage = pos.phi < 30 || pos.phi > 150;
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const distanceRatio = Math.min(distanceFromCenter / actualSphereRadius, 1);
      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);
      const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return { x, y, z, scale, zIndex: Math.round(1000 + z), isVisible, fadeOpacity, originalIndex: index };
    });

    const adjusted = [...positions];
    for (let i = 0; i < adjusted.length; i++) {
      const pos = adjusted[i];
      if (!pos.isVisible) continue;
      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;
      for (let j = 0; j < adjusted.length; j++) {
        if (i === j) continue;
        const other = adjusted[j];
        if (!other.isVisible) continue;
        const otherSize = baseImageSize * other.scale;
        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (imageSize + otherSize) / 2 + 25;
        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }
      adjusted[i] = { ...pos, scale: Math.max(0.25, adjustedScale) };
    }
    return adjusted;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback(
    (speed) => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed)),
    [maxRotationSpeed],
  );

  const updateMomentum = useCallback(() => {
    if (isDragging) return;
    setVelocity((prev) => {
      const nv = { x: prev.x * momentumDecay, y: prev.y * momentumDecay };
      if (!autoRotate && Math.abs(nv.x) < 0.01 && Math.abs(nv.y) < 0.01) return { x: 0, y: 0 };
      return nv;
    });
    setRotation((prev) => {
      let newY = prev.y;
      if (autoRotate) newY += autoRotateSpeed;
      newY += clampRotationSpeed(velocity.y);
      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z,
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    const rd = { x: -deltaY * dragSensitivity, y: deltaX * dragSensitivity };
    setRotation((prev) => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rd.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rd.y)),
      z: prev.z,
    }));
    setVelocity({ x: clampRotationSpeed(rd.x), y: clampRotationSpeed(rd.y) });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;
    const rd = { x: -deltaY * dragSensitivity, y: deltaX * dragSensitivity };
    setRotation((prev) => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rd.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rd.y)),
      z: prev.z,
    }));
    setVelocity({ x: clampRotationSpeed(rd.x), y: clampRotationSpeed(rd.y) });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { setImagePositions(generateSpherePositions()); }, [generateSpherePositions]);

  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };
    if (isMounted) animationFrame.current = requestAnimationFrame(animate);
    return () => { if (animationFrame.current) cancelAnimationFrame(animationFrame.current); };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const worldPositions = calculateWorldPositions();

  const renderImageNode = (image, index) => {
    const position = worldPositions[index];
    if (!position || !position.isVisible) return null;
    const imageSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(hoverScale, hoverScale / position.scale) : 1;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          left: `${containerSize / 2 + position.x}px`,
          top: `${containerSize / 2 + position.y}px`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex,
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedImage(image)}
      >
        {/* circular badge — bg adapts to the logo: dark bg for light logos, light bg for dark logos */}
        <div
          className={`relative w-full h-full rounded-full shadow-md ring-1 grid place-items-center overflow-hidden ${
            image.badgeBg === 'dark' ? 'bg-[#0e1b14] ring-white/10' : 'bg-white ring-black/5'
          }`}
          style={{ padding: '22%' }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-full object-contain"
            draggable={false}
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    );
  };

  const renderSpotlightModal = () => {
    if (!selectedImage) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={() => setSelectedImage(null)}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <div
          className="bg-white rounded-2xl max-w-xs w-full overflow-hidden p-8"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'scaleIn 0.3s ease-out' }}
        >
          <div className="relative aspect-square grid place-items-center">
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-[70%] max-h-[70%] object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-black/60 rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          {selectedImage.title && (
            <h3 className="mt-4 text-center text-base font-semibold">{selectedImage.title}</h3>
          )}
        </div>
      </div>
    );
  };

  if (!isMounted) {
    return <div style={{ width: containerSize, height: containerSize }} className={className} />;
  }
  if (!images.length) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {renderSpotlightModal()}
    </>
  );
}
