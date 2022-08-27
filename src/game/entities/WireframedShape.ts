import { BufferGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { Entity } from '../../engine/Entity';

export type WireframedShapeData = {
  color?: number | string;
  position?: number[];
  rotationSpeed?: number;
  scale?: number;
  initialScale?: number;
};

export class WireframeShape extends Entity {
  private mesh: Mesh;
  private scaleFactor: number;
  
  constructor(
    private geometry: BufferGeometry,
    {
      position = [0,0,0],
      scale = 4,
      color = "#FF0000",
      initialScale = 1,
    }: WireframedShapeData
  ) {
    super();
    const material = new MeshBasicMaterial({ color });
    this.mesh = new Mesh(this.geometry);
    material.wireframe = true;
    this.mesh.material = material;

    this.scaleFactor = scale;
    
    this.mesh.position.x = position[0];
    this.mesh.position.y = position[1];
    this.mesh.position.z = position[2];

    if (initialScale) {
      this.mesh.scale.x = initialScale | 0.375;
      this.mesh.scale.y = initialScale | 0.375;
      this.mesh.scale.z = initialScale | 0.375;
    }
  }

  public getMesh(): Mesh {
    return this.mesh;
  }

  public getGeometry(): BufferGeometry {
    return this.geometry;
  }

  public update(): void {
  }
}
