import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildBrodskyScene, SceneBuildResult } from './SceneBuilder';
import { AtmosphereMode, CameraPreset, InteractiveTarget } from '../types/brodsky';
import { ATMOSPHERE_MODES, CAMERA_PRESETS } from '../data/brodskyData';
import { audioAmbience } from '../utils/audioAmbience';

interface ThreeCanvasProps {
  atmosphere: AtmosphereMode;
  activePresetId: string;
  isAutoRotating: boolean;
  onSelectTarget: (target: InteractiveTarget) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  atmosphere,
  activePresetId,
  isAutoRotating,
  onSelectTarget
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneResultRef = useRef<SceneBuildResult | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Hover state
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera transition state
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const isTransitioningRef = useRef<boolean>(false);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    const initialPreset = CAMERA_PRESETS[0];
    camera.position.set(...initialPreset.position);
    cameraRef.current = camera;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.3;
    controls.maxDistance = 12.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.02;
    controls.minPolarAngle = 0.1;
    controls.target.set(...initialPreset.target);
    controlsRef.current = controls;

    // Build Scene
    const sceneResult = buildBrodskyScene();
    sceneResultRef.current = sceneResult;

    // Clock
    const clock = new THREE.Clock();

    // Raycaster for hover/clicks
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseVector.set(x, y);

      setMousePos({ x: e.clientX, y: e.clientY });

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(sceneResult.interactiveObjects, true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        while (current && !current.userData?.interactiveTarget) {
          current = current.parent;
        }

        if (current && current.userData?.interactiveTarget) {
          const target = current.userData.interactiveTarget as InteractiveTarget;
          renderer.domElement.style.cursor = 'pointer';
          const label = target.type === 'work'
            ? `Book: ${target.data?.title} (${target.data?.year})`
            : target.title || 'Inspect Object';
          setHoveredTitle(label);
          return;
        }
      }

      renderer.domElement.style.cursor = 'grab';
      setHoveredTitle(null);
    };

    const handlePointerDown = () => {
      if (renderer.domElement.style.cursor === 'grab') {
        renderer.domElement.style.cursor = 'grabbing';
      }
    };

    const handlePointerUp = () => {
      if (renderer.domElement.style.cursor === 'grabbing') {
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseVector.set(x, y);

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(sceneResult.interactiveObjects, true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        while (current && !current.userData?.interactiveTarget) {
          current = current.parent;
        }

        if (current && current.userData?.interactiveTarget) {
          const target = current.userData.interactiveTarget as InteractiveTarget;
          audioAmbience.playTypewriterClick();
          onSelectTarget(target);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('mousedown', handlePointerDown);
    renderer.domElement.addEventListener('mouseup', handlePointerUp);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update low-poly scene animatables
      sceneResult.animatables.forEach((fn) => fn(elapsedTime, delta));

      // Smooth camera interpolation if transitioning
      if (isTransitioningRef.current && camera && controls) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetLookAtRef.current, 0.05);

        if (
          camera.position.distanceTo(targetCamPosRef.current) < 0.04 &&
          controls.target.distanceTo(targetLookAtRef.current) < 0.04
        ) {
          camera.position.copy(targetCamPosRef.current);
          controls.target.copy(targetLookAtRef.current);
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      renderer.render(sceneResult.scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('mousedown', handlePointerDown);
      renderer.domElement.removeEventListener('mouseup', handlePointerUp);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectTarget]);

  // Handle Preset Transitions
  useEffect(() => {
    const preset = CAMERA_PRESETS.find((p) => p.id === activePresetId);
    if (!preset || !cameraRef.current || !controlsRef.current) return;

    targetCamPosRef.current.set(...preset.position);
    targetLookAtRef.current.set(...preset.target);
    isTransitioningRef.current = true;
  }, [activePresetId]);

  // Handle Auto Rotation
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
      controlsRef.current.autoRotateSpeed = 0.75;
    }
  }, [isAutoRotating]);

  // Handle Atmosphere Lighting changes
  useEffect(() => {
    const sceneResult = sceneResultRef.current;
    if (!sceneResult) return;

    const currentMode = ATMOSPHERE_MODES.find((m) => m.id === atmosphere) || ATMOSPHERE_MODES[0];
    const { ambientLight, stageSpot, rimLight, windowLight } = sceneResult.lights;

    ambientLight.color.set(currentMode.ambientColor);
    stageSpot.color.set(currentMode.spotColor);
    rimLight.color.set(currentMode.rimColor);
    windowLight.color.set(currentMode.windowColor);

    if (sceneResult.scene.fog && sceneResult.scene.fog instanceof THREE.FogExp2) {
      sceneResult.scene.fog.color.set(currentMode.ambientColor);
      sceneResult.scene.background = new THREE.Color(currentMode.ambientColor);
    }
  }, [atmosphere]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* Three.js viewport canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating cursor tooltip indicator for interactive objects */}
      {hoveredTitle && (
        <div
          className="fixed pointer-events-none z-30 transition-transform duration-75 text-xs font-medium px-3 py-1.5 rounded bg-[#132222]/90 border border-[#c59b27]/60 text-[#fdf4dc] shadow-xl backdrop-blur-md"
          style={{
            left: `${mousePos.x + 16}px`,
            top: `${mousePos.y + 16}px`
          }}
        >
          <span className="text-[#c59b27] mr-1.5">✦</span>
          {hoveredTitle}
          <span className="ml-2 text-[10px] text-stone-400 opacity-80">(Click to view)</span>
        </div>
      )}
    </div>
  );
};
