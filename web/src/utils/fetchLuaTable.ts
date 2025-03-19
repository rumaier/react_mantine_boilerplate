import { fetchNui } from "./fetchNui";
import { isEnvBrowser } from "./misc";

export const fetchLuaTable = <T>(tableName: string) => () => {
  if (isEnvBrowser()) {
    return Promise.resolve({} as T);
  }
  return fetchNui<T>('GET_LUA_TABLE', { tableName });
};


