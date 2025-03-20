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
  primaryColor:'violet', 
  primaryShade: 9,
  customTheme: [
    "#f7ecff",
    "#e7d6fb",
    "#caaaf1",
    "#ac7ce8",
    "#9354e0",
    "#833bdb",
    "#7b2eda",
    "#6921c2",
    "#5d1cae",
    "#501599"
  ],
  itemImgPath: 'nui://dirk_inventory/web/images/',
  // NOTE: Add more default settings here when needed
}));


addInitialFetch('fetchSettings', () => {
  if (!isEnvBrowser()) {
    fetchNui<SettingsProps>('GET_SETTINGS')
      .then((data: SettingsProps) => {
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