import { CircleBufferGeometry, RingBufferGeometry, TorusBufferGeometry } from 'three';
import { Material } from './components/Material';
import { Mesh } from './components/Mesh';
import { Transform } from './components/Transform';
import { Entity } from './Entity';

export class GameEntity extends Entity {
  private _mesh: Mesh;
  constructor() {
    super();
    this._mesh = new Mesh(new TorusBufferGeometry( 6, 3, 16, 10))
    this._components.push(this._mesh);
    this._components.push(new Material(this._mesh));
    this._components.push(new Transform([0, 0, 0], 1, this._mesh.threeMesh));
  }
  get mesh() {
    return this._mesh;
  }
  protected setMesh(mesh: Mesh): void {
    this._components.push(mesh);
    this._mesh = mesh;
  }
  update(): void {}
}
