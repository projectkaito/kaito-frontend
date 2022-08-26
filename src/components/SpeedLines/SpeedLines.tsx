import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 20,
  },
}));

interface IProps {
  open?: boolean;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const SpeedLines: React.FC<IProps> = ({ open }) => {
  const classes = useStyles();
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    let canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    class SpeedLine {
      speed = 0;
      x = 0;
      y = 0;
      life = 0;
      alpha = 0;
      angle = 0;
      size = 0;
      inRadius = 0;
      outRadius = 0;
      curLife = 0;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.speed = rand(3, 4);
        this.life = this.curLife = rand(500, 900);
        this.alpha = rand(0.25, 1);
        this.angle = Math.PI * rand(0, 2);
        this.size = rand(20, 40);
        this.inRadius = rand(300, 400);
        this.outRadius = cw;
      }

      update() {
        this.curLife -= this.speed;
        this.inRadius += this.speed * 4;

        this.alpha *= this.curLife / this.life;
        this.size *= this.curLife / this.life;

        this.draw();
      }

      draw() {
        const { x, y, size, angle, alpha } = this,
          { inRadius, outRadius } = this;

        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(angle);

        ctx!.beginPath();
        ctx!.moveTo(0, inRadius);
        ctx!.lineTo(size, outRadius);
        ctx!.lineTo(-size, outRadius);
        ctx!.closePath();

        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx!.fill();
        ctx!.restore();
      }
    }

    // Animation
    const lines: SpeedLine[] = [];
    const MAX_LINES = 300;

    function updateLines() {
      lines.forEach((line, i) => {
        if (!line || line.curLife < 0) lines[i] = new SpeedLine(cw / 2, ch / 2);
        lines[i].update();
      });
    }

    for (let i = 0; i < MAX_LINES; i++) {
      lines[i] = new SpeedLine(cw / 2, ch / 2);
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, cw, ch);
      updateLines();
    }

    animate();
    const resizeListener = () => {
      cw = canvas!.width = window.innerWidth;
      ch = canvas!.height = window.innerHeight;
      updateLines();
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      ref.current!.style.display = "block";
    } else {
      ref.current!.style.display = "none";
    }
  }, [open]);

  return <canvas ref={ref} className={classes.root} />;
};

export default SpeedLines;
