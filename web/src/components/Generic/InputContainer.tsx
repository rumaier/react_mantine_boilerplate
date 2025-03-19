import { useMantineTheme, Flex, Text } from "@mantine/core";

export default function InputContainer(props:{
  title:string;
  description?:string;
  children?:React.ReactNode;
}){
  const theme = useMantineTheme()
  return (
    <Flex
      w='100%'
      direction='column'
  
      gap='xs'
      bg='rgba(77, 77, 77, 0.4)'
      p='sm'
      style={{
        borderRadius: theme.radius.xxs,
      }}
    >

      <Flex
        align='center'
        gap='xs'
      >
        <Text
          size="sm"
          style={{
            lineHeight: '1.25vh',
          }}
        >{props.title}</Text>
        
      </Flex>
      {props.description && (
        <Text
          size='xs'
          c='rgba(255, 255, 255, 0.8)'
        >{props.description}</Text>  
      )}
      <Flex
        direction={'column'}
        align='center'
        gap='sm'
      >
        {props.children}
      </Flex>
            
    </Flex>
  )
}