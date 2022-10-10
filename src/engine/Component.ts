import { UUID } from "./utils/UUID";

export abstract class Component extends UUID{
  constructor() {
    super();
  }
  protected abstract _name: string;
  protected abstract update(): void;
}
