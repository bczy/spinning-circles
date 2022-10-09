import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';
import { Entity } from './Entity';
import { GameEntity } from './GameEntity';

import { EffectComposer } from './vendor/threejs/EffectComposer';
import { RenderPass } from './vendor/threejs/RenderPass';

export class Engine {
  private _entites = new Array<Entity>();
  get entities(): Array<Entity> {
    return this._entites;
  }
  get scene(): Scene {
    return this._scene;
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
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this._scene, this.camera));

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 11.125;
  }

  public addEntity(entity: Entity) {
    this._entites.push(entity);
  }

  public addGameEntity(gameEntity: GameEntity) {
    this._entites.push(gameEntity);
  }

  public start(): void {
    // TODO: state machine
    this.update();
  }

  public update(): void {
    this._entites.forEach((entity) => entity.update());
    this.updateHud();
    this.composer.render();
    requestAnimationFrame(() => this.update());
  }
  public updateHud(): void {
    this._entites.forEach(entity =>{ 
      
      const domEntity = document.getElementById(entity.uuid);
      
      if (!domEntity){
        const section  = document.createElement("section");
        section.id = entity.uuid;
        section.innerHTML = entity.uuid;
        document.getElementById("hud").appendChild(section)
        entity.components.forEach(entry => {
          const section  = document.createElement("article");
          section.id = entry.uuid;
          section.innerHTML = Object.keys(entry).toString();
          document.getElementById("hud").appendChild(section)
        })

      }
     
    })
  }
}
