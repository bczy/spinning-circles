import { createMachine, interpret } from 'xstate';
import { Engine } from '../Engine';
import { GameEntity } from '../entities/GameEntity';
import { onWindowResize } from '../Window';

export interface EngineContext {
  engine: Engine;
}

const engineContext: EngineContext = { engine: new Engine() };

export type EngineEvent =
  | { type: 'ADD_GAME_ENTITY' }
  | { type: 'START_ENGINE' }
  | { type: 'INIT_DONE' };

export type EngineState =
  | {
      value: 'idle';
      context: EngineContext;
    }
  | {
      value: 'editing';
      context: EngineContext;
    };

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiA3AFwBEB7QgbQAYBdRUAB2awGuVrxAAPRAEYA7ACYSADjkA2AMwAWDYsUaArMs0AaEAE9pMgJwl5HPRw4qOUjXLWyAvh5NoseQqQUzOgQBFDUsPToAE70AKL4UARgnDxIIAJC9CL4YpIIGjKKJPZSljIOBjL6LibmCHJy1hxy2pp2cooqTnpePhg4yaSQwonUIRAAkvRgqKlimcKi6fl6miQclioaHGqtulLddYjKJFtqevaWGpYcXXde3iD4zBBwYr6DAWSUYAuCS1yK0Q2xITg0Ul0amuKkua2OCFk1gq1WqchkKhkaxkMj6IE+-mIJCCITC-yyOTyiHc1lckMslj06ik0JkCKRNg41T0WgqO3cijxBKGJBG2US5MBVIQa2R3XKujuVj0cnZihkJDkuykTUhijU2ykQoGhNIfAo6FMZPSi2yy1AqzUYMs6M6MPkTguCL2KhIsjUOI0Fz1WmNfhFfHQAFdYJBJXagQ7EK4Ng5nHIWXoXJ0pAiIVIzlyGTJ2jdqmGvsR45TgQgALR6M4MyzqrraPQyekIhtN5vq3aw9QqR4eIA */
  createMachine<EngineContext, EngineEvent, EngineState>({
    id: 'EngineStateMachine',
    initial: 'idle',
    context: engineContext,
    predictableActionArguments: true,
    states: {
      idle: {
        on: {
          INIT_DONE: {
            target: 'loading',
          },
        },
      },
      loading: {
        entry: ({ engine }) => {
          console.log('Loading...');
          window.addEventListener('resize', () => {
            onWindowResize(engine.camera, engine.renderer);
          });
        },
        on: {
          START_ENGINE: {
            actions: (context, muf) => {
              context.engine.start();
              context.engine.hud.init();
              console.log('Engine started.', muf, machine);
            },
            target: 'editing',
          },
        },
      },
      editing: {
        entry: ({ engine }) => {
          console.log('Entering edit mode...', engine);
          engine.control.addEventListener('change', () => {
            engine.hud.updateValues(engine.lastIntersected.uuid);
          });

          // todo: fullscreen
          onWindowResize(engine.camera, engine.renderer);
          document.addEventListener('mousemove', (e) => {
            engine.onPointerMove(e);
          });
          document.addEventListener('mousedown', (e) => {
            engine.onPointerDown(e);
          });
        },
        exit: ({ engine }) => {
          console.log('Exiting edit mode...', engine);
          /* TODO decide where and how sotre hud events 
          engine.control.removeEventListener('change', () => {
            engine.hud.updateValues(engine.lastIntersected.uuid);
          });
          document.removeEventListener('mousemove', (e) => {
            engine.onPointerMove(e);
          });
          document.removeEventListener('mousedown', (e) => {
            engine.onPointerDown(e);
          }); */
        },
        on: {
          ADD_GAME_ENTITY: {
            actions: (context) => {
              context.engine.addGameEntity(new GameEntity());
            },
          },
        },
      },
      playing: {},
      paused: {},
    },
  });

export default interpret(machine);
