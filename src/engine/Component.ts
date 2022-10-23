import { generateUUID } from "three/src/math/MathUtils";

export type ComponentProperty = number|Array<number>|string|object;
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
  
  public addProperty(id: string, value: ComponentProperty){
    this._properties.set(id, value);
  }

  public getProperty<ComponentProperty>(id: string) : ComponentProperty{
    return this._properties.get(id) as ComponentProperty;
  }

  public updateProperty(id: string, value: ComponentProperty){
    if (this._properties.get(id)){
      this._properties.set(id, value);
    }
  }
}
