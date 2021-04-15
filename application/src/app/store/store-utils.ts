interface Storage {
  getItem: (key: string) => string;
  removeItem: (key: string) => void;
}

export const toPayload = <T>(action: { payload: T }): T => action.payload;

export const restoreState = <T>(
  prevReducerKey: string,
  newReducerState: T,
  storage: Storage
): T => {
  const prevReducerState = storage.getItem(prevReducerKey);
  const prevStateJson =
    prevReducerState && prevReducerState.length > 0 ? JSON.parse(prevReducerState) : false;
  if (prevStateJson) {
    storage.removeItem(prevReducerKey);
  }
  return prevStateJson ? { ...newReducerState, ...prevStateJson } : newReducerState;
};
