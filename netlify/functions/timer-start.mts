import type { Context } from "@netlify/functions";
import { readTimerState, writeTimerState, withElapsed, jsonResponse } from "./_timer-store.mts";

export default async (req: Request, context: Context) => {
  const state = await readTimerState();

  if (!state.running) {
    state.running = true;
    state.startedAt = Date.now();
    await writeTimerState(state);
  }

  return jsonResponse(withElapsed(state));
};
