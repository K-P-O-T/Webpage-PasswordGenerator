(() => {

    const cnv = document.querySelector(`canvas`);
    const ctx = cnv.getContext(`2d`);

    let cw, ch, cx, cy;

    function resizeCanvas() {
        cw = cnv.width = innerWidth;
        ch = cnv.height = innerHeight;

        cx = cw / 2;
        cy = ch / 2;
    }

    resizeCanvas();

    window.addEventListener(`resize`, resizeCanvas);

    const cfg = {
        hue: 318,
        bgFilColor: 'rgba(50, 50, 50, .05)',
        dirsCount: 6,
        stepsToTurn: 8,
        dotSize: 3,
        dotsCount: 1000,
        dotVelocity: 5,
        distance: 90,
        gradientLen: 5,
    }


    function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
        ctx.globalCompositeOperation = gco;
        ctx.shadowColor = shadowColor || 'black';
        ctx.shadowBlur = shadowBlur || 1;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    class Dot {
        constructor() {
            this.pos = { x: cx, y: cy };
            this.dir = (Math.random() * 3 | 0) * 2;
            this.step = 0;
        }

        redrawDot() {
            let xy = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy);
            let color = `hsl( 318, 100%, 38%)`;
            let size = cfg.dotSize;
            let blur = cfg.dotSize - Math.sin(xy / 8) * 2;
            let x = this.pos.x - size / 2;
            let y = this.pos.y - size / 2;

            drawRect(color, x, y, size, size, color, blur, `lighter`);
        }

        moveDot() {
            this.step++;
            this.pos.x += dirsList[this.dir].x * cfg.dotVelocity;
            this.pos.y += dirsList[this.dir].y * cfg.dotVelocity;
        }

        changeDir() {
            if (this.step % cfg.stepsToTurn === 0) {
                this.dir = Math.random() > .5 ? (this.dir + 1) % cfg.dirsCount : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount;
            }
        }

        killDot(id) {
            let percent = Math.random() * Math.exp(this.step / cfg.distance);
            if (percent > 100) {
                dotsList.splice(id, 1);
            }
        }
    }


    let dirsList = [];
    function createDirs() {
        for (let i = 0; i < 360; i += 360 / cfg.dirsCount) {
            let x = Math.cos(i * Math.PI / 180);
            let y = Math.sin(i * Math.PI / 180);
            dirsList.push({ x: x, y: y });
        }
    }
    createDirs();


    let dotsList = [];
    function addDot() {
        if (dotsList.length < cfg.dotsCount && Math.random() > .8) {
            dotsList.push(new Dot());
            cfg.hue = (cfg.hue + 1) % 360;
        }
    }


    function refreshDots() {
        dotsList.forEach((i, id) => {
            i.moveDot();
            i.redrawDot();
            i.changeDir();
            i.killDot(id);

        })
    }

    function loop() {
        drawRect(cfg.bgFilColor, 0, 0, cw, ch, 0, 0, `normal`);
        addDot();
        refreshDots();


        requestAnimationFrame(loop);
    }
    loop();

})();