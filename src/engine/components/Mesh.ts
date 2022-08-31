import { BufferGeometry, Mesh as ThreeMesh } from "three";
import { Component } from "../Component";

export class Mesh extends Component{
    private _threeMesh: ThreeMesh;
    constructor(
        private _geometry : BufferGeometry
        ){
        super();
    }
    get threeMesh(){
        return this._threeMesh;
    }
    update(): void {
        
    }
    
}