// BikeRacerEngine with deterministic obstacles and tunable options (no external deps)
function mulberry32(seed) {
  let t = seed >>> 0;
  return function() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
    return ((r ^ r >>> 14) >>> 0) / 4294967296;
  }
}

export class BikeRacerEngine {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.pixelRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const seed = (opts.seed ?? 12345) | 0;
    this.rand = mulberry32(seed);

    const baseAmp = opts.terrainAmplitude ?? 40;
    const baseAmp2 = opts.terrainAmplitude2 ?? 20;
    const f1 = opts.terrainFreq1 ?? 0.004;
    const f2 = opts.terrainFreq2 ?? 0.011;

    this.terrain = opts.terrain || ((x)=> 220 + baseAmp*Math.sin(x*f1) + baseAmp2*Math.sin(x*f2));
    this.terrainSlope = (x)=> {
      const dx = 1;
      return (this.terrain(x+dx) - this.terrain(x-dx)) / (2*dx);
    }

    this.world = {
      gravity: opts.gravity ?? 0.45,
      friction: opts.friction ?? 0.985,
      airDrag: opts.airDrag ?? 0.0008,
      speedCap: opts.speedCap ?? 12,
      scrollX: 0,
      distance: 0,
      finished: false,
      finishX: opts.finishX ?? 5000,
      startTimestamp: performance.now(),
      timeElapsed: 0
    };

    this.bike = {
      x: opts.startX ?? 100,
      y: 100,
      vx: 0,
      vy: 0,
      angle: 0,
      angVel: 0,
      power: opts.power ?? 0.12,
      torque: opts.torque ?? 0.004,
      wheelBase: opts.wheelBase ?? 60,
      wheelR: opts.wheelR ?? 18,
      wheelSpin: 0,
      onGround: false
    };

    this.keys = new Set();
    this.obstacles = opts.obstacles || this.generateObstacles(opts.obstacleEvery ?? 400);
    this.paused = false;
    this._raf = null;

    this.onFinish = opts.onFinish || (()=>{});
    this.onTick = opts.onTick || (()=>{});

    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("keydown", (e)=> this.keys.add(e.key));
    window.addEventListener("keyup", (e)=> this.keys.delete(e.key));

    this.loop = this.loop.bind(this);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(600, rect.width);
    const h = Math.max(350, rect.height);
    this.canvas.width = Math.floor(w * this.pixelRatio);
    this.canvas.height = Math.floor(h * this.pixelRatio);
  }

  reset() {
    this.world.scrollX = 0;
    this.world.distance = 0;
       this.world.finished = false;
    this.world.startTimestamp = performance.now();
    this.world.timeElapsed = 0;
    this.bike.x = 100;
    this.bike.y = this.terrain(100);
    this.bike.vx = 0;
    this.bike.vy = 0;
    this.bike.angle = Math.atan2(this.terrainSlope(100),1);
    this.bike.angVel = 0;
    this.bike.wheelSpin = 0;
  }

  generateObstacles(stepBase) {
    const rand = this.rand;
    const obs = [];
    for (let i=400; i<4800; ) {
      i += stepBase + rand()*300;
      const type = rand() < 0.6 ? "ramp" : "box";
      if (type === "ramp") {
        obs.push({type, x:i, w:80, h:40, a: -Math.PI/12});
      } else {
        obs.push({type, x:i, w:30+rand()*40, h:30+rand()*60});
      }
    }
    return obs;
  }

  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) this._raf = requestAnimationFrame(this.loop);
  }

  accelerate(dt) {
    const {bike, world} = this;
    const thrust = bike.power * dt;
    bike.vx += Math.cos(bike.angle) * thrust;
    bike.vy += Math.sin(bike.angle) * thrust;
    const sp = Math.hypot(bike.vx, bike.vy);
    if (sp > world.speedCap) {
      const k = world.speedCap / sp;
      bike.vx *= k; bike.vy *= k;
    }
    bike.wheelSpin += thrust * 0.25;
  }

  applyControls(dt) {
    if (this.keys.has("ArrowUp") || this.keys.has("w")) this.accelerate(dt);
    if (this.keys.has(" ")) this.jump();
    if (this.keys.has("ArrowLeft") || this.keys.has("a")) this.bike.angVel -= this.bike.torque * dt;
    if (this.keys.has("ArrowRight") || this.keys.has("d")) this.bike.angVel += this.bike.torque * dt;
    if (this.keys.has("p")) { this.keys.delete("p"); this.togglePause(); }
  }

  jump() {
    if (this.bike.onGround) {
      this.bike.vy -= 7.5;
      this.bike.onGround = false;
    }
  }

  physics(dt) {
    const {bike, world} = this;
    bike.vy += this.world.gravity * dt;
    bike.x += bike.vx * dt;
    bike.y += bike.vy * dt;

    const headX = bike.x + Math.cos(bike.angle) * bike.wheelBase * 0.5;
    const tailX = bike.x - Math.cos(bike.angle) * bike.wheelBase * 0.5;

    const wheelFront = {x: headX, y: bike.y + Math.sin(bike.angle) * bike.wheelBase * 0.5};
    const wheelBack  = {x: tailX, y: bike.y - Math.sin(bike.angle) * bike.wheelBase * 0.5};

    const groundFront = this.terrain(wheelFront.x);
    const groundBack  = this.terrain(wheelBack.x);

    // obstacles
    for (const o of this.obstacles) {
      if (o.type === "box") {
        const top = this.terrain(o.x) - o.h;
        if (bike.x > o.x - o.w*0.5 && bike.x < o.x + o.w*0.5 && bike.y > top - 10 && bike.y < top + o.h + 2) {
          bike.vx *= -0.3;
          bike.vy = -Math.abs(bike.vy) * 0.2;
          bike.y = top - 12;
        }
      } else if (o.type === "ramp") {
        if (Math.abs(bike.x - o.x) < o.w) {
          bike.vx += 0.02 * Math.cos(o.a) * dt;
          bike.vy += 0.02 * Math.sin(o.a) * dt;
        }
      }
    }

    bike.onGround = false;
    if (wheelBack.y > groundBack) {
      const pen = wheelBack.y - groundBack;
      bike.y -= pen * 0.7;
      bike.vy *= -0.05;
      bike.onGround = true;
    }
    if (wheelFront.y > groundFront) {
      const pen = wheelFront.y - groundFront;
      bike.y -= pen * 0.7;
      bike.vy *= -0.05;
      bike.onGround = true;
    }

    if (bike.onGround) {
      const slopeA = Math.atan2(this.terrainSlope(bike.x), 1);
      bike.angle += (slopeA - bike.angle) * 0.15;
      bike.angVel *= 0.7;
      bike.vx *= this.world.friction;
      bike.vy *= this.world.friction;
    } else {
      bike.angle += bike.angVel * dt;
      bike.vx *= (1 - this.world.airDrag * dt);
      bike.vy *= (1 - this.world.airDrag * dt);
    }

    this.world.scrollX = Math.max(0, bike.x - 200);
    this.world.distance = Math.max(this.world.distance, bike.x);
    if (!this.world.finished && bike.x >= this.world.finishX) {
      this.world.finished = true;
      this.world.timeElapsed = (performance.now() - this.world.startTimestamp) / 1000;
      this.onFinish(this.world.timeElapsed);
    }
  }

  drawTerrain() {
    const {ctx, canvas, world} = this;
    const w = canvas.width, h = canvas.height;
    ctx.save();
    ctx.translate(-world.scrollX * this.pixelRatio, 0);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#b6d6ff");
    grad.addColorStop(1, "#e6f2ff");
    ctx.fillStyle = grad;
    ctx.fillRect(world.scrollX*this.pixelRatio, 0, w, h);

    ctx.beginPath();
    let x0 = world.scrollX - 20;
    ctx.moveTo(x0*this.pixelRatio, h);
    for (let x = x0; x <= world.scrollX + w/this.pixelRatio + 20; x += 4) {
      const y = this.terrain(x);
      ctx.lineTo(x*this.pixelRatio, y*this.pixelRatio);
    }
    ctx.lineTo((world.scrollX+w)*this.pixelRatio, h);
    ctx.closePath();
    ctx.fillStyle = "#9bd27c";
    ctx.fill();
    ctx.strokeStyle = "#6aa84f";
    ctx.lineWidth = 2*this.pixelRatio;
    ctx.stroke();

    for (const o of this.obstacles) {
      if (o.type === "box") {
        const top = this.terrain(o.x) - o.h;
        ctx.fillStyle = "#8d6e63";
        ctx.fillRect((o.x - o.w*0.5)*this.pixelRatio, top*this.pixelRatio, o.w*this.pixelRatio, o.h*this.pixelRatio);
      } else {
        ctx.save();
        ctx.translate(o.x*this.pixelRatio, (this.terrain(o.x)-o.h)*this.pixelRatio);
        ctx.rotate(o.a);
        ctx.fillStyle = "#ffc107";
        ctx.fillRect(-o.w*this.pixelRatio*0.5, -8*this.pixelRatio, o.w*this.pixelRatio, 16*this.pixelRatio);
        ctx.restore();
      }
    }

    const fx = this.world.finishX;
    const fy = this.terrain(fx) - 80;
    ctx.fillStyle = "#333";
    ctx.fillRect((fx-2)*this.pixelRatio, (fy)*this.pixelRatio, 4*this.pixelRatio, 82*this.pixelRatio);
    ctx.fillStyle = "#fff";
    for (let i=0;i<5;i++){
      for (let j=0;j<6;j++){
        if ((i+j)%2===0){
          ctx.fillRect((fx+5 + j*8)*this.pixelRatio, (fy + i*8)*this.pixelRatio, 8*this.pixelRatio, 8*this.pixelRatio);
        }
      }
    }

    ctx.restore();
  }

  drawBike() {
    const {ctx, pixelRatio: pr} = this;
    const b = this.bike;
    ctx.save();
    ctx.translate((b.x - this.world.scrollX)*pr, b.y*pr);
    ctx.rotate(b.angle);

    ctx.fillStyle = "#212121";
    ctx.beginPath();
    ctx.arc(-b.wheelBase*0.5*pr, 0, b.wheelR*pr, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(+b.wheelBase*0.5*pr, 0, b.wheelR*pr, 0, Math.PI*2);
    ctx.fill();

    ctx.strokeStyle = "#1565c0";
    ctx.lineWidth = 6*pr;
    ctx.beginPath();
    ctx.moveTo(-b.wheelBase*0.5*pr, -b.wheelR*0.5*pr);
    ctx.lineTo(0, -b.wheelR*1.7*pr);
    ctx.lineTo(+b.wheelBase*0.5*pr, -b.wheelR*0.4*pr);
    ctx.stroke();

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4*pr;
    ctx.beginPath();
    ctx.moveTo(0, -b.wheelR*1.7*pr);
    ctx.lineTo(0, -b.wheelR*2.6*pr);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -b.wheelR*3.0*pr, 8*pr, 0, Math.PI*2);
    ctx.fillStyle = "#222";
    ctx.fill();

    ctx.restore();
  }

  drawHUD() {
    const {ctx, world, pixelRatio: pr} = this;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(10*pr, 10*pr, 240*pr, 84*pr);
    ctx.fillStyle = "#fff";
    ctx.font = `${14*pr}px monospace`;
    ctx.fillText(`Dist: ${Math.floor(world.distance)} m`, 20*pr, 34*pr);
    const t = (performance.now()- world.startTimestamp)/1000;
    ctx.fillText(`Time: ${t.toFixed(2)} s`, 20*pr, 54*pr);
    ctx.fillText(`Finish @ ${world.finishX} m`, 20*pr, 74*pr);
    ctx.restore();
  }

  step() {
    const now = performance.now();
    const dtMs = this._prev ? (now - this._prev) : 16.7;
    this._prev = now;
    const dt = Math.min(2.5, dtMs / 16.7);
    if (!this.paused && !this.world.finished) {
      this.applyControls(dt);
      this.physics(dt);
    }
    this.render();
    this.onTick(this.world);
  }

  render() {
    const {ctx, canvas} = this;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.drawTerrain();
    this.drawBike();
    this.drawHUD();
  }

  start() {
    this.reset();
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(this.loop);
  }

  loop = () => {
    this.step();
    this._raf = requestAnimationFrame(this.loop);
  }

  destroy() {
    cancelAnimationFrame(this._raf);
  }
}