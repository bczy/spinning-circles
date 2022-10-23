import { Component } from '../Component';

import { Mesh } from 'three';

export class Transform extends Component {
  protected _name: string = "Transform";

  constructor(
    position : Array<number> = [0, 0, 0], 
    scale = 1, 
    mesh?: Mesh) 
  {
      super();
      this.addProperty("position", position);
      this.addProperty("scale", scale);
      this.addProperty("mesh", mesh);
  }

  update(): void {}

  get position(): Array<number> {
    return this.getProperty<Array<number>>("position");
  }

  public translate(position: number[]): Transform {
    const mesh = this.getProperty<Mesh>("mesh");
    mesh.translateX(position[0]);
    mesh.translateY(position[1]);
    mesh.translateZ(position[2]);
    
    position[0] = mesh.position.x
    position[1] = mesh.position.y
    position[2] = mesh.position.z
    return this;
  }

  public setPosition(position: number[]): Transform {
    this.updateProperty("position", position);

    const mesh = this.getProperty<Mesh>("mesh");
    mesh.position.setX(position[0]);
    mesh.position.setY(position[0]);
    mesh.position.setZ(position[0]);
    return this;
  }
  get getPosition(): Array<number> {
    return this.getProperty("position");
  }

  set setScale(scale: number) {
    this.updateProperty("scale", scale);
  }
}
