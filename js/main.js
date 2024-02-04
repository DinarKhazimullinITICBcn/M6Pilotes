//Importem la clase pilota
import { Pilota } from "./pilota.js";
let pilotes = [];

// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// funció per generar un número aleatori entre dues xifres

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// funció per generar un color aleatori

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
//Creem funcio de loop que comprova primer si pilotes no te una llargada de 25 per a que no estigui creant infinitament pilotes. Crea les pilotes de manera random com l'enunciat
//ho demana, despres posa el fons del canvas negre i per cada pilota en pilotes, truca la funcio dibuixa i la funcio de moure. Despres, per cada iteracio de la funcio loop, truca
//la funcio canviColor().
function loop() {
  if (pilotes.length !== 25) {
    for (let i = 0; i < 25; i++) {
      let mida = random(10, 20);
      let posicioX = random(mida, width - mida);
      let posicioY = random(mida, height - mida);
      let velX = random(-7, 7);
      let velY = random(-7, 7);
      let pilota = new Pilota(posicioX, posicioY, velX, velY, randomRGB(), mida);
      pilotes.push(pilota);
    }
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  for (let pilota of pilotes) {
    pilota.dibuixa(ctx);
    pilota.mou();
  }
  canviColor();
  requestAnimationFrame(loop)
}
//Truca loop
loop();
//Aquesta funcio fa 2 for loops per a que vagin per cadascun de las pilotes, comprova que no siguin la mateixa i fa un teorema de pitagores amb les distancies. En cas
// de que el seu radi es igual, canvia els seu color.
function canviColor() {
  for (let pilota1 of pilotes) {
    for (let pilota2 of pilotes) {
      if (pilota1 !== pilota2) {
        let distanciaHorizontal = pilota1.x - pilota2.x;
        let distanciaVertical = pilota1.y - pilota2.y;
        let distancia = Math.sqrt(distanciaHorizontal * distanciaHorizontal + distanciaVertical * distanciaVertical);
        if (distancia <= (pilota1.mida + pilota2.mida)) {
          pilota1.color = randomRGB();
          pilota2.color = randomRGB();
        }
      }
    }
  }
}
