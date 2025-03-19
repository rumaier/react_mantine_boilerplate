import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";
import BorderedIcon from "./BorderedIcon";
import Button, { ButtonProps } from "./Button";


type TitleProps = {
  title: string
  description: string;
  icon: string;
  backButton?: boolean;
  onBack?: () => void;
  mt?: string;
  w?: string;
  removeBorder?: boolean;
  closeButton?: boolean;
  extraButtons?:ButtonProps[];
  onClose?: () => void;
};

export function Title(props: TitleProps) {
  
  const theme = useMantineTheme();
  return (
    <Flex
      mt={props.mt}
      direction='column'
      // align='center'
      gap='xs'
      // flex={1}
      // w='90%'
      w={props.w || '100%'}
      
      pb={props.removeBorder ? '0' : 'xs'}
      pl={!props.removeBorder ? 'xs' : '0'}
      style={{
        userSelect: 'none',
        borderBottom: props.removeBorder ? 'none' : `0.2vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.5)}`
      }}
    >
      <Flex
   
        align='center'
        justify={'center'}
      >

        <Flex
          align='center'
          gap='sm'
          pr='xs'      
          >
          <BorderedIcon
            icon={props.icon as IconName}
            fontSize={theme.fontSizes.md}
          />
          <Flex
            direction='column'
            gap='0.25vh'
            // w='30%'
          >
            <Text p='0' size='md' style={{
              lineHeight: theme.fontSizes.md,
              fontFamily: 'Akrobat Bold'
            }}>{props.title}</Text>
            <Text 
              size='xs'
              c='grey'
              style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
            >{props.description}</Text>
          </Flex>


        </Flex>

        <Flex
          ml='auto'
          align='center'
          gap='xs'
        >
          {props.extraButtons && props.extraButtons.map((button, index) => (
            <Button {...button} key={index}/>
          ))}

          {props.backButton && (
            <Button icon='fa-arrow-left' onClick={props.onBack}/> 
          )}

          {props.closeButton && (
            <Button icon='fa-times' onClick={props.onClose} 
              hoverColor={colorWithAlpha(theme.colors.red[9], 0.5)} 
            />
          )}

        </Flex>
      </Flex>
    </Flex>
  );
}
