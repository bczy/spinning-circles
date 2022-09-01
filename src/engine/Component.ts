import { UUID } from "./utils/UUID";

export abstract class Component extends UUID{
  constructor() {
    super();
  }
  abstract update(): void;
}
