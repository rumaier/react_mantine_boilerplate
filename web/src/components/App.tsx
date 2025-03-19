import '@mantine/charts/styles.css';
import { BackgroundImage, MantineProvider } from '@mantine/core';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import React, { useEffect, useState } from "react";
import { useSettings } from '../stores/settings';
import theme from '../theme';
import { runInitialFetches } from '../utils/initialFetch';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import CustomModal from './Generic/Modal/Modal';
import MyComponent from './MyComponent/main';




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
    
    setCurTheme(updatedTheme);
    // set primary color
    setCurTheme({
      ...updatedTheme,
      primaryColor: primaryColor,
      primaryShade: primaryShade,
    });

  }, [primaryColor, primaryShade, customTheme]);

  useEffect(() => {
    // fetchSettings();
    runInitialFetches();
  }, []);

  return (
        
    <MantineProvider theme={curTheme} defaultColorScheme='dark'>
      <Wrapper>
        <Notifications />
        <CustomModal />
        <MyComponent />
      </Wrapper>
    </MantineProvider>
  );
};

export default App;




/// Leave this in for your apps, it'll just make you have some background image
function Wrapper({ children }: { children: React.ReactNode }) {
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
