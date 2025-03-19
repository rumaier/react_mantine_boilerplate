import { Flex, Transition, useMantineTheme } from "@mantine/core";
import { locale } from "../../../stores/locales";
import { Title } from "../Title";
import { useModal } from "./store";

export default function CustomModal(){
  const activeModal = useModal((state) => state.active)
  const theme = useMantineTheme()

  return (
    <Flex
      w='100vw'
      h='100vh'
    
      bg={activeModal ? 'rgba(0, 0, 0, 0.4)' : 'transparent'}
      opacity={activeModal ? 1 : 0}
      style={{
        // backdropFilter: activeModal ? 'blur(0.2vh)' : 'none',
        pointerEvents: activeModal ? 'all' : 'none',
        // transition:  'all 0.1s ease',
        userSelect: 'none',
        // backdropFilter: activeModal ? 'blur(0.2vh)' : 'none',
      }}
    >
      <Transition
      
        mounted={activeModal ? true : false}
        transition='fade'
        duration={300}
        timingFunction='ease'
      >
        {(transitionStyles) => (

            <Flex
              pos='absolute'
              top='50%'
              left='50%'
              bg='rgba(0, 0, 0, 0.9)'
              miw='45vh'
              mih={activeModal? activeModal.height  : 'fit-content'}
              opacity={activeModal ? 1 : 0}
              style={{
                ...transitionStyles,
                transform: 'translate(-50%, -50%)',
                // aspectRatio: '1.5 / 1',
                borderRadius: theme.radius.xxs,
              }}
              direction={'column'}
              align='center'
              p='md'
              gap='sm'
              
            >
              {activeModal && <Title title={activeModal?.title || locale('Closing')} icon={activeModal?.icon || 'close'} description={activeModal?.description || ''}
              
                closeButton
                onClose={() => {
                  useModal.setState({
                    active: null
                  })
                }}
              /> }
              <Flex
                flex={1}
                w='100%'
              >
                {activeModal?.children}
              </Flex>
            </Flex>




        )}
      </Transition>
    </Flex>
  )
}