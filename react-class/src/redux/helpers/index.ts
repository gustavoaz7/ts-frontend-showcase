import { Action, ActionPayload } from "../types";

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionPayload<T, P>;
export function createAction<T extends string, P>(
  type: T,
  payload?: P,
): Action<T> | ActionPayload<T, P> {
  return typeof payload === 'undefined' ? { type } : { type, payload };
}
