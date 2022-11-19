import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  Raycaster,
  Vector2,
} from 'three';
import { TransformControls } from 'three-stdlib';

import { Component } from './Component';
import { Entity } from './entities/Entity';
import { GameEntity } from './entities/GameEntity';
import { Hud } from './hud/Hud';

import { EffectComposer } from './vendor/threejs/EffectComposer';
import { RenderPass } from './vendor/threejs/RenderPass';

export class Engine {
  private _entites = new Array<Entity>();
  private _hud: Hud;
  private _raycaster: Raycaster;
  private _pointer = new Vector2();
  private _lastIntersected: any;
  private _control: TransformControls<PerspectiveCamera>;

  get lastIntersected(): any{
    return this._lastIntersected;
  };
  get entities(): Array<Entity> {
    return this._entites;
  }
  get scene(): Scene {
    return this._scene;
  }
  get hud(): Hud {
    return this._hud;
  }
  get raycaster(): Raycaster{
    return this._raycaster;
  }
  get renderer(): WebGLRenderer{
    return this._renderer;
  }
  get control(): TransformControls<PerspectiveCamera>{
    return this._control;
  }

  private _scene = new Scene();

  private _renderer = new WebGLRenderer();
  private composer: EffectComposer;

  public camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1
  );

  public constructor() {
    this._pointer = new Vector2(0, 0);
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this._scene, this.camera));

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this._control = new TransformControls(this.camera, this.renderer.domElement);

    this.scene.add(this.control);

    this.camera.position.z = 12.5;
    this._hud = new Hud(this._entites);

    this._raycaster = new Raycaster();

    //TODO move to new window class (init)
    document.body.appendChild(this.renderer.domElement);
  }

  public addEntity(entity: Entity) {
    this._entites.push(entity);
  }

  public onPointerDown(e: Event) {
    if (this._lastIntersected) {
      this._lastIntersected.material.color = { r: 0, g: 1, b: 1 };
      this.control.attach(this._lastIntersected);
    }
  }

  public onPointerMove(event: MouseEvent) {
    this._pointer.x = (event.clientX / (window.innerWidth - 350)) * 2 - 1;
    this._pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  public addGameEntity(gameEntity: GameEntity) {
    this._entites.push(gameEntity);
    this._scene.add(gameEntity.mesh.threeMesh);
  }

  public createGameEntity(
    components = new Array<Component>(),
    mesh = new Mesh()
  ) {
    const gameEntity = new GameEntity(mesh);
    gameEntity.addComponents(components);
    return gameEntity;
  }
  public start(): void {
    this.update();
  }

  public update(): void {
    this._entites.forEach((entity) => entity.update());
    this.composer.render();
    this._raycaster.setFromCamera(this._pointer, this.camera);
    const intersects = this._raycaster.intersectObjects(
      this._scene.children,
      false
    );

    if (intersects.length > 0) {
      if (this._lastIntersected != intersects[0].object) {

        this._lastIntersected = intersects[0].object;
        this. _lastIntersected.material.color = { r: 1, g: 1, b: 0 };
      }
    } else {
      if (this._lastIntersected) this._lastIntersected.material.color = { r: 0, g: 1, b: 0 };
      //this._lastIntersected = undefined;
    }
    requestAnimationFrame(() => this.update());
  }

  public updateHud(): void {}
}
