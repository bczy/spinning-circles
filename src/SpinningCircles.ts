import { CircleBufferGeometry } from 'three';
import { Engine } from './engine/Engine';
import { WireframeShape } from './game/entities/WireframedShape';

export class SpinningCircle {
  private _engine : Engine = new Engine();
  get engine() : Engine { return this._engine};

  private _entity = new WireframeShape(new CircleBufferGeometry(2,16), {});
  constructor() {
    this._engine.entities.push(this._entity);
    this._engine.scene.add(this._entity.getMesh());
    this.update();
  }

  private update(): void {
    this._engine.update();
  }
}
