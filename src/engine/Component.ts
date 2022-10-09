import { UUID } from "./utils/UUID";

export abstract class Component extends UUID{
  protected _gameVariables = new Array<string>();
  constructor() {
    super();
  }
  abstract update(): void;
}
