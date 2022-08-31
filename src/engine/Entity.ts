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

    public getComponentsByType<T extends Component>(toto: typeof Component) : T[]{
        console.log(toto)
        return this._components.filter(component => typeof toto === typeof component ) as T[];
    } 
    
    public get components(){
        return this._components;
    }
    
    public get id(){
        return this._id;
    }
}