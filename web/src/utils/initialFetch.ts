import { isEnvBrowser } from "./misc";

type InitialFetch = {
  [key: string]: () => void;
}

const initialFetches = {} as InitialFetch;

export const addInitialFetch = (name: string, func: () => void) => {
  if (isEnvBrowser()) {
    return;
  }
  initialFetches[name] = func;
} 

export const runInitialFetches = () => {
  for (const script in initialFetches){
    initialFetches[script]();
  }
} 

// WARNING: Anywhere you place an addInitialFetch you must make sure that file is in use somewhere in the project, otherwise it wont 
// run in the build. This is because the webpack build will tree shake the code if it doesn't think it's being used.