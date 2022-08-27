import { Vector3 } from "three";
import { Component } from "../Component";

export class Transform extends Component{
    update(): void {
        
    }
    
    private _position: Vector3;

    get getPosition(): Vector3{
        return this._position;
    }

    set setPosition(position: Vector3){
        this._position = position;
    }
}