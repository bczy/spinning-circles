import { CircleBufferGeometry } from 'three';
import { Engine } from '../engine/Engine';
import { WireframeShape } from './entities/WireframedShape';

export class SpinningCircle {
  private _engine : Engine = new Engine();
  get engine() : Engine { return this._engine};

  constructor() {
    const entity = new WireframeShape(new CircleBufferGeometry(2,16), {}, this._engine.scene);
    this.update();
  }

  private update(): void {
    this._engine.update();
  }
}
