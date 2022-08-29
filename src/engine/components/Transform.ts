import { Component } from "../Component";

export class Transform extends Component{
    constructor(private _position = [0, 0, 0], private _scale = 1){
            super();
    }
    update(): void {
        
    }
    get position(): number[]{
        return this._position;
    }

    set setPosition(position: number[]){
        this._position = position;
    }
    get getPosition(): number{
        return this._scale;
    }

    set setScale(scale: number){
        this._scale = scale;
    }
}