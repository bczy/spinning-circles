import { SpinningCircle } from "./spinning-circles/SpinningCircles";
import { onWindowResize } from './engine/graphics/Window';

const spinningCircle = new SpinningCircle();

document.body.appendChild(spinningCircle.engine.renderer.domElement);
window.addEventListener('resize', () =>
  onWindowResize(spinningCircle.engine.camera, spinningCircle.engine.renderer)
);
document.body.style.margin = '0';