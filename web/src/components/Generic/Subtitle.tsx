import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMantineTheme, Flex, Text, MantineStyleProps } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import HoverIcon, { HoverIconProps } from "./HoverIcon";

type SubtitleProps = {
  title: string;
  icon: string;
  buttons?: HoverIconProps[];
} & MantineStyleProps;


export default function Subtitle(props: SubtitleProps){
  const theme = useMantineTheme();
  return (
    <Flex
      {...props as MantineStyleProps}
      align='center'
      gap='xs'
      pb='xxs'
      h='fit-content'
      pl='xs'
      pr='xs'
      style={{
        borderBottom: `0.2vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.5)}`
      }}
    >
      <FontAwesomeIcon icon={props.icon as IconProp}
        color='rgba(255,255,255,0.8)' 
        style={{
          fontSize: theme.fontSizes.xxs,
        }}
      />
      <Text size='sm' c='rgba(255,255,255,0.8)'>{props.title}</Text>

      {props.buttons ? (
        <Flex
          gap='xs'
          ml='auto'
        >
          {props.buttons.map((button, index) => (
            <HoverIcon
              key={index}
              icon={button.icon}
              fontSize={theme.fontSizes.xs}
              onClick={button.onClick}
              disabled={button.disabled}
              color={button.color}
              hoverColor={button.hoverColor}

              
            />
          ))}
        </Flex>
      ): null}
    </Flex>
  )
}