import { generateUUID } from "three/src/math/MathUtils";

export class UUID {
  private _uuid = generateUUID();
  constructor() {}
  get uuid() {
    return this._uuid;
  }
}
