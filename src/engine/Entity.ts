import { generateUUID } from "three/src/math/MathUtils";
import { Component } from "./Component";
export abstract class Entity {
    protected _components = new Array<Component>();
    protected _children = new Array<Entity>();
    
    public abstract update(): void;
    
    constructor(private _id = generateUUID()){
    }

    public addComponent(component: Component){
        this._components.push(component);
    }

    public addComponents(components: Array<Component>){
        components.forEach(component => this._components.push(component));
    }

    public getComponentsByType(componentType: string) : Component[]{
        const muf = this._components.filter(component => {
            console.log(componentType, component.constructor.name);
            return componentType === component.constructor.name });
        console.log(muf)
        return muf 
    } 
    
    public get components(){
        return this._components;
    }
    
    public get id(){
        return this._id;
    }
}