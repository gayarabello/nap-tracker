import { getStore } from "@netlify/blobs";

export interface TimerState {
  running: boolean;
  startedAt: number | null;
  accumulatedMs: number;
}

const DEFAULT_STATE: TimerState = {
  running: false,
  startedAt: null,
  accumulatedMs: 0,
};

export function getTimerStore() {
  return getStore({ name: "timer", consistency: "strong" });
}

export async function readTimerState(): Promise<TimerState> {
  const store = getTimerStore();
  const state = await store.get("state", { type: "json" });
  return (state as TimerState | null) ?? { ...DEFAULT_STATE };
}

export async function writeTimerState(state: TimerState): Promise<void> {
  const store = getTimerStore();
  await store.setJSON("state", state);
}

export function withElapsed(state: TimerState) {
  const elapsedMs =
    state.accumulatedMs +
    (state.running && state.startedAt ? Date.now() - state.startedAt : 0);
  return { ...state, elapsedMs };
}

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
