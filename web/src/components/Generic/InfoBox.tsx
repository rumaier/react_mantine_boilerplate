import { useMantineTheme, Flex, Text } from "@mantine/core";

type InfoBoxProps = {
  leftSide: string;
  rightSide: string;
};
export function InfoBox(props: InfoBoxProps) {
  const theme = useMantineTheme();


  return (
    <Flex
      w='fit-content'
      // h='100%'
      style={{
        borderRadius: theme.radius.xxs,
        overflow: 'hidden',
        border: `0.2vh solid rgba(77,77,77,0.3)`
      }}
      align='center'
    >
      <Flex
        miw='4vh'
        p='xxs'
        bg='rgba(77,77,77,0.2)'
        direction='column'
        justify='center'
        align='center'
      >
        <Text c='lightgrey' size='xxs'
          style={{
            fontFamily: 'Akrobat Bold'
          }}>{props.leftSide}</Text>
      </Flex>

      <Flex
        p='xxs'
        flex={1}
        miw='4vh'
        bg='rgba(77,77,77,0.5)'
        direction='column'
        align='center'
        justify='center'
      >
        <Text c='lightgrey' size='xxs'
          style={{
            fontFamily: 'Akrobat Bold'
          }}
        >{props.rightSide}</Text>
      </Flex>

    </Flex>
  );
}
