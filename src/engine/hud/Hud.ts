import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from 'xstate';

import machine, {
  EngineContext,
  EngineEvent,
  EngineState,
} from '../StateMachines/EngineStateMachine';

import { Entity } from '../entities/Entity';
import { GameEntity } from '../entities/GameEntity';
import { createEntity } from './Entity';
import { updateInputs } from './utils';

export class Hud {
  private _engineService: Interpreter<
    EngineContext,
    any,
    EngineEvent,
    EngineState,
    ResolveTypegenMeta<
      TypegenDisabled,
      EngineEvent,
      BaseActionObject,
      ServiceMap
    >
  >;

  private updateInputs(entity: GameEntity, inputs: Element[]) {
    inputs.forEach((input: HTMLInputElement) => {
      if (input.id === entity.getComponentByType('Transform').uuid) {
        const inputChildren = document.getElementById(input.id).children;
        const [, positionContainer, rotationContainer] =
          Array.from(inputChildren);
        const positionInputs = Array.from(
          positionContainer.children
        ) as Array<HTMLInputElement>;
        const rotationInputs = Array.from(
          rotationContainer.children
        ) as Array<HTMLInputElement>;
        const { position, rotation } = entity.mesh.threeMesh;
        updateInputs(positionInputs, position);
        updateInputs(rotationInputs, rotation);
      }
    });
  }

  public constructor(private _engineEntities: Array<Entity>) {}

  public addGameEntity() {
    this._engineService.send('ADD_GAME_ENTITY');
    this.refresh();
  }

  public init() {
    this._engineService = machine;
    document.getElementById('add').addEventListener('click', () => {
      this.addGameEntity();
    });

    document.addEventListener('keydown', (event) => {
      //TODO deprecated + qwerty/azerty
      switch (event.keyCode) {
        case 87: // S
          this._engineService.machine.context.engine.control.setMode(
            'translate'
          );
          break;
        case 69: // D
          this._engineService.machine.context.engine.control.setMode('rotate');
          break;
      }
    });
  }

  public refresh() {
    this._engineEntities.forEach((entity) => {
      const domEntity = document.getElementById(entity.uuid);
      if (!domEntity) {
        const entitySection = createEntity(entity);
        document.getElementById('entityList').appendChild(entitySection);
      } else {
        const inputs = Array.from(domEntity.children).slice(1);
        const uuid = inputs[0].textContent;
        const entity = this._engineService.machine.context.engine.entities.find(
          (entity) => entity.uuid === uuid
        ) as GameEntity;
        this.updateInputs(entity, inputs);
      }
    });
  }

  public updateValues(uuid: string) {
    const { mesh, components } = this._engineEntities.find(
      (entity) => entity.uuid === uuid
    ) as GameEntity;
    const { x, y, z } = mesh.threeMesh.position;
    mesh.updateProperty('position', [x, y, z]);
    components.find((component) =>
      component.updateProperty('position', [x, y, z])
    );
    this.refresh();
  }
}
