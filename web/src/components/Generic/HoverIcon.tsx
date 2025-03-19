import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MantineStyleProps, useMantineTheme, Flex } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useMemo } from "react";

export type HoverIconProps = {
  onClick: () => void;
  icon: string;
  fontSize?: string;
  color?: string;
  disabled?: boolean;
  hoverColor?: string;
} & MantineStyleProps;


function HoverIcon(props: HoverIconProps){
  const {ref, hovered} = useHover();
  const theme = useMantineTheme();

  const realHover = useMemo(() => {
    if (props.disabled){
      return false
    }
    return hovered
  }, [hovered, props.disabled])

  return (
    <Flex
      ref={ref}
      {...props as MantineStyleProps}
      onClick={() => {
        if (!props.disabled){
          props.onClick()
        }
      }}
      
    >
      <FontAwesomeIcon 
        color={!realHover ? 
          props.color ? props.color : 'rgba(255,255,255,0.6)': 
          props.hoverColor ? props.hoverColor : 'rgba(255,255,255,0.8)'
        }
        icon={props.icon as IconProp}
        style={{
          transition: 'all ease-in-out 0.2s',
          fontSize: props.fontSize || theme.fontSizes.sm,
          cursor: !props.disabled ? 'pointer' : 'not-allowed',
        }}

      />
    </Flex>
  )
}
export default HoverIcon;