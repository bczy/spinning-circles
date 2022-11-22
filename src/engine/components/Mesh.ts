import { BufferGeometry, Mesh as ThreeMesh } from 'three';
import { Component } from '../Component';

export class Mesh extends Component {
  protected _name: string = "Mesh";
  private _threeMesh: ThreeMesh;
  constructor(private _geometry: BufferGeometry) {
    super();
    this._threeMesh = new ThreeMesh(this._geometry);
    this._threeMesh.userData = { engineComponent : this };
  }
  get threeMesh() {
    return this._threeMesh;
  }
  public setThreeMesh(mesh: ThreeMesh) {
    this._threeMesh = mesh;
  }
  update(): void {}
}
