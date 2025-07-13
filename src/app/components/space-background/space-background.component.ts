import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

@Component({
  selector: 'app-space-background',
  templateUrl: './space-background.component.html',
  styleUrls: ['./space-background.component.scss']
})
export class SpaceBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationId!: number;
  private centerX!: number;
  private centerY!: number;
  private speed = 0.5;
  private readonly maxStars = 400;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    this.initStars();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  private initCanvas(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
  }

  private initStars(): void {
    this.stars = [];
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push(this.createStar());
    }
  }

  private createStar(): Star {
    return {
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1000,
      prevZ: 0
    };
  }

  private animate(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.updateAndDrawStars();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private updateAndDrawStars(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
    
    this.stars.forEach(star => {
      star.prevZ = star.z;
      star.z -= this.speed;
      
      if (star.z <= 0) {
        star.x = (Math.random() - 0.5) * 2000;
        star.y = (Math.random() - 0.5) * 2000;
        star.z = 1000;
        star.prevZ = star.z;
      }
      
      const x = (star.x / star.z) * 200 + this.centerX;
      const y = (star.y / star.z) * 200 + this.centerY;
      
      const prevX = (star.x / star.prevZ) * 200 + this.centerX;
      const prevY = (star.y / star.prevZ) * 200 + this.centerY;
      
      const size = (1 - star.z / 1000) * 2;
      const opacity = 1 - star.z / 1000;
      
      if (x >= 0 && x <= this.canvas.nativeElement.width && 
          y >= 0 && y <= this.canvas.nativeElement.height) {
        
        this.ctx.globalAlpha = opacity;
        
        // Draw star trail
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineTo(x, y);
        this.ctx.lineWidth = size;
        this.ctx.stroke();
        
        // Draw star point
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
    
    this.ctx.globalAlpha = 1;
  }
} 