import { Component, ComponentProperty } from '../Component';

import { Euler, Mesh } from 'three';

export class Transform extends Component {
  protected _name: string = "Transform";

  constructor(
    position : Array<number> = [0, 0, 0], 
    scale = 1, 
    mesh?: Mesh) 
  {
      super();
      this.init(position, scale, mesh)
  }
  init(position: Array<number>, scale: number, mesh?: Mesh) : void {
    this.addProperty("position", position, ((value: number[]) => this.setPosition(value)));
    this.addProperty("rotation", [0,0,0], ((value: number[]) => this.setRotation(value)));
    this.addProperty("scale", scale, (((value: number) => this.setScale(value))));
    this.addProperty("mesh", mesh, (e: any)=>{ console.log(e)});
  }
  update(): void {}

  get position(): Array<number> {
    return this.getProperty<Array<number>>("position");
  }

  public setPosition(position: number[]): Transform {
    const mesh = this.getProperty<ComponentProperty>("mesh").value as unknown as Mesh;
    mesh.position.set(position[0], position[1], position[2]);
    return this;
  }
  get getPosition(): Array<number> {
    return this.getProperty("position");
  }

  public setRotation(rotation: number[]): Transform {
    const mesh = this.getProperty<ComponentProperty>("mesh").value as unknown as Mesh;
    const q = new Euler(rotation[0] / 90, rotation[1] / 90, rotation[2] / 90);
    mesh.setRotationFromEuler(q)
    return this;
  }

  public setScale(scale: number) {
    const mesh = this.getProperty<ComponentProperty>("mesh").value as unknown as Mesh;
    mesh.scale.setX(scale);
    mesh.scale.setY(scale);
    mesh.scale.setZ(scale);
  }
}
