import { Scene } from "three";
import { Mesh } from "./components/Mesh";
import { Entity } from "./Entity";

export class GameEntity extends Entity{

    constructor(scene : Scene, mesh: Mesh){
        super();
        this._components.push(mesh);
        scene.add(mesh.threeMesh);
    }

    update(): void {
    }

}