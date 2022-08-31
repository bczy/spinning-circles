import { BufferGeometry, Scene } from 'three';
import { Component } from '../../../engine/Component';

import { GameEntity, Transform, Material, Mesh } from '../../../engine/index';

import { Satellite } from './Satellite';

export class Player extends GameEntity {
  private _satellite : GameEntity;

  constructor(
    private _geometry: BufferGeometry,
    threeScene : Scene) {

    super();
    this._components.push(new Transform([0, 0, 0], 2));
    const mesh = new Mesh(_geometry);
    this._components.push(mesh);
    threeScene.add(mesh.threeMesh);
    const muf = this.getComponentsByType<Transform>(Transform);
    muf.forEach(as => {
      console.log("muf player", as)
      as.setPosition([100,1,1])
    })

    const material = new Material(this.mesh);
    this.addComponent(material);

    this._components.push(material)
    
    this._satellite = new Satellite(threeScene);
    this._satellite.addComponent(material);
    this._children.push(this._satellite);
  }

  get geometry(): BufferGeometry {
    return this._geometry;
  }

  public update(): void {
  }
}
