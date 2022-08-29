import { MeshBasicMaterial, Material as ThreeMaterial } from "three";
import { Component } from "../Component";

export class Material extends Component{

    private _threeMaterial : ThreeMaterial;

    constructor(
        material? : ThreeMaterial
        ){
        super();
        if (!material){
            const threeMeshBasicMaterial = new MeshBasicMaterial( { color: "#FF0000"});
            threeMeshBasicMaterial.wireframe = true;
            this._threeMaterial = threeMeshBasicMaterial;
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