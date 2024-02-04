//Agafem les mides del canvas
let width = window.innerWidth;
let height = window.innerHeight;
//Exportem la calse per a la seva utilitzacio
export class Pilota {
    constructor(x, y, velX, velY, color, mida) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.mida = mida;
    }
    dibuixa(ctx) {
        ctx.beginPath(); // Per començar a dibuixar formes al canvas
        ctx.fillStyle = this.color; //Color amb que dibuixarem
        ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); //Dibuix d’un arc
        ctx.fill(); // Finalitza el dibuix i l’omple amb el color ja esmenat
    }
    //Comprova si la seva posicio i el radi de la pilota sigui igual que les limitacions del canvas, i multiplica per negatiu per canviar la posicio,
    // ja que si es mou en a la esquerra o abaix, la seva posicio sera negativa.
    mou() {
        if (this.x + this.mida >= width) {
            this.velX = this.velX * -1;
        } else if (this.x - this.mida <= 0) {
            this.velX = this.velX * -1;
        }
        if (this.y + this.mida >= height) {
            this.velY = this.velY * -1;
        } else if (this.y + this.mida <= 0) {
            this.velY = this.velY * -1;
        }
        this.x += this.velX;
        this.y += this.velY;
    }
}