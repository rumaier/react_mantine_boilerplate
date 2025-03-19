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
