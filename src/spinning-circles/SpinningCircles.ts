import { CircleBufferGeometry } from 'three';
import { Engine } from '../engine/Engine';
import { onWindowResize } from '../engine/Window';
import { Player } from './entities/player/Player';

export class SpinningCircle {
  private _engine: Engine = new Engine();
  get engine(): Engine {
    return this._engine;
  }

  constructor() {
    const player = new Player(
      new CircleBufferGeometry(2, 16),
      this._engine.scene
    );
    this._engine.addGameEntity(player);
    onWindowResize(this._engine.camera, this._engine.renderer);
    this._engine.start();
  }
}
