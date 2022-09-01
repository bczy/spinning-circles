import { Mesh } from './components/Mesh';

export abstract class Component {
  constructor() {}
  abstract update(): void;
}
