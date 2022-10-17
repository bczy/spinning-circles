
import { createMachine } from "../../../node_modules/xstate/lib/Machine";

export default 
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAMQFEAVAYQAlFQAHAe1lwBdc3fBxAAPRACYADNJLSAHAFYAnAHYFAFk3SVCgGyaFAGhABPKQGYAjCR0LlCyZcuSlzgL5fT+bhDiiaFh4hKTkVKI8fILCohII1tb6djrWRtJqkvrWekqmFgiSbiQq0vpukg5KDtZK3iBBOATEJBTc6BAEUACqsGAATpG8AkIiSOKIltKaJDLSSqqJKkrZKvlSxaXl7lU1dR6mjSEtbR1dtP24YPgQ8ONRI7Hj8ZqS6wgKKiX6CmpKuqt9PNJPUjs1SJARvgoENoqM4oh9F8lNYpjJXJo1EZJJp3rU1CVLH9pDlnCpJNZ5qCME1QrDHmNQPFrCZzIgWfJZFzudy1F4vEA */
createMachine({
  id: '(machine)',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: {
          target: 'loadingUser',
        },
      },
    },
    loadingUser: {
      tags: 'loading',
    },
    loadingFriends: {
      tags: 'loading',
    },
    editing: {},
  },
});
