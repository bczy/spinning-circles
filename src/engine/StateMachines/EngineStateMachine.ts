import { createMachine, interpret } from "xstate";
import { Engine } from "../Engine";
import { GameEntity } from "../GameEntity";

export interface EngineContext {
  engine: Engine;
}

const engineContext : EngineContext = { engine: new Engine() };

export type EngineEvent = 
| { type: 'ADD_GAME_ENTITY' } 
| { type: 'START_ENGINE' } 
| { type: 'INIT_DONE' };

export type EngineState =
| {
  value: 'idle',
  context: EngineContext 
} | {
  value: 'onEdit',
  context: EngineContext
} | {
  value: 'editing',
  context: EngineContext
};

const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiA3AFwBEB7QgbQAYBdRUAB2awGuVrxAAPRAEYA7ACYSADjkA2AMwAWDYsUaArMs0AaEAE9pMgJwl5HPRw4qOUjXLWyAvh5NoseQqQUzOgQBFDUsPToAE70AKL4UARgnDxIIAJC9CL4YpIIGjKKJPZSljIOBjL6LibmCHJy1hxy2pp2cooqTnpePhg4yaSQwonUIRAAkvRgqKlimcKi6fl6miQclioaHGqtulLddYjKJFtqevaWGpYcXXde3iD4zBBwYr6DAWSUYAuCS1yK0Q2xITg0Ul0amuKkua2OCFk1gq1WqchkKhkaxkMj6IE+-mIJCCITC-yyOTyiHc1lckMslj06ik0JkCKRNg41T0WgqO3cijxBKGJBG2US5MBVIQa2R3XKujuVj0cnZihkJDkuykTUhijU2ykQoGhNIfAo6FMZPSi2yy1AqzUYMs6M6MPkTguCL2KhIsjUOI0Fz1WmNfhFfHQAFdYJBJXagQ7EK4Ng5nHIWXoXJ0pAiIVIzlyGTJ2jdqmGvsR45TgQgALR6M4MyzqrraPQyekIhtN5vq3aw9QqR4eIA */
createMachine<EngineContext, EngineEvent, EngineState>({
  id: 'EngineStateMachine',
  initial: 'idle',
  schema: {
    context: engineContext as EngineContext,
    events: {} as EngineEvent
  },
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
      entry: () => {console.log("So now I'm loading")},
      on: {
        START_ENGINE: {
          actions: (context, muf) => {
            context.engine.hud.init();
            console.log("engine started", muf, machine)
          },
          target: 'editing'
        },
      },
    },
    editing: {
      entry: () => {console.log("So now I'm editing")},
      on: {
        ADD_GAME_ENTITY: {
          actions:(context) => {
            console.log("ok tough one")
            context.engine.addGameEntity(new GameEntity())
            console.log("game entity added?")
          }
        },
      },
    },
    playing: {},
    paused: {},
  },
});

export default interpret(machine);