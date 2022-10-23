import { generateUUID } from "three/src/math/MathUtils";

export abstract class Component{
  private _uuid = generateUUID();
  protected abstract _name: string;
  protected abstract update(): void;
  get name(){
    return this._name;
  }
  get uuid(){
    return this._uuid;
  }
}
