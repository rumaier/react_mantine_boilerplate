import { MantineColor, MantineColorShade, MantineColorsTuple } from "@mantine/core";
import { create } from "zustand";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import { addInitialFetch } from "../utils/initialFetch";


export type SettingsProps = {
  primaryColor: MantineColor;
  primaryShade: MantineColorShade;
  customTheme: MantineColorsTuple;
  itemImgPath: string;
};


// Create a context with default values

export const useSettings = create<SettingsProps>(() => ({
  primaryColor:'dirk', 
  primaryShade: 9,
  itemImgPath: 'nui://dirk_inventory/web/images/',
  customTheme: [
    "#fdf9e4",
    "#f6f1d4",
    "#ebe1ad",
    "#e0d083",
    "#d6c25f",
    "#d0b947",
    "#cdb439",
    "#b59e2a",
    "#a18c21",
    "#8b7913"
  ],


  // Add more default settings here
}));


addInitialFetch('fetchSettings', () => {
  if (!isEnvBrowser()) {
    fetchNui<{
      primaryColor: string;
      primaryShade: MantineColorShade;
      customTheme: MantineColorsTuple;
    }>('GET_SETTINGS')
      .then((data) => {
        // Ensure data is of type SettingsProps
        if (data.primaryColor && data.primaryShade && data.customTheme) {
          useSettings.setState({
            primaryColor: data.primaryColor,
            primaryShade: data.primaryShade,
            customTheme: data.customTheme
          });
        } else {
          console.error('SettingsProvider: Invalid settings data received from NUI:', data);
        }
      }) 
      .catch((error) => {
        console.error('Failed to fetch settings:', error);
      });
  } else {
    console.warn('SettingsProvider: Not fetching settings from NUI');
  }
});