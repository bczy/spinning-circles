import { MeshBasicMaterial, Material as ThreeMaterial } from "three";
import { Component } from "../Component";
import { Mesh } from "./Mesh";

export class Material extends Component{

    private _threeMaterial : ThreeMaterial;

    constructor( _mesh: Mesh, material? : ThreeMaterial){
        super();
        if (!material){
            const threeMeshBasicMaterial = new MeshBasicMaterial( { color: "#FF0000"});
            threeMeshBasicMaterial.wireframe = true;
            this._threeMaterial = threeMeshBasicMaterial;
        } else {
            this.setThreeMaterial(material);
        }
    }

    public setThreeMaterial(material: ThreeMaterial){
        this._threeMaterial = material;
    }

    public get material(){
        return this._threeMaterial;
    }

    update(): void {
        
    }
}