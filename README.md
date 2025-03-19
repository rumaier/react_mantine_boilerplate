# React Boilerplate 
- Theme/Components from [Mantine Component Library](https://mantine.dev/)
- Automatic fetching of predefined stores from your lua files, easier integration of config throughout your app. 
- Locales system for using locale('MyLocale') wherever you wish in the app 
- Stores using [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)


## Auto-Fetch Lua Tables 
This allows you to setup stores and have them be autofetched from your lua files (default path: settings/) 

### Example Creation
```ts
import { create } from "zustand";
import { fetchLuaTable } from "../utils/fetchLuaTable";
import { addInitialFetch } from "../utils/initialFetch";


// Autofetch and define the props for some of your .lua config/settings files here then use them anywhere in your app.
type BasicSettingsProps = {
  exampleConfigValue: string;
} 

export const basic = create<BasicSettingsProps>(() => ({
  exampleConfigValue: 'default',
}));

addInitialFetch('fetchBasic', () => {
  fetchLuaTable<Partial<BasicSettingsProps>>('basic')()
  .then((data) => {
    basic.setState((prev) => ({ ...prev, ...data }));
  })
  .catch((error) => {
    console.error('Error fetching table:', error);
  });
});
```

### Example Useage Within Component
```tsx
import {Text} from '@mantine/core'; 
import {basic} from '../../stores/basic'
export default function MyComponent(){
  const exampleConfigValue = basic((state) => state.exampleConfigValue);
  return (
    <Text>{exampleConfigValue}</Text>
  )
}

```
