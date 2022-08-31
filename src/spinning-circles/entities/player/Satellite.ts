import { CircleBufferGeometry, Scene, Mesh} from 'three';
import { GameEntity, Material, Transform } from '../../../engine/index';

export class Satellite extends GameEntity {

  constructor(threeScene : Scene) {

    super(); 
    threeScene.add(new Mesh(new CircleBufferGeometry(2,16)))
    this._components.push(new Transform([1, 0, 0], 1));

    const material = new Material(this.mesh);
    this.addComponent(material);
  }

  public update(): void {
  }
}
