import { Mesh } from "three";
import { generateUUID } from "three/src/math/MathUtils";

type ValueTypes = number|Array<number>|string|Mesh|object;

export type ComponentProperty = {
  value: ValueTypes,
  callback: (e) => void
};

export abstract class Component{
  private _properties = new Map<string, ComponentProperty>();
  private _uuid = generateUUID();
  protected abstract _name: string;
  protected abstract update(): void;
  get properties(): Map<string, ComponentProperty>{
    return this._properties;
  }
  get name(){
    return this._name;
  }
  get uuid(){
    return this._uuid;
  }
  
  public addProperty(id: string, value: ValueTypes, callback){
    this._properties.set(id, {value, callback});
  }

  public getProperty<ComponentProperty>(id: string) : ComponentProperty{
    return this._properties.get(id) as ComponentProperty;
  }

  public updateProperty(id: string, value: ValueTypes){
    if (this._properties.get(id)){
      this._properties.set(id, {value, callback: this._properties.get(id).callback});
      this._properties.get(id).callback(value);
    }
  }
}
