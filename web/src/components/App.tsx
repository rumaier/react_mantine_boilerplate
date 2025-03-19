import React, { useEffect, useState } from "react";

import { BackgroundImage, MantineProvider } from '@mantine/core';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { useSettings } from '../stores/settings';
import { runInitialFetches } from '../utils/initialFetch';
import { isEnvBrowser } from '../utils/misc';

import theme from '../theme';

import "./App.css";




const App: React.FC = () => {
  const [curTheme, setCurTheme] = useState(theme);
  const primaryColor = useSettings((data) => data.primaryColor);
  const primaryShade = useSettings((data) => data.primaryShade);
  const customTheme = useSettings((data) => data.customTheme);
  
  // Ensure the theme is updated when the settings change

  useEffect(() => {
    const updatedTheme = {
      ...theme, // Start with the existing theme object
      colors: {
        ...theme.colors, // Copy the existing colors
        custom: customTheme
      },
    };
    
    // setCurTheme(updatedTheme);
    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: primaryColor,
      primaryShade: primaryShade,
    });

  }, [primaryColor, primaryShade, customTheme]);

  useEffect(() => {
    runInitialFetches();
  }, []);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <DevWrapper>
        {/* you will add elements here */}
      </DevWrapper>
    </MantineProvider>
  );
};

export default App;




/// Leave this in for your apps, it'll just make you have some background image
function DevWrapper({ children }: { children: React.ReactNode }) {
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://i.ytimg.com/vi/TOxuNbXrO28/maxresdefault.jpg"
    >  
      {children}
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}
