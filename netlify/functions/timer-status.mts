import type { Context } from "@netlify/functions";
import { readTimerState, withElapsed, jsonResponse } from "./_timer-store.mts";

export default async (req: Request, context: Context) => {
  const state = await readTimerState();
  return jsonResponse(withElapsed(state));
};
