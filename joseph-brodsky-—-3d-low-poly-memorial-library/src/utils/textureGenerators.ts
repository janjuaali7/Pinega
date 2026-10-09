import * as THREE from 'three';

/**
 * Creates an authentic 90s St. Petersburg / Russian intelligentsia kilim rug texture
 */
export function createRussianRugTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background deep burgundy wine
  ctx.fillStyle = '#4a121a';
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer border - Malachite teal
  ctx.lineWidth = 40;
  ctx.strokeStyle = '#1b443b';
  ctx.strokeRect(40, 40, 944, 944);

  // Inner border - Antique Gold
  ctx.lineWidth = 16;
  ctx.strokeStyle = '#d4af37';
  ctx.strokeRect(70, 70, 884, 884);

  // Secondary border - Deep Navy
  ctx.lineWidth = 24;
  ctx.strokeStyle = '#17253b';
  ctx.strokeRect(100, 100, 824, 824);

  // Caucasian / Persian geometric medallions
  const drawDiamond = (cx: number, cy: number, w: number, h: number, fill: string, stroke?: string) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy - h);
    ctx.lineTo(cx + w, cy);
    ctx.lineTo(cx, cy + h);
    ctx.lineTo(cx - w, cy);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.lineWidth = 6;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  };

  // Center medallion
  drawDiamond(512, 512, 280, 280, '#1b443b', '#d4af37');
  drawDiamond(512, 512, 210, 210, '#661622', '#e5c158');
  drawDiamond(512, 512, 140, 140, '#17253b', '#d4af37');
  drawDiamond(512, 512, 70, 70, '#d4af37');

  // Corner motifs
  const corners = [
    [240, 240], [784, 240], [240, 784], [784, 784]
  ];
  corners.forEach(([cx, cy]) => {
    drawDiamond(cx, cy, 110, 110, '#1b443b', '#d4af37');
    drawDiamond(cx, cy, 65, 65, '#661622', '#e5c158');
  });

  // Border repeat teeth
  ctx.fillStyle = '#d4af37';
  for (let i = 110; i < 914; i += 40) {
    drawDiamond(i, 85, 12, 12, '#d4af37');
    drawDiamond(i, 939, 12, 12, '#d4af37');
    drawDiamond(85, i, 12, 12, '#d4af37');
    drawDiamond(939, i, 12, 12, '#d4af37');
  }

  // Woven grain texture
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 22;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates the 1987 Nobel Prize medal relief face texture
 */
export function createNobelMedalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Gold radial shading
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
  grad.addColorStop(0, '#ffe57f');
  grad.addColorStop(0.65, '#d4af37');
  grad.addColorStop(0.9, '#a67c1e');
  grad.addColorStop(1, '#664c12');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // Outer bevel ring
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#523a09';
  ctx.stroke();

  ctx.lineWidth = 6;
  ctx.strokeStyle = '#fff0a6';
  ctx.beginPath();
  ctx.arc(256, 256, 238, 0, Math.PI * 2);
  ctx.stroke();

  // Alfred Nobel silhouette profile (stylized)
  ctx.fillStyle = '#63470d';
  ctx.beginPath();
  // Forehead & nose
  ctx.moveTo(270, 150);
  ctx.bezierCurveTo(250, 150, 230, 175, 230, 205);
  ctx.bezierCurveTo(230, 225, 215, 235, 215, 245); // bridge
  ctx.lineTo(200, 270); // nose tip
  ctx.lineTo(220, 280); // under nose
  ctx.bezierCurveTo(215, 290, 215, 305, 225, 315); // beard & lips
  ctx.bezierCurveTo(235, 350, 220, 390, 200, 410); // beard tip
  ctx.bezierCurveTo(270, 420, 330, 400, 340, 360); // neck
  ctx.bezierCurveTo(360, 300, 360, 200, 300, 160); // cranium
  ctx.closePath();
  ctx.fill();

  // Inscriptions
  ctx.fillStyle = '#422e06';
  ctx.font = 'bold 24px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('ALFR. NOBEL', 256, 120);

  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('NAT. MDCCCXXXIII  OB. MDCCCXCVI', 256, 445);

  ctx.font = 'bold 18px Georgia, serif';
  ctx.fillText('1987 · LITERATURE', 256, 470);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates classical Russian library oak parquet floor texture
 */
export function createParquetFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#2c1810';
  ctx.fillRect(0, 0, 512, 512);

  const tileSize = 64;
  for (let y = 0; y < 512; y += tileSize) {
    for (let x = 0; x < 512; x += tileSize) {
      const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
      ctx.fillStyle = isAlt ? '#3b2216' : '#331c12';
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

      // Plank strip lines
      ctx.strokeStyle = '#22110a';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, tileSize, tileSize);

      if (isAlt) {
        ctx.fillStyle = '#4a2c1d';
        ctx.fillRect(x + 6, y + 6, tileSize - 12, 14);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * Creates grand library back wall honor inscription plaque texture
 */
export function createWallHonorsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark polished Saint Petersburg walnut paneling
  ctx.fillStyle = '#1c100c';
  ctx.fillRect(0, 0, 1024, 512);

  // Classical double border in warm gold
  ctx.strokeStyle = '#c59b27';
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 964, 452);

  ctx.strokeStyle = '#856417';
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, 940, 428);

  // Classical filigree corner accents
  const corners = [
    [52, 52], [972, 52], [52, 460], [972, 460]
  ];
  ctx.fillStyle = '#d4af37';
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Latin & Cyrillic Typography
  ctx.textAlign = 'center';

  // Russian Title
  ctx.font = 'italic 26px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#dfc374';
  ctx.fillText('ИОСИФ  АЛЕКСАНДРОВИЧ  БРОДСКИЙ', 512, 100);

  // Main Name in Roman letters
  ctx.font = 'bold 54px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#fdf4dc';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 10;
  ctx.fillText('JOSEPH BRODSKY', 512, 165);
  ctx.shadowBlur = 0;

  // Lifespan & Origin
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#9e814a';
  ctx.fillText('1940 — 1996  ·  LENINGRAD — NEW YORK — VENICE', 512, 210);

  // Divider line with diamond
  ctx.strokeStyle = '#c59b27';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(250, 240);
  ctx.lineTo(774, 240);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(512, 240, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#d4af37';
  ctx.fill();

  // Nobel Prize Banner
  ctx.font = 'bold 36px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#ffd700';
  ctx.fillText('★  1987 NOBEL PRIZE IN LITERATURE  ★', 512, 295);

  ctx.font = 'italic 21px Georgia, serif';
  ctx.fillStyle = '#c5b085';
  ctx.fillText('«For an all-embracing authorship, imbued with clarity of thought & poetic intensity»', 512, 335);

  // Poet Laureate
  ctx.font = 'bold 28px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#e8ded1';
  ctx.fillText('UNITED STATES POET LAUREATE (1991–1992)', 512, 390);

  ctx.font = '19px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#8f7754';
  ctx.fillText('MacArthur Fellow · Légion d’Honneur · Member of the American Academy of Arts and Letters', 512, 430);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates an etched book title label texture for shelf volumes
 */
export function createEtchedBookTexture(title: string, year: number, bgHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Spine base color
  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, 512, 128);

  // Gold embossed borders
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 492, 108);

  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, 480, 96);

  // Gold title text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff4cf';
  ctx.font = 'bold 26px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(title.toUpperCase(), 256, 58);

  // Year & small ornament
  ctx.fillStyle = '#e5c158';
  ctx.font = '18px "JetBrains Mono", monospace';
  ctx.fillText(`BRODSKY · ${year}`, 256, 92);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
