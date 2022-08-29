import { BufferGeometry, CircleBufferGeometry, Scene} from 'three';
import { Material } from '../../engine/components/Material';
import { Mesh } from '../../engine/components/Mesh';
import { Transform } from '../../engine/components/Transform';
import { GameEntity } from '../../engine/GameEntity';

export type WireframedShapeData = {
  color?: number | string;
  position?: number[];
  rotationSpeed?: number;
  scale?: number;
  initialScale?: number;
};

export class WireframeShape extends GameEntity {
  private _mesh: Mesh;
  
  constructor(
    private _geometry: BufferGeometry,
    {
      position = [0,0,0],
      scale = 2
    }: WireframedShapeData,
    threeScene : Scene
  ) {
    super(threeScene, new Mesh(new CircleBufferGeometry(1, 32)));

    this._components.push(new Transform(position, scale));
    
    const material = new Material();
    this.addComponents(material);

  }

  get mesh(): Mesh {
    return this._mesh;
  }

  get geometry(): BufferGeometry {
    return this._geometry;
  }

  public update(): void {
  }
}
