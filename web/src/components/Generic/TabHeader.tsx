import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks"
import { useAudio } from "../../stores/audio/store";
import colorWithAlpha from "../../utils/colorWithAlpha";




type TabHeader = {
  title: string;
  icon: string;
  extraButtons?: ButtonProps[];
}

export default function TabHeader(props:TabHeader){
  const theme = useMantineTheme()
  return (
    <Flex
      align='center'
      gap='xxs'
      p='xs'
      bg='rgba(95,95,95,0.3)'
      style={{
        borderBottom: `0.1vh solid rgba(0,0,0,0.5)`,
      }}

    >
      <FontAwesomeIcon icon={props.icon as IconProp}
        style={{
          transition: 'all ease-in-out 0.2s',
          color: 'rgba(255,255,255,0.8)',
          fontSize: theme.fontSizes.xs,
        
        }}
      />
      <Text
        c={'rgba(255,255,255,0.8)'}
        size='xs'
        style={{
          transition: 'all ease-in-out 0.2s',
          fontFamily: 'Akrobat Bold',
        }}
      >{props.title}</Text>

      <Flex
        ml='auto'
        gap='xs'
      >
        {props.extraButtons?.map((button, index) => (
          <ExtraButton key={index} {...button}/>
        ))}
      </Flex>

    </Flex>
  )
}

type ButtonProps = {
  icon: string;
  onClick: () => void;
  fontSize?: string;
  hoverText?: string;
}

function ExtraButton(props: ButtonProps){
  const theme = useMantineTheme()
  const playSound = useAudio(state => state.play)
  const {hovered, ref} = useHover()

  return (
    <Tooltip
      offset={15}
      position="bottom"
      label={props.hoverText}
      p={!props.hoverText ? '0' : 'xxs'}
      ref={ref}
      fz='xs'
      radius='xxs'
      bg='rgba(0,0,0,0.7)'
      style={{
        outline:`0.1vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.6)}`,
      }}
      color='white'
    >
      <FontAwesomeIcon icon={props.icon as IconProp} style={{
          fontSize: theme.fontSizes.sm,
          color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)', 
          aspectRatio: '1/1',
          transition: 'all ease-in-out 0.2s',
          cursor: 'pointer',
        }}
        onClick ={() => {
          playSound('click')
          props.onClick()
        }}
      />


    </Tooltip>
  )
}