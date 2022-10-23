import { CircleBufferGeometry } from 'three';
import { Material } from './components/Material';
import { Mesh } from './components/Mesh';
import { Transform } from './components/Transform';
import { Entity } from './Entity';

export class GameEntity extends Entity {
  private _mesh: Mesh;
  constructor() {
    super();
    this._mesh = new Mesh(new CircleBufferGeometry(1, 16))
    this._components.push(new Transform([0, 2, 0], 2));
    this._components.push(this._mesh);
    this._components.push(new Material(this._mesh));
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
