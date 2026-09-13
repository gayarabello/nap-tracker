import type { Context } from "@netlify/functions";
import { readTimerState, writeTimerState, withElapsed, jsonResponse } from "./_timer-store.mts";

export default async (req: Request, context: Context) => {
  const state = await readTimerState();

  if (state.running && state.startedAt) {
    state.accumulatedMs += Date.now() - state.startedAt;
    state.running = false;
    state.startedAt = null;
    await writeTimerState(state);
  }

  return jsonResponse(withElapsed(state));
};
