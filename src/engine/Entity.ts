import { Component } from "./Component";
import { UUID } from "./utils/UUID";
export abstract class Entity extends UUID{
    protected _components = new Array<Component>();
    protected _children = new Array<Entity>();
    
    public abstract update(): void;
    
    constructor(){
        super();
    }

    public addComponent(component: Component){
        this._components.push(component);
    }

    public addComponents(components: Array<Component>){
        components.forEach(component => this._components.push(component));
    }

    public getComponentsByType(componentType: string) : Component[]{
        return this._components.filter(component => 
            componentType === component.constructor.name ); 
    } 

    public getComponentByType(componentType: string) : Component{
        const componentIndex = this._components.findIndex(component => 
            componentType === component.constructor.name);
        return this._components[componentIndex]; 
    } 
    
    public get components(){
        return this._components;
    }
    
    public get uuid(){
        return this._uuid;
    }
}