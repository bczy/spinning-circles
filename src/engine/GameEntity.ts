import { Scene } from "three";
import { Mesh } from "./components/Mesh";
import { Entity } from "./Entity";

export class GameEntity extends Entity{

    constructor(scene : Scene, private _mesh: Mesh){
        super();
        this._components.push(_mesh);
        scene.add(this._mesh.threeMesh);
    }
    get mesh(){
        return this._mesh;
    }
    update(): void {
    }

}