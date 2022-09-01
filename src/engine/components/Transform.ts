import { Component } from "../Component";

import { Mesh } from "three"
export class Transform extends Component{
    constructor(
        private _position = [0, 0, 0],
        private _scale = 1){
            super();
    }

    update(): void {
        
    }
    
    get position(): number[]{
        return this._position;
    }

    public translate(position: number[], mesh : Mesh) : Transform{
        mesh.translateX(position[0])
        mesh.translateY(position[1])
        mesh.translateZ(position[2])
        return this;
    }

    public setPosition(position: number[], mesh : Mesh) : Transform{
        mesh.position.setX(position[0])
        mesh.position.setY(position[0])
        mesh.position.setZ(position[0])
        return this;
    }
    get getPosition(): number{
        return this._scale;
    }

    set setScale(scale: number){
        this._scale = scale;
    }
}