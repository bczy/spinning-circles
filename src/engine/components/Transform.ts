import { Component } from "../Component";
import { Mesh } from "./Mesh";

import { Mesh as ThreeMsh} from "three"

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

    public setPosition(position: number[]){
        this._position = position;
    }
    get getPosition(): number{
        return this._scale;
    }

    set setScale(scale: number){
        this._scale = scale;
    }
}