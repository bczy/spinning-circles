import { BufferGeometry, Scene } from 'three';

import { GameEntity, Transform, Material, Mesh } from '../../../engine/index';

import { Satellite } from './Satellite';

export class Player extends GameEntity {
  private _satellite: GameEntity;

  constructor(private _geometry: BufferGeometry, threeScene: Scene) {
    super();
    this._components.push(new Transform([0, 1, 0], 2));
    const mesh = new Mesh(_geometry);
    this._components.push(mesh);
    mesh.setThreeMesh(mesh.threeMesh);
    threeScene.add(mesh.threeMesh);
    const position = this.getComponentsByType(Transform.name) as Transform[];
    position.forEach((as) => {
      as.translate([1, 1, 2]);
    }); 

    const material = new Material(this.mesh);
    this.addComponent(material);

    this._satellite = new Satellite(threeScene);
    this._satellite.addComponent(material);
    this._children.push(this._satellite);
  }

  get geometry(): BufferGeometry {
    return this._geometry;
  }

  public update(): void {}
}
