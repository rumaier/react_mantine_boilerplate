import { createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "rumaier",
  primaryShade: 9,
  defaultRadius: "xxs",
  fontFamily: "Akrobat Regular, sans-serif",

  radius:{
    xxs: '0.2vh',
    xs: '0.4vh',
    sm: '0.75vh',
    md: '1vh',
    lg: '1.5vh',
    xl: '2vh',
    xxl: '3vh',
  },

  fontSizes: {
    xxs: '1.2vh',
    xs: '1.5vh',
    sm: '1.8vh',
    md: '2.2vh',
    lg: '2.8vh',
    xl: '3.3vh',
    xxl: '3.8vh',
  },

  spacing:{
    xxs: '0.5vh',
    xs: '0.75vh',
    sm: '1.5vh',
    md: '2vh',
    lg: '3vh',
    xl: '4vh',
    xxl: '5vh',
  },

  components:{
    Progress:{
      styles:{
        root:{
          backgroundColor: 'rgba(77, 77, 77, 0.4)',
        },
        
      }
    },

    Select:{
      styles:{
        dropdown:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        input:{
          padding: 'var(--mantine-spacing-sm)',
        },
        item:{
          
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        wrapper:{
          
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        option:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },

      }
    },
    MultiSelect:{
      styles:{
        dropdown:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        pill:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        item:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        wrapper:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },
        option:{
          borderRadius: 'var(--mantine-radius-xxs)',
        },

      }
    },
    TextInput:{
      styles:{
        section:{
          marginRight: '0.2vh',
        },

        input:{
          padding: 'var(--mantine-spacing-sm)',
        },

       
        
      }
    },
  },

  colors: {
    dark:[
      "#ffffff",
      "#e2e2e2",
      "#c6c6c6",
      "#aaaaaa",
      "#8d8d8d",
      "#717171",
      "#555555",
      "#393939",
      "#1c1c1c",
      "#000000",
    ],
    rumaier: [
      '#f1f1f1',
      '#e7d6fb',
      '#caaaf1',
      '#ac7ce8',
      '#9354e0',
      '#833bdb',
      '#7b2eda',
      '#6921c2',
      '#5d1cae',
      '#501599'
    ],
  },
});


export default theme;