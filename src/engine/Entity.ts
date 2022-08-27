import { Component } from "./Component";

export abstract class Entity {
    abstract update(): void;
    private _components = new Array<Component>();
    public getComponentsByType(className : string) : Array<Component>{
        return this._components.filter(component => component.constructor.name === className )
    }
}