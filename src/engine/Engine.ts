import { Scene, WebGLRenderer, PerspectiveCamera, Mesh } from 'three';
import { Component } from './Component';
import { Entity } from './Entity';
import { GameEntity } from './GameEntity';
import { Hud } from './hud/Hud';

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

  public camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1);

  public constructor() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this._scene, this.camera));

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.camera.position.z = 11.125;
    this._hud = new Hud(this._entites);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () =>{
      onWindowResize(this.camera, this.renderer);
    });
    onWindowResize(this.camera, this.renderer);
  }

  public addEntity(entity: Entity) {
    this._entites.push(entity);
  }

  public addGameEntity(gameEntity: GameEntity) {
    this._entites.push(gameEntity);
    this._scene.add(gameEntity.mesh.threeMesh);
  }

  public createGameEntity(components = new Array<Component>(), mesh = new Mesh()){
    const entity = new GameEntity();
    entity.addComponents(components);
    return entity;
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
