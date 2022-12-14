import { MeshBasicMaterial, Material as ThreeMaterial } from 'three';
import { Component } from '../Component';
import { Mesh } from './Mesh';

export class Material extends Component {
  protected _name = "Material";
  private _threeMaterial: ThreeMaterial;

  constructor(mesh?: Mesh, material?: ThreeMaterial) {
    super();
    if (!material) {
      const threeMeshBasicMaterial = new MeshBasicMaterial({
        color: 'rgb(0, 255, 0)',
      });
      threeMeshBasicMaterial.wireframe = true;
      this._threeMaterial = threeMeshBasicMaterial;
    } else {
      this.setThreeMaterial(material);
    }
    if (mesh){
        mesh.threeMesh.material = this._threeMaterial;
    }
  }

  public setThreeMaterial(material: ThreeMaterial) {
    this._threeMaterial = material;
  }

  public get material() {
    return this._threeMaterial;
  }

  update(): void {}
}
