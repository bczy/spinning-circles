<script lang="ts">
  import { useMachine } from '@xstate/svelte';
  import EngineStateMachine from '../StateMachines/EngineStateMachine';

  //const { state, send } = useMachine(EngineStateMachine);
</script>

<button on:click={() => console.log('TOGGLE')}>
  ceci est un bouton
</button>
