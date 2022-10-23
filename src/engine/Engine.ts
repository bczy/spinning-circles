import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';
import { Entity } from './Entity';
import { GameEntity } from './GameEntity';
import { Hud } from './hud/Hud';
import EngineStateMachine from './StateMachines/EngineStateMachine';

import { EffectComposer } from './vendor/threejs/EffectComposer';
import { RenderPass } from './vendor/threejs/RenderPass';
import { onWindowResize } from './Window';

export class Engine {
  private _entites = new Array<Entity>();
  private _hud : Hud;

  get entities(): Array<Entity> {
    return this._entites;
  }
  get scene(): Scene {
    return this._scene;
  }
  get hud(): Hud {
    return this._hud;
  }
  private _scene = new Scene();

  public renderer = new WebGLRenderer();
  private composer: EffectComposer;

  public camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1
  );

  public constructor() {
    console.log("Engine constructor...")
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this._scene, this.camera));

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 11.125;
    this._hud = new Hud(this._entites);
    document.body.appendChild(this.renderer.domElement);
    onWindowResize(this.camera, this.renderer);
  }

  public addEntity(entity: Entity) {
    this._entites.push(entity);
  }

  public addGameEntity(gameEntity: GameEntity) {
    this._entites.push(gameEntity);
    console.log("game entity added:", this._entites)
  }

  public start(): void {
    // TODO: state machine
    this.update();
  }

  public update(): void {
    this._entites.forEach((entity) => entity.update());
    this.composer.render();
    this._hud.update();
    requestAnimationFrame(() => this.update());
  }

  public updateHud(): void {
    
  }
}
