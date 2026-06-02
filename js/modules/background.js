/**
 * @file background.js (互動排斥物理引擎版)
 * @responsibility 渲染動態星空背景、計算星座拓撲連線，並實作基於向量距離的滑鼠粒子排斥與歸位緩動演算法。
 */

class ConstellationEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    
    // 基礎環境參數 (Environmental Constants)
    this.BASE_STAR_COUNT = 140;         // 基礎星星數量，會根據螢幕尺寸動態增加
    this.LINE_DIST_THRESHOLD = 240;     // 星座連線的最大距離閾值 (像素) - 超過此距離則不繪製連線

    // 鼠標互動物理參數 (Mouse Interaction Force Fields)
    this.mouse = { x: -9999, y: -9999, radius: 160 }; // 排斥力場半徑 (像素)
    this.REPULSION_STRENGTH = 45;                     // 排斥推開最大力道
    this.RETURN_SPEED = 0.004;                         // 歸位彈性係數 (緩動值，越小越黏滯)
  }

  init() {
    this.resizeCanvas();
    this.generateStarfield();
    
    // 全域事件監聽 (Interactive Event Attachment)
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('mousemove', (e) => this.trackMouse(e));
    window.addEventListener('mouseleave', () => this.clearMouse());
    
    this.loop();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateStarfield();
  }

  trackMouse(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  clearMouse() {
    // 移出視窗時將座標丟到外太空，防止粒子持續游離
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  generateStarfield() {
    this.stars = [];
    const width = this.canvas.width;
    const height = this.canvas.height;
    const dynamicCount = Math.floor((width * height) / 13000) + this.BASE_STAR_COUNT;

    for (let i = 0; i < dynamicCount; i++) {
      const layer = Math.floor(Math.random() * 3) + 1;
      const startX = Math.random() * width;
      const startY = Math.random() * height;

      this.stars.push({
        x: startX,          // 當前即時繪製的 X 座標
        y: startY,          // 當前即時繪製的 Y 座標
        originX: startX,    // 記憶定錨點：誕生原點 X (Origin Anchor)
        originY: startY,    // 記憶定錨點：誕生原點 Y (Origin Anchor)
        baseRadius: (Math.random() * 0.9 + 0.3) * (layer * 0.85),
        alpha: Math.random() * 0.5 + 0.4,                       
        twinkleSpeed: Math.random() * 0.015 + 0.015,
        phase: Math.random() * Math.PI,
        layer: layer,
        isConstellationNode: layer === 3 && Math.random() < 0.45 
      });
    }
  }

  loop() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    const starLength = this.stars.length;

    // Phase 1: 物理位置更新與基礎粒子繪製
    for (let i = 0; i < starLength; i++) {
      const star = this.stars[i];

      // 1. 滑鼠排斥向量運算 (Vector Repulsion Mathematics)
      const dxMouse = star.x - this.mouse.x;
      const dyMouse = star.y - this.mouse.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < this.mouse.radius) {
        // 計算排斥加權比重：越接近滑鼠，推力越劇烈
        const forceFactor = (this.mouse.radius - distMouse) / this.mouse.radius;
        const repulsionForce = forceFactor * this.REPULSION_STRENGTH;
        
        // 計算夾角方向
        const angle = Math.atan2(dyMouse, dxMouse);
        
        // 算出目標逃逸移位值
        const targetX = star.x + Math.cos(angle) * repulsionForce;
        const targetY = star.y + Math.sin(angle) * repulsionForce;

        // 加速度移位
        star.x += (targetX - star.x) * 0.2;
        star.y += (targetY - star.y) * 0.2;
      } else {
        // 2. 緩動歸位運算 (Linear Interpolation Easing Back to Anchor)
        if (star.x !== star.originX) {
          star.x += (star.originX - star.x) * this.RETURN_SPEED;
        }
        if (star.y !== star.originY) {
          star.y += (star.originY - star.y) * this.RETURN_SPEED;
        }
      }

      // 3. 渲染原本的閃爍粒子動畫
      star.phase += star.twinkleSpeed;
      const currentAlpha = star.alpha + Math.sin(star.phase) * 0.4;
      const validatedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.baseRadius, 0, Math.PI * 2);

      if (star.layer === 3) {
        this.ctx.fillStyle = `rgba(147, 112, 219, ${validatedAlpha})`; 
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#8583ff';
      } else {
        this.ctx.fillStyle = `rgba(245, 245, 250, ${validatedAlpha})`;
        this.ctx.shadowBlur = 0;
      }
      this.ctx.fill();
    }

    // Phase 2: 動態星座連線拓撲 (連線會隨逃逸後的實時位置動態曲折變形)
    this.ctx.shadowBlur = 0; 
    for (let i = 0; i < starLength; i++) {
      for (let j = i + 1; j < starLength; j++) {
        const s1 = this.stars[i];
        const s2 = this.stars[j];

        if (s1.isConstellationNode && s2.isConstellationNode) {
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.LINE_DIST_THRESHOLD) {
            const lineAlpha = (1 - (distance / this.LINE_DIST_THRESHOLD)) * 0.65;
            const combinedAlpha = lineAlpha * ((Math.sin(s1.phase) + Math.sin(s2.phase)) / 2 + 1);

            this.ctx.beginPath();
            this.ctx.moveTo(s1.x, s1.y);
            this.ctx.lineTo(s2.x, s2.y);
            this.ctx.strokeStyle = `rgba(164, 140, 255, ${Math.max(0, combinedAlpha)})`; 
            this.ctx.lineWidth = 0.85;
            this.ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(() => this.loop());
  }
}

export function initStarfield(canvasId) {
  const engine = new ConstellationEngine(canvasId);
  engine.init();
  return engine;
}