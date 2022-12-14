import { TorusBufferGeometry } from 'three';
import { Material } from '../components/Material';
import { Mesh } from '../components/Mesh';
import { Transform } from '../components/Transform';
import { Entity } from './Entity';

export class GameEntity extends Entity {
  private _mesh: Mesh;
  constructor(mesh = undefined) {
    super();
    this._mesh = mesh || new Mesh(new TorusBufferGeometry( 3, 1, 16, 10));
    this._uuid = this.mesh.threeMesh.uuid;
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
