import { createMachine, interpret } from 'xstate';
import { Entity } from '../entities/Entity';

export interface HudContext {
    selection: Array<Entity>;
}

const hudContext: HudContext = {
    selection : new Array<Entity>()
};

export type HudEvent = { type: 'SET_SELECTED' } | { type: 'UNSELECT' };

export type EngineState =
  | {
      value: 'unselected';
      context: HudContext;
    }
  | {
      value: 'setSelected';
      context: HudContext;
    };

const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFEB2UCWqwGUAuAhnmALIEDGAFlmAHQCuqsYANmOXgMQ7IAqA+jwAyyAMK9kAEQDaABgC6iUAAcA9rAx4Mq1EpAAPRABYATABoQAT0QAOE7QCcANgDMAViMPZDkwEZZbi4mAL6hFqiqEHB6aJjY+ESkFNTYDEys7Hh6ahpaOnqGCE5OtE6yJjZuNkayRkZOvgDsFtYIvjaNtCayLr6mDo1+bj0hwRaxNAnEZFQ02eqa2rpIBogAtE4t6yWyu3v7+42hoUA */
createMachine<HudContext, HudEvent, EngineState>({
  context: hudContext,
  schema: { context: hudContext as HudContext, events: {} as HudEvent },
  predictableActionArguments: true,
  initial: 'unselect',
  id: 'EngineStateMachine',
  states: {
    unselect: {
      on: {
        SET_SELECTED: {
          actions: (context) => {
            console.log(context);
          },
        },
        UNSELECT: {
          actions: (context) => {
            console.log(context);
          },
        },
      },
    },
  },
});

export default interpret(machine);
