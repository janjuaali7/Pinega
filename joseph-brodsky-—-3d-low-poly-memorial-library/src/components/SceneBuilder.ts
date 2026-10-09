import * as THREE from 'three';
import { BRODSKY_WORKS } from '../data/brodskyData';
import {
  createRussianRugTexture,
  createNobelMedalTexture,
  createParquetFloorTexture,
  createWallHonorsTexture,
  createEtchedBookTexture
} from '../utils/textureGenerators';

export interface SceneBuildResult {
  scene: THREE.Scene;
  interactiveObjects: THREE.Object3D[];
  animatables: ((time: number, delta: number) => void)[];
  lights: {
    ambientLight: THREE.AmbientLight;
    stageSpot: THREE.SpotLight;
    medalSpot: THREE.SpotLight;
    deskLight: THREE.PointLight;
    rimLight: THREE.DirectionalLight;
    windowLight: THREE.PointLight;
  };
}

export function buildBrodskyScene(): SceneBuildResult {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1414);
  scene.fog = new THREE.FogExp2(0x0a1414, 0.045);

  const interactiveObjects: THREE.Object3D[] = [];
  const animatables: ((time: number, delta: number) => void)[] = [];

  // -------------------------------------------------------------
  // 1. LIGHTING SETUP
  // -------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0x243533, 1.2);
  scene.add(ambientLight);

  // Main stage dramatic spotlight on Joseph Brodsky
  const stageSpot = new THREE.SpotLight(0xfff0c9, 4.5);
  stageSpot.position.set(0, 6.2, 3.2);
  stageSpot.target.position.set(0, 1.3, 0);
  stageSpot.angle = Math.PI / 4.5;
  stageSpot.penumbra = 0.55;
  stageSpot.castShadow = true;
  stageSpot.shadow.mapSize.width = 1024;
  stageSpot.shadow.mapSize.height = 1024;
  stageSpot.shadow.bias = -0.001;
  scene.add(stageSpot);
  scene.add(stageSpot.target);

  // Dedicated spotlight highlighting the Nobel Medal on the stool
  const medalSpot = new THREE.SpotLight(0xffe88a, 3.2);
  medalSpot.position.set(-1.1, 3.5, 1.2);
  medalSpot.target.position.set(-0.95, 0.85, 0.1);
  medalSpot.angle = Math.PI / 6;
  medalSpot.penumbra = 0.4;
  scene.add(medalSpot);
  scene.add(medalSpot.target);

  // Warm banker's lamp point light on the desk
  const deskLight = new THREE.PointLight(0xffc56e, 2.8, 4.5);
  deskLight.position.set(1.6, 1.35, 0.5);
  scene.add(deskLight);

  // Cool rim light from behind (window/moonlight) for poetic silhouette separation
  const rimLight = new THREE.DirectionalLight(0x5690a8, 1.6);
  rimLight.position.set(-3.5, 4.5, -4);
  scene.add(rimLight);

  // Window exterior ambient
  const windowLight = new THREE.PointLight(0x407085, 1.8, 8);
  windowLight.position.set(-3.8, 3.0, -1.8);
  scene.add(windowLight);

  // -------------------------------------------------------------
  // 2. FLOOR & CENTRAL STAGE
  // -------------------------------------------------------------
  const floorGeo = new THREE.PlaneGeometry(24, 24);
  const parquetTexture = createParquetFloorTexture();
  const floorMat = new THREE.MeshStandardMaterial({
    map: parquetTexture,
    roughness: 0.65,
    metalness: 0.15
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Central circular low-poly stage podium
  const stageGroup = new THREE.Group();
  const podiumGeo = new THREE.CylinderGeometry(2.35, 2.45, 0.14, 24);
  const podiumMat = new THREE.MeshStandardMaterial({
    color: 0x3d2114,
    roughness: 0.4,
    metalness: 0.2,
    flatShading: true
  });
  const podium = new THREE.Mesh(podiumGeo, podiumMat);
  podium.position.y = 0.07;
  podium.receiveShadow = true;
  stageGroup.add(podium);

  // Brass podium rim trim
  const rimTrimGeo = new THREE.TorusGeometry(2.4, 0.025, 8, 32);
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.3,
    metalness: 0.8
  });
  const rimTrim = new THREE.Mesh(rimTrimGeo, brassMat);
  rimTrim.rotation.x = Math.PI / 2;
  rimTrim.position.y = 0.14;
  stageGroup.add(rimTrim);

  // Authentic Russian kilim rug on the stage podium
  const rugTexture = createRussianRugTexture();
  const rugGeo = new THREE.CircleGeometry(2.0, 32);
  const rugMat = new THREE.MeshStandardMaterial({
    map: rugTexture,
    roughness: 0.85,
    metalness: 0.05
  });
  const rug = new THREE.Mesh(rugGeo, rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.142;
  rug.receiveShadow = true;
  stageGroup.add(rug);

  scene.add(stageGroup);

  // -------------------------------------------------------------
  // 3. LOW-POLY JOSEPH BRODSKY CHARACTER MODEL
  // -------------------------------------------------------------
  const brodskyGroup = new THREE.Group();
  brodskyGroup.position.set(0, 0.142, 0);

  // Materials for low-poly character
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xe8cbb3,
    roughness: 0.7,
    metalness: 0.05,
    flatShading: true
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0xa89f91, // Salt-and-pepper / sandy grey curls
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });
  const coatMat = new THREE.MeshStandardMaterial({
    color: 0x1f2328, // Charcoal wool overcoat
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  });
  const coatLapelMat = new THREE.MeshStandardMaterial({
    color: 0x16181b,
    roughness: 0.75,
    metalness: 0.1,
    flatShading: true
  });
  const scarfMat = new THREE.MeshStandardMaterial({
    color: 0x3d271e, // Warm ribbed woolen scarf
    roughness: 0.9,
    metalness: 0.0,
    flatShading: true
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xf5f3ee,
    roughness: 0.6,
    metalness: 0.05,
    flatShading: true
  });
  const tieMat = new THREE.MeshStandardMaterial({
    color: 0x73232c, // Russian burgundy patterned vintage tie
    roughness: 0.5,
    metalness: 0.2,
    flatShading: true
  });
  const trouserMat = new THREE.MeshStandardMaterial({
    color: 0x1c2124,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: 0x140e0b,
    roughness: 0.35,
    metalness: 0.3,
    flatShading: true
  });
  const glassesMat = new THREE.MeshStandardMaterial({
    color: 0xcdb87d, // Round wire spectacles
    roughness: 0.25,
    metalness: 0.9
  });
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x88bbdd,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.4
  });

  // Shoes
  const shoeGeo = new THREE.BoxGeometry(0.12, 0.08, 0.26);
  const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
  leftShoe.position.set(-0.16, 0.04, 0.04);
  leftShoe.rotation.y = 0.08;
  brodskyGroup.add(leftShoe);

  const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
  rightShoe.position.set(0.16, 0.04, -0.02);
  rightShoe.rotation.y = -0.12;
  brodskyGroup.add(rightShoe);

  // Legs / Trousers
  const legGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.72, 7);
  const leftLeg = new THREE.Mesh(legGeo, trouserMat);
  leftLeg.position.set(-0.16, 0.42, 0.02);
  brodskyGroup.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, trouserMat);
  rightLeg.position.set(0.16, 0.42, -0.02);
  brodskyGroup.add(rightLeg);

  // Heavy wool overcoat body (flaring down)
  const coatBodyGeo = new THREE.CylinderGeometry(0.26, 0.38, 0.78, 9);
  const coatBody = new THREE.Mesh(coatBodyGeo, coatMat);
  coatBody.position.set(0, 0.88, 0);
  coatBody.castShadow = true;
  brodskyGroup.add(coatBody);

  // Torso / Chest upper coat
  const torsoGeo = new THREE.BoxGeometry(0.48, 0.52, 0.32);
  const torso = new THREE.Mesh(torsoGeo, coatMat);
  torso.position.set(0, 1.28, 0);
  torso.castShadow = true;
  brodskyGroup.add(torso);

  // Lapels
  const lapelLeftGeo = new THREE.BoxGeometry(0.1, 0.42, 0.04);
  const lapelLeft = new THREE.Mesh(lapelLeftGeo, coatLapelMat);
  lapelLeft.position.set(-0.14, 1.28, 0.17);
  lapelLeft.rotation.z = -0.18;
  brodskyGroup.add(lapelLeft);

  const lapelRightGeo = new THREE.BoxGeometry(0.1, 0.42, 0.04);
  const lapelRight = new THREE.Mesh(lapelRightGeo, coatLapelMat);
  lapelRight.position.set(0.14, 1.28, 0.17);
  lapelRight.rotation.z = 0.18;
  brodskyGroup.add(lapelRight);

  // Shirt collar & Tie inside coat V-neck
  const shirtVGeo = new THREE.BoxGeometry(0.18, 0.22, 0.03);
  const shirtV = new THREE.Mesh(shirtVGeo, shirtMat);
  shirtV.position.set(0, 1.4, 0.155);
  brodskyGroup.add(shirtV);

  const tieGeo = new THREE.BoxGeometry(0.05, 0.24, 0.02);
  const tie = new THREE.Mesh(tieGeo, tieMat);
  tie.position.set(0, 1.34, 0.165);
  brodskyGroup.add(tie);

  // Woolen scarf wrapped around neck
  const scarfRingGeo = new THREE.TorusGeometry(0.17, 0.07, 7, 12);
  const scarfRing = new THREE.Mesh(scarfRingGeo, scarfMat);
  scarfRing.position.set(0, 1.5, 0.02);
  scarfRing.rotation.x = Math.PI / 2.2;
  brodskyGroup.add(scarfRing);

  // Draping scarf ends hanging down the front of coat
  const scarfEndGeo = new THREE.BoxGeometry(0.11, 0.38, 0.05);
  const scarfEnd = new THREE.Mesh(scarfEndGeo, scarfMat);
  scarfEnd.position.set(-0.06, 1.24, 0.19);
  scarfEnd.rotation.z = 0.06;
  brodskyGroup.add(scarfEnd);

  // Arms & Hands
  // Right Arm: tucked in coat pocket or casually folded
  const rightArmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.52, 7);
  const rightArm = new THREE.Mesh(rightArmGeo, coatMat);
  rightArm.position.set(0.31, 1.2, 0.02);
  rightArm.rotation.z = -0.32;
  brodskyGroup.add(rightArm);

  const rightForearmGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.36, 7);
  const rightForearm = new THREE.Mesh(rightForearmGeo, coatMat);
  rightForearm.position.set(0.38, 0.95, 0.12);
  rightForearm.rotation.x = -0.45;
  rightForearm.rotation.z = -0.15;
  brodskyGroup.add(rightForearm);

  const rightHandGeo = new THREE.BoxGeometry(0.08, 0.09, 0.08);
  const rightHand = new THREE.Mesh(rightHandGeo, skinMat);
  rightHand.position.set(0.34, 0.82, 0.2);
  brodskyGroup.add(rightHand);

  // Left Arm: resting down along the side
  const leftArmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.52, 7);
  const leftArm = new THREE.Mesh(leftArmGeo, coatMat);
  leftArm.position.set(-0.31, 1.2, 0.02);
  leftArm.rotation.z = 0.24;
  brodskyGroup.add(leftArm);

  const leftForearmGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.36, 7);
  const leftForearm = new THREE.Mesh(leftForearmGeo, coatMat);
  leftForearm.position.set(-0.35, 0.92, 0.05);
  leftForearm.rotation.x = -0.2;
  leftForearm.rotation.z = 0.15;
  brodskyGroup.add(leftForearm);

  const leftHandGeo = new THREE.BoxGeometry(0.07, 0.09, 0.07);
  const leftHand = new THREE.Mesh(leftHandGeo, skinMat);
  leftHand.position.set(-0.32, 0.77, 0.1);
  brodskyGroup.add(leftHand);

  // Vintage pen held in left hand
  const penGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.15, 6);
  const penMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.3 });
  const pen = new THREE.Mesh(penGeo, penMat);
  pen.position.set(-0.32, 0.75, 0.14);
  pen.rotation.x = 0.8;
  brodskyGroup.add(pen);

  // Head Group (with micro-animation capability)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.62, 0.03);

  // Sculpted low-poly head (high prominent forehead, angular cheeks & chin)
  const headGeo = new THREE.DodecahedronGeometry(0.18, 1);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.scale.set(1.0, 1.25, 1.15);
  head.castShadow = true;
  headGroup.add(head);

  // Nose (sculpted low-poly pyramid)
  const noseGeo = new THREE.ConeGeometry(0.045, 0.11, 4);
  const nose = new THREE.Mesh(noseGeo, skinMat);
  nose.position.set(0, 0.0, 0.22);
  nose.rotation.x = -0.28;
  headGroup.add(nose);

  // Receding hairline & side wavy curl clusters (from uploaded photo)
  // Left side curls
  const leftHairCluster1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09, 0), hairMat);
  leftHairCluster1.position.set(-0.16, 0.04, 0.02);
  headGroup.add(leftHairCluster1);

  const leftHairCluster2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), hairMat);
  leftHairCluster2.position.set(-0.15, -0.05, 0.01);
  headGroup.add(leftHairCluster2);

  // Right side curls
  const rightHairCluster1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09, 0), hairMat);
  rightHairCluster1.position.set(0.16, 0.04, 0.02);
  headGroup.add(rightHairCluster1);

  const rightHairCluster2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 0), hairMat);
  rightHairCluster2.position.set(0.15, -0.05, 0.01);
  headGroup.add(rightHairCluster2);

  // Back of head & nape hair
  const backHair = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.14), hairMat);
  backHair.position.set(0, 0.05, -0.14);
  headGroup.add(backHair);

  // Top wispy receding hair fringe
  const topFringe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.12), hairMat);
  topFringe.position.set(0, 0.19, -0.04);
  headGroup.add(topFringe);

  // Iconic round wireframe spectacles (from photo)
  const rimLeft = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.007, 6, 16), glassesMat);
  rimLeft.position.set(-0.072, 0.04, 0.205);
  headGroup.add(rimLeft);

  const lensLeft = new THREE.Mesh(new THREE.CircleGeometry(0.044, 12), lensMat);
  lensLeft.position.set(-0.072, 0.04, 0.205);
  headGroup.add(lensLeft);

  const rimRight = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.007, 6, 16), glassesMat);
  rimRight.position.set(0.072, 0.04, 0.205);
  headGroup.add(rimRight);

  const lensRight = new THREE.Mesh(new THREE.CircleGeometry(0.044, 12), lensMat);
  lensRight.position.set(0.072, 0.04, 0.205);
  headGroup.add(lensRight);

  // Spectacle bridge connecting the lenses
  const bridgeGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.045, 6);
  const bridge = new THREE.Mesh(bridgeGeo, glassesMat);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.04, 0.208);
  headGroup.add(bridge);

  // Wire temples going to ears
  const templeLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.18, 4), glassesMat);
  templeLeft.rotation.x = Math.PI / 2;
  templeLeft.position.set(-0.115, 0.04, 0.12);
  headGroup.add(templeLeft);

  const templeRight = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.18, 4), glassesMat);
  templeRight.rotation.x = Math.PI / 2;
  templeRight.position.set(0.115, 0.04, 0.12);
  headGroup.add(templeRight);

  // Eyebrows (thoughtful arch)
  const browMat = new THREE.MeshBasicMaterial({ color: 0x5a544c });
  const browLeft = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.015, 0.01), browMat);
  browLeft.position.set(-0.072, 0.095, 0.205);
  browLeft.rotation.z = 0.1;
  headGroup.add(browLeft);

  const browRight = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.015, 0.01), browMat);
  browRight.position.set(0.072, 0.095, 0.205);
  browRight.rotation.z = -0.1;
  headGroup.add(browRight);

  brodskyGroup.add(headGroup);

  // Interactive bounding box for clicking Joseph Brodsky
  const hitBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.85, 0.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitBox.position.set(0, 0.95, 0);
  hitBox.userData = {
    interactiveTarget: {
      type: 'character',
      title: 'Joseph Brodsky (1940–1996)'
    }
  };
  brodskyGroup.add(hitBox);
  interactiveObjects.push(hitBox);

  scene.add(brodskyGroup);

  // Micro-animation for Brodsky (gentle breathing + slight head look)
  animatables.push((time) => {
    torso.scale.y = 1.0 + Math.sin(time * 1.8) * 0.012;
    coatBody.scale.x = 1.0 + Math.sin(time * 1.8) * 0.008;
    headGroup.rotation.y = Math.sin(time * 0.45) * 0.05;
    headGroup.rotation.x = Math.sin(time * 0.35) * 0.02;
  });

  // -------------------------------------------------------------
  // 4. THE NOBEL PRIZE ON A WOODEN STOOL (BESIDE HIM)
  // -------------------------------------------------------------
  const stoolGroup = new THREE.Group();
  stoolGroup.position.set(-0.95, 0.142, 0.1);

  // Antique carved wooden stool (legs, ring, and seat)
  const stoolWoodMat = new THREE.MeshStandardMaterial({
    color: 0x422216,
    roughness: 0.45,
    metalness: 0.15,
    flatShading: true
  });

  // Stool Seat top
  const seatGeo = new THREE.CylinderGeometry(0.32, 0.34, 0.06, 16);
  const stoolSeat = new THREE.Mesh(seatGeo, stoolWoodMat);
  stoolSeat.position.y = 0.72;
  stoolSeat.castShadow = true;
  stoolGroup.add(stoolSeat);

  // Stool legs (faceted tripod/quad)
  const legCount = 4;
  for (let i = 0; i < legCount; i++) {
    const angle = (i / legCount) * Math.PI * 2 + Math.PI / 4;
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.024, 0.72, 6),
      stoolWoodMat
    );
    leg.position.set(Math.cos(angle) * 0.22, 0.36, Math.sin(angle) * 0.22);
    leg.rotation.z = Math.sin(angle) * -0.09;
    leg.rotation.x = Math.cos(angle) * 0.09;
    leg.castShadow = true;
    stoolGroup.add(leg);
  }

  // Cross-stretchers
  const stretcherRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.018, 6, 16),
    stoolWoodMat
  );
  stretcherRing.rotation.x = Math.PI / 2;
  stretcherRing.position.y = 0.25;
  stoolGroup.add(stretcherRing);

  // Royal Burgundy Velvet Presentation Cushion
  const cushionGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.07, 16);
  const cushionMat = new THREE.MeshStandardMaterial({
    color: 0x6e1523, // Deep crimson velvet
    roughness: 0.85,
    metalness: 0.05
  });
  const cushion = new THREE.Mesh(cushionGeo, cushionMat);
  cushion.position.y = 0.77;
  stoolGroup.add(cushion);

  // Gold cord / piping around cushion
  const cushionCord = new THREE.Mesh(
    new THREE.TorusGeometry(0.27, 0.014, 8, 24),
    brassMat
  );
  cushionCord.rotation.x = Math.PI / 2;
  cushionCord.position.y = 0.77;
  stoolGroup.add(cushionCord);

  // THE NOBEL PRIZE MEDAL
  const medalTexture = createNobelMedalTexture();
  const medalGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.018, 32);
  const medalMat = new THREE.MeshStandardMaterial({
    map: medalTexture,
    color: 0xffe277,
    roughness: 0.24,
    metalness: 0.92
  });
  const nobelMedal = new THREE.Mesh(medalGeo, medalMat);
  // Slightly propped up so the inscription and Alfred Nobel profile catch the spotlight
  nobelMedal.position.set(0, 0.82, 0);
  nobelMedal.rotation.x = 0.35;
  nobelMedal.rotation.y = 0.2;
  nobelMedal.castShadow = true;
  stoolGroup.add(nobelMedal);

  // Subtle hovering halo/gleam indicator on the medal
  const haloGeo = new THREE.RingGeometry(0.15, 0.18, 24);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = Math.PI / 2 + 0.35;
  halo.position.set(0, 0.83, 0);
  stoolGroup.add(halo);

  // Interactive hitbox for Nobel Medal
  const nobelHitbox = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.95, 0.65),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  nobelHitbox.position.set(0, 0.6, 0);
  nobelHitbox.userData = {
    interactiveTarget: {
      type: 'nobel',
      title: '1987 Nobel Prize in Literature'
    }
  };
  stoolGroup.add(nobelHitbox);
  interactiveObjects.push(nobelHitbox);

  scene.add(stoolGroup);

  // Gentle pulsing gleam on medal halo
  animatables.push((time) => {
    halo.scale.setScalar(1.0 + Math.sin(time * 3) * 0.08);
    haloMat.opacity = 0.35 + Math.sin(time * 3) * 0.2;
  });

  // -------------------------------------------------------------
  // 5. GRAND LIBRARY BACK WALL & HONORS INSCRIPTION
  // -------------------------------------------------------------
  const backWallGroup = new THREE.Group();
  backWallGroup.position.set(0, 0, -3.2);

  // Classical wall backing
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x181e1e, // Deep Hermitage slate teal
    roughness: 0.85,
    metalness: 0.1
  });
  const wall = new THREE.Mesh(new THREE.BoxGeometry(16, 7, 0.4), wallMat);
  wall.position.y = 3.5;
  wall.receiveShadow = true;
  backWallGroup.add(wall);

  // Classical Arch & Wooden Wainscoting
  const wainscotMat = new THREE.MeshStandardMaterial({
    color: 0x22130c, // Rich dark Russian mahogany
    roughness: 0.5,
    metalness: 0.15
  });
  const wainscot = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 0.48), wainscotMat);
  wainscot.position.y = 0.6;
  backWallGroup.add(wainscot);

  // Wall Inscription Plaque with title and honors
  const honorsTexture = createWallHonorsTexture();
  const plaqueGeo = new THREE.PlaneGeometry(4.4, 2.2);
  const plaqueMat = new THREE.MeshStandardMaterial({
    map: honorsTexture,
    roughness: 0.35,
    metalness: 0.25
  });
  const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
  plaque.position.set(0, 3.25, 0.23);
  backWallGroup.add(plaque);

  // Carved wooden frame around the plaque
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x3d2013,
    roughness: 0.35,
    metalness: 0.2
  });
  // Top/bottom frame
  const frameTB = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.12, 0.1), frameMat);
  frameTB.position.set(0, 4.4, 0.26);
  backWallGroup.add(frameTB);
  const frameB = frameTB.clone();
  frameB.position.y = 2.1;
  backWallGroup.add(frameB);

  // Gold fluted pilasters on sides of honors
  const pilasterMat = new THREE.MeshStandardMaterial({
    color: 0x2c170d,
    roughness: 0.4,
    metalness: 0.2
  });
  const pilasterL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 0.2), pilasterMat);
  pilasterL.position.set(-2.5, 3.1, 0.24);
  backWallGroup.add(pilasterL);

  const pilasterR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 0.2), pilasterMat);
  pilasterR.position.set(2.5, 3.1, 0.24);
  backWallGroup.add(pilasterR);

  // Wall sconces (ambient library electric/candle lamps)
  [-2.8, 2.8].forEach((x) => {
    const sconceBase = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), brassMat);
    sconceBase.position.set(x, 3.6, 0.26);
    backWallGroup.add(sconceBase);

    const sconceShade = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.18, 8, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xffe6a3, roughness: 0.4, emissive: 0x6e4e1a })
    );
    sconceShade.position.set(x, 3.8, 0.34);
    backWallGroup.add(sconceShade);
  });

  scene.add(backWallGroup);

  // -------------------------------------------------------------
  // 6. SURROUNDING BOOKSHELVES & ETCHED POETRY VOLUMES
  // -------------------------------------------------------------
  const bookshelfWoodMat = new THREE.MeshStandardMaterial({
    color: 0x2e190f,
    roughness: 0.5,
    metalness: 0.15,
    flatShading: true
  });

  const bookSpineColors = [
    0x1b443b, // Malachite teal
    0x6b1724, // Russian burgundy
    0x1c2b42, // Navy
    0x8c5b1b, // Amber leather
    0x2c3e2e, // Forest green
    0x48243b, // Plum
    0x543d2b, // Aged vellum
    0xc59b27  // Gold cloth
  ];

  // Helper to build a bookcase unit
  const createBookcase = (x: number, z: number, rotY: number, width: number, height: number, tiers: number) => {
    const bookcase = new THREE.Group();
    bookcase.position.set(x, 0, z);
    bookcase.rotation.y = rotY;

    // Upright side panels
    const panelThick = 0.08;
    const depth = 0.55;
    const leftPanel = new THREE.Mesh(
      new THREE.BoxGeometry(panelThick, height, depth),
      bookshelfWoodMat
    );
    leftPanel.position.set(-width / 2 + panelThick / 2, height / 2, 0);
    bookcase.add(leftPanel);

    const rightPanel = new THREE.Mesh(
      new THREE.BoxGeometry(panelThick, height, depth),
      bookshelfWoodMat
    );
    rightPanel.position.set(width / 2 - panelThick / 2, height / 2, 0);
    bookcase.add(rightPanel);

    // Back board
    const backBoard = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.04),
      bookshelfWoodMat
    );
    backBoard.position.set(0, height / 2, -depth / 2 + 0.02);
    bookcase.add(backBoard);

    // Shelves & Books
    const tierHeight = (height - 0.2) / tiers;
    for (let t = 0; t <= tiers; t++) {
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(width - panelThick * 2, 0.05, depth),
        bookshelfWoodMat
      );
      shelf.position.set(0, 0.15 + t * tierHeight, 0);
      bookcase.add(shelf);

      // Add low-poly books on this shelf if not top cornice
      if (t < tiers) {
        let currentX = -width / 2 + panelThick + 0.06;
        const endX = width / 2 - panelThick - 0.06;

        while (currentX < endX) {
          const bookW = 0.035 + Math.random() * 0.045;
          const bookH = tierHeight * (0.65 + Math.random() * 0.25);
          const bookD = depth * (0.6 + Math.random() * 0.25);
          const colorHex = bookSpineColors[Math.floor(Math.random() * bookSpineColors.length)];

          const bookMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: 0.65,
            metalness: 0.1,
            flatShading: true
          });

          // Chance for leaning book or horizontal stack
          if (Math.random() < 0.12 && currentX + 0.25 < endX) {
            // Horizontal stack of 3-4 books
            const stackCount = 2 + Math.floor(Math.random() * 3);
            for (let s = 0; s < stackCount; s++) {
              const hBook = new THREE.Mesh(
                new THREE.BoxGeometry(0.18, 0.04, bookD),
                bookMat
              );
              hBook.position.set(
                currentX + 0.09,
                0.15 + t * tierHeight + 0.025 + s * 0.042,
                -0.04
              );
              bookcase.add(hBook);
            }
            currentX += 0.22;
          } else {
            // Upright book
            const bookMesh = new THREE.Mesh(
              new THREE.BoxGeometry(bookW, bookH, bookD),
              bookMat
            );
            bookMesh.position.set(
              currentX + bookW / 2,
              0.15 + t * tierHeight + bookH / 2 + 0.025,
              -0.04 + (Math.random() - 0.5) * 0.03
            );

            // Small tilt
            if (Math.random() < 0.15) {
              bookMesh.rotation.z = (Math.random() - 0.5) * 0.12;
            }

            bookcase.add(bookMesh);
            currentX += bookW + 0.006;
          }
        }
      }
    }

    // Top decorative cornice
    const cornice = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.15, 0.14, depth + 0.1),
      bookshelfWoodMat
    );
    cornice.position.set(0, height + 0.07, 0);
    bookcase.add(cornice);

    return bookcase;
  };

  // Place bookshelves surrounding the space
  // Left wing
  const caseL1 = createBookcase(-4.2, -1.2, Math.PI / 4, 3.4, 4.2, 5);
  scene.add(caseL1);

  const caseL2 = createBookcase(-4.6, 1.8, Math.PI / 2.3, 3.2, 4.2, 5);
  scene.add(caseL2);

  // Right wing
  const caseR1 = createBookcase(4.2, -1.2, -Math.PI / 4, 3.4, 4.2, 5);
  scene.add(caseR1);

  const caseR2 = createBookcase(4.6, 1.8, -Math.PI / 2.3, 3.2, 4.2, 5);
  scene.add(caseR2);

  // Background side cases
  const caseB1 = createBookcase(-2.9, -2.8, 0, 2.8, 4.2, 5);
  scene.add(caseB1);

  const caseB2 = createBookcase(2.9, -2.8, 0, 2.8, 4.2, 5);
  scene.add(caseB2);

  // -------------------------------------------------------------
  // 7. ETCHED PROMINENT WORKS OF BRODSKY ON SHELVES (INTERACTIVE)
  // -------------------------------------------------------------
  // Specific etched volumes positioned around the library shelves
  const etchedPositions: { pos: [number, number, number]; rotY: number }[] = [
    { pos: [2.5, 1.75, -2.4], rotY: 0 },             // Less Than One
    { pos: [3.4, 1.35, -1.9], rotY: -Math.PI / 4 },    // A Part of Speech
    { pos: [3.8, 1.75, -0.6], rotY: -Math.PI / 3 },    // Watermark
    { pos: [4.1, 1.35, 0.7],  rotY: -Math.PI / 2.3 },  // To Urania
    { pos: [3.9, 1.75, 1.8],  rotY: -Math.PI / 2 },    // So Forth
    { pos: [-2.5, 1.75, -2.4], rotY: 0 },            // A Room and a Half
    { pos: [-3.4, 1.35, -1.9], rotY: Math.PI / 4 },   // Elegy for John Donne
    { pos: [-3.8, 1.75, -0.6], rotY: Math.PI / 3 },   // Nativity Poems
    { pos: [-4.1, 1.35, 0.7],  rotY: Math.PI / 2.3 }, // On Grief and Reason
    { pos: [-3.9, 1.75, 1.8],  rotY: Math.PI / 2 }    // End of a Beautiful Era
  ];

  BRODSKY_WORKS.forEach((work, index) => {
    if (index >= etchedPositions.length) return;
    const { pos, rotY } = etchedPositions[index];

    const etchedGroup = new THREE.Group();
    etchedGroup.position.set(pos[0], pos[1], pos[2]);
    etchedGroup.rotation.y = rotY;

    // Etched volume book mesh
    const spineTexture = createEtchedBookTexture(work.title, work.year, work.color);
    const bookMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.12, 0.28),
      new THREE.MeshStandardMaterial({
        map: spineTexture,
        roughness: 0.35,
        metalness: 0.35
      })
    );
    bookMesh.position.set(0, 0, 0.05);
    etchedGroup.add(bookMesh);

    // Brass display stand under the etched volume
    const stand = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.024, 0.12),
      brassMat
    );
    stand.position.set(0, -0.07, 0.06);
    etchedGroup.add(stand);

    // Glowing aura / interactive beacon
    const glowGeo = new THREE.PlaneGeometry(0.44, 0.18);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffe277,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, 0, 0.2);
    etchedGroup.add(glow);

    // Hitbox for raycasting
    const hitbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.35, 0.35),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.position.set(0, 0, 0.06);
    hitbox.userData = {
      interactiveTarget: {
        type: 'work',
        data: work,
        title: work.title
      }
    };
    etchedGroup.add(hitbox);
    interactiveObjects.push(hitbox);

    scene.add(etchedGroup);

    // Animate glow pulse
    animatables.push((time) => {
      glowMat.opacity = 0.22 + Math.sin(time * 2.5 + index * 0.7) * 0.14;
    });
  });

  // -------------------------------------------------------------
  // 8. 90s WRITING DESK WITH GREEN BANKER'S LAMP & TYPEWRITER
  // -------------------------------------------------------------
  const deskGroup = new THREE.Group();
  deskGroup.position.set(1.65, 0.142, 0.65);
  deskGroup.rotation.y = -Math.PI / 4;

  const deskWoodMat = new THREE.MeshStandardMaterial({
    color: 0x361d12,
    roughness: 0.45,
    metalness: 0.15,
    flatShading: true
  });

  // Desk top
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.06, 0.75),
    deskWoodMat
  );
  deskTop.position.set(0, 0.74, 0);
  deskTop.castShadow = true;
  deskGroup.add(deskTop);

  // Desk legs
  const deskLegPositions = [
    [-0.56, -0.32], [0.56, -0.32],
    [-0.56, 0.32], [0.56, 0.32]
  ];
  deskLegPositions.forEach(([lx, lz]) => {
    const dLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.025, 0.74, 6),
      deskWoodMat
    );
    dLeg.position.set(lx, 0.37, lz);
    dLeg.castShadow = true;
    deskGroup.add(dLeg);
  });

  // Green Glass Banker's Desk Lamp ("Bibliotheca lamp")
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-0.4, 0.77, -0.18);

  // Brass base
  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.09, 0.03, 12),
    brassMat
  );
  lampGroup.add(lampBase);

  // Curved brass arm
  const lampArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.28, 8),
    brassMat
  );
  lampArm.position.set(0, 0.14, 0);
  lampGroup.add(lampArm);

  // Emerald green glass shade
  const shadeMat = new THREE.MeshStandardMaterial({
    color: 0x0f5938,
    roughness: 0.2,
    metalness: 0.1,
    emissive: 0x0d472c,
    emissiveIntensity: 0.6
  });
  const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.22, 12, 1, false, 0, Math.PI),
    shadeMat
  );
  lampShade.rotation.z = Math.PI / 2;
  lampShade.rotation.x = Math.PI / 2;
  lampShade.position.set(0, 0.28, 0);
  lampGroup.add(lampShade);

  deskGroup.add(lampGroup);

  // Vintage Cyrillic Mechanical Typewriter
  const typewriterGroup = new THREE.Group();
  typewriterGroup.position.set(0.05, 0.77, 0.02);

  const twBodyMat = new THREE.MeshStandardMaterial({
    color: 0x1f2424,
    roughness: 0.6,
    metalness: 0.4,
    flatShading: true
  });
  const twBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.09, 0.34),
    twBodyMat
  );
  twBody.position.y = 0.045;
  typewriterGroup.add(twBody);

  // Keyboard slope
  const twKeys = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.03, 0.14),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 })
  );
  twKeys.position.set(0, 0.075, 0.08);
  twKeys.rotation.x = 0.25;
  typewriterGroup.add(twKeys);

  // Paper roller / platen
  const twRoller = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 })
  );
  twRoller.rotation.z = Math.PI / 2;
  twRoller.position.set(0, 0.12, -0.06);
  typewriterGroup.add(twRoller);

  // Sheet of white paper loaded into typewriter
  const twPaper = new THREE.Mesh(
    new THREE.PlaneGeometry(0.24, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xfbf8ee, roughness: 0.9, side: THREE.DoubleSide })
  );
  twPaper.rotation.x = -0.35;
  twPaper.position.set(0, 0.19, -0.08);
  typewriterGroup.add(twPaper);

  deskGroup.add(typewriterGroup);

  // Russian Podstakannik (Tea in glass with silver tea glass holder & lemon)
  const teaGroup = new THREE.Group();
  teaGroup.position.set(0.42, 0.77, -0.15);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd9e2e8,
    roughness: 0.2,
    metalness: 0.88
  });
  // Filigree silver holder
  const podstakannik = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.052, 0.07, 12, 1, true),
    silverMat
  );
  podstakannik.position.y = 0.035;
  teaGroup.add(podstakannik);

  // Glass tumbler
  const glassCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.042, 0.11, 12),
    new THREE.MeshStandardMaterial({
      color: 0xb57833, // Amber black tea
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    })
  );
  glassCup.position.y = 0.055;
  teaGroup.add(glassCup);

  // Floating lemon slice
  const lemonSlice = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.006, 8),
    new THREE.MeshStandardMaterial({ color: 0xf5d442, roughness: 0.4 })
  );
  lemonSlice.position.set(0, 0.09, 0);
  lemonSlice.rotation.x = 0.3;
  teaGroup.add(lemonSlice);

  deskGroup.add(teaGroup);

  // Ashtray & subtle low-poly cigarette smoke
  const ashtray = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.045, 0.02, 12),
    new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3 })
  );
  ashtray.position.set(0.38, 0.78, 0.14);
  deskGroup.add(ashtray);

  const smokeGeo = new THREE.ConeGeometry(0.02, 0.22, 6);
  const smokeMat = new THREE.MeshBasicMaterial({
    color: 0xccddee,
    transparent: true,
    opacity: 0.25
  });
  const smoke = new THREE.Mesh(smokeGeo, smokeMat);
  smoke.position.set(0.38, 0.9, 0.14);
  deskGroup.add(smoke);

  animatables.push((time) => {
    smoke.rotation.y = time * 0.8;
    smoke.scale.x = 1.0 + Math.sin(time * 2) * 0.2;
    smoke.scale.z = 1.0 + Math.cos(time * 2) * 0.2;
  });

  // Hitbox for desk
  const deskHitbox = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.9, 0.8),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  deskHitbox.position.set(0, 0.45, 0);
  deskHitbox.userData = {
    interactiveTarget: {
      type: 'desk',
      title: 'Brodsky’s Writing Desk'
    }
  };
  deskGroup.add(deskHitbox);
  interactiveObjects.push(deskHitbox);

  scene.add(deskGroup);

  // -------------------------------------------------------------
  // 9. GRAND ARCHED SAINT PETERSBURG WINDOW
  // -------------------------------------------------------------
  const windowGroup = new THREE.Group();
  windowGroup.position.set(-3.8, 0, -1.8);
  windowGroup.rotation.y = Math.PI / 3;

  // Window frame
  const winFrameMat = new THREE.MeshStandardMaterial({
    color: 0x221814,
    roughness: 0.5,
    metalness: 0.1
  });
  const winOuter = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 3.8, 1.8),
    winFrameMat
  );
  winOuter.position.y = 2.4;
  windowGroup.add(winOuter);

  // Glass panes (showing twilight canal tint)
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x3d6878,
    roughness: 0.15,
    metalness: 0.4,
    emissive: 0x1b3540,
    emissiveIntensity: 0.5
  });
  const winGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 3.4),
    glassMat
  );
  winGlass.rotation.y = Math.PI / 2;
  winGlass.position.set(0.08, 2.4, 0);
  windowGroup.add(winGlass);

  scene.add(windowGroup);

  // -------------------------------------------------------------
  // 10. FLOATING ATMOSPHERIC DUST PARTICLES & GOLD MOTES
  // -------------------------------------------------------------
  const particleCount = 220;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 8;
    particlePositions[i * 3 + 1] = Math.random() * 4.5;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    particleSpeeds[i] = 0.2 + Math.random() * 0.4;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xffe699,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  animatables.push((time, delta) => {
    const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      array[i * 3 + 1] -= delta * particleSpeeds[i];
      array[i * 3] += Math.sin(time + i) * 0.002;

      // Wrap around when reaching floor
      if (array[i * 3 + 1] < 0.15) {
        array[i * 3 + 1] = 4.2;
      }
    }
    posAttr.needsUpdate = true;
  });

  return {
    scene,
    interactiveObjects,
    animatables,
    lights: {
      ambientLight,
      stageSpot,
      medalSpot,
      deskLight,
      rimLight,
      windowLight
    }
  };
}
