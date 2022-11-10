import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from 'xstate';
import { ComponentProperty } from '../Component';
import { Transform } from '../components/Transform';
import { Entity } from '../entities/Entity';
import { GameEntity } from '../entities/GameEntity';
import machine, {
  EngineContext,
  EngineEvent,
  EngineState,
} from '../StateMachines/EngineStateMachine';
import { createEntity } from './Entity';

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

  public constructor(private _engineEntities: Array<Entity>) {}

  public update() {
  }

  public addGameEntity() {
    this._engineService.send('ADD_GAME_ENTITY');
    this.refresh();
  }

  public init() {
    this._engineService = machine;
    document.getElementById('add').addEventListener('click', () => {
      this.addGameEntity();
    });
    document.getElementById('refresh').addEventListener('mousedown', () => {
      this.refresh();
    });
    document.addEventListener( 'keydown',  event  => {

      switch ( event.keyCode ) {

        case 87: // W
          this._engineService.machine.context.engine.control.setMode( 'translate' );
          break;

        case 69: // E
          this._engineService.machine.context.engine.control.setMode( 'rotate' );
          break;
      }});
  }
  public updateValues(uuid: string){
    const { mesh, components } = this._engineEntities.find(entity => entity.uuid === uuid) as GameEntity;
    const { x, y, z } = mesh.threeMesh.position
    mesh.updateProperty('position', [x, y, z] )
    components.find(component => component.updateProperty('position', [x, y, z] ))
    this.refresh();
  }
  public refresh() {
    this._engineEntities.forEach((entity) => {
      const domEntity = document.getElementById(entity.uuid);
      if (!domEntity) {
        const entitySection = createEntity(entity);
        document.getElementById('entityList').appendChild(entitySection);
      }
      else{
        const inputs = Array.from(domEntity.children).slice(1);
        const uuid = inputs[0].textContent;
        const entity = this._engineService.machine.context.engine.entities.find((entity)=> entity.uuid === uuid) as GameEntity;
        inputs.forEach((input: HTMLInputElement, i ) => { 
          if (input.id === entity.getComponentByType('Transform').uuid){
            const transformInputs = Array.from(Array.from(document.getElementById(input.id).children)[1].children) as Array<HTMLInputElement>;
            const rotateInputs = Array.from(Array.from(document.getElementById(input.id).children)[2].children) as Array<HTMLInputElement>;
            transformInputs[0].value = entity.mesh.threeMesh.position.x.toString();
            transformInputs[1].value = entity.mesh.threeMesh.position.y.toString();
            transformInputs[2].value = entity.mesh.threeMesh.position.z.toString();
            rotateInputs[0].value = (entity.mesh.threeMesh.rotation.x * 180).toString();
            rotateInputs[1].value = entity.mesh.threeMesh.rotation.y.toString();
            rotateInputs[2].value = entity.mesh.threeMesh.rotation.z.toString();
          
          }
        })
        }
    });
  }
}
