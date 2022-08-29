import { Component } from "./Component";

export abstract class Entity {
    abstract update(): void;
    protected _components = new Array<Component>();
    public addComponents(component: Component){
        this._components.push(component);
    }
    public getComponentsByType(className : string) : Array<Component>{
        return this._components.filter(component => component.constructor.name === className )
    }
    public get components(){
        return this._components;
    }
}