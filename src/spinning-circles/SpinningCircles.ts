import EngineStateMachine from '../engine/StateMachines/EngineStateMachine';

export class SpinningCircle {
  private _engineService = EngineStateMachine;

  constructor() {
    this._engineService.start().send("INIT_DONE");
    this._engineService.send("START_ENGINE");
  }
}
