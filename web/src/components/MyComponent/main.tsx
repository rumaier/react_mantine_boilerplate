import { Flex, Text, Transition, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { create } from "zustand";
import { locale } from "../../stores/locales";
import { useSettings } from "../../stores/settings";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { Title } from "../Generic/Title";
import { useNuiEvent } from "../../hooks/useNuiEvent";


type ExampleStoreProps = {
  open: boolean;
  exampleText: string;
};

const exampleStore = create<ExampleStoreProps>((set, get) => ({
  open: true, 
  exampleText: 'default',
  exampleFunction: () => {
    // notice we have to use set, get, or api to access the store to get most recent data
    const open = get().open;
    set(() => ({ open: open }));
  },
}));


export default function MyComponent(){
  const theme = useMantineTheme();
  const primaryColor = useSettings((data) => data.primaryColor);
  const primaryShade = useSettings((data) => data.primaryShade);
  const open = exampleStore((state) => state.open);
  const exampleText = exampleStore((state) => state.exampleText);

  // here we listen for a message from lua/game and update the store with the data (auto re-renders anything using this store)
  useNuiEvent<string>('EXAMPLE_MESSAGE', function(data: string){
    exampleStore.setState({ exampleText: data });
  });

  // listen for escape key 
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        exampleStore.setState({ open: false });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Transition
      mounted={open}
      transition='fade'
      duration={500}
      timingFunction='ease'
    >
      {(transStyles) => (
        <Flex
          pos='absolute'
          top='50%'
          left='50%'
          bg='rgba(0,0,0,0.8)'

          w='50vh'
          // h='50vh'
          style={{
            transform: 'translate(-50%, -50%)',
            ...transStyles,
          }}
          p='xs'
          direction='column'
          gap='sm'

        >
          <Title
            title={locale('MyComponent')}
            description={locale('MyComponentDescription')}
            icon={'fas fa-cogs'}
          />

          <Flex
            align='center'
            bg='rgba(77, 77, 77, 0.5)'
            c='rgba(255, 255, 255, 0.8)'
            p='xs'
            style={{
              borderRadius: theme.radius.xs,
            }}
          >
            <Text size='sm'>{locale('Color:')} {primaryColor.toUpperCase()} {locale('Shade:')} {primaryShade}</Text>
            <Flex
              ml='auto'
              style={{
                borderRadius: theme.radius.xxs,
                outline: 'rgba(0,0,0,0.9) solid 0.1vh',
              }}
              bg={colorWithAlpha(theme.colors[primaryColor][primaryShade], 0.8)}
              h='3vh'
              w='25%'
            >

            </Flex>
          </Flex>
          <Text>{exampleText}</Text>
        </Flex>

      )}
    </Transition>
  )
}