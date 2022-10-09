import { SpinningCircle } from "./spinning-circles/SpinningCircles";
import { onWindowResize } from './engine/Window';

const spinningCircle = new SpinningCircle();

document.body.appendChild(spinningCircle.engine.renderer.domElement);

window.addEventListener('resize', () =>{
    onWindowResize(spinningCircle.engine.camera, spinningCircle.engine.renderer);
    const hud = document.getElementById("hud");
    spinningCircle.engine.updateHud()
  }
);

document.body.style.margin = '0';