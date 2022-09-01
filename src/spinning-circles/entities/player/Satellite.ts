import { CircleBufferGeometry, Scene } from 'three';
import { GameEntity, Material, Transform, Mesh } from '../../../engine/index';

export class Satellite extends GameEntity {
  constructor(threeScene: Scene) {
    super();
    const geom = new CircleBufferGeometry(2, 16);

    this._components.push(new Material());

    this.setMesh(new Mesh(geom));

    threeScene.add(this.mesh.threeMesh);
    this._components.push(new Transform([1, 0, 0], 1));

    const material = new Material(this.mesh);
    this.addComponent(material);
  }

  public update(): void {}
}
