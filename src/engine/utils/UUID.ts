import { generateUUID } from "three/src/math/MathUtils";

export class UUID {
  protected _uuid = generateUUID();
  constructor() {}
  get uuid() {
    return this._uuid;
  }
}
