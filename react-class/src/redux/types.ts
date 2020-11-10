import { Action as ReduxAction} from 'redux';

export type Action<T extends string> = ReduxAction<T>;

export type ActionPayload<T extends string, P> = Action<T> & {
  readonly payload: P;
};

export type ExtractActions<AC> = AC extends () => infer A
  ? A
  : (AC extends (payload: any) => infer A ? A : never);
