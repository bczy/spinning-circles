import { Scene } from "three";

import { Mesh } from "./components/Mesh";
import { Entity } from "./Entity";

export class GameEntity extends Entity{
    private _mesh: Mesh
    constructor(){
        super();
    }
    get mesh(){
        return this._mesh;
    }
    protected setMesh(_mesh: Mesh): void{
        this._components.push(_mesh);
    }
    update(): void {
    }

}