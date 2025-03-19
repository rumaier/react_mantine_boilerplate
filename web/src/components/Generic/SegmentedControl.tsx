import { Flex, useMantineTheme } from "@mantine/core";
import Button from "./Button";

type SegmentedControlProps = {
  onChange: (value:string) => void;
  value: string;
  data: {
    value: string;
    label: string;
    icon?: string;
  }[];

}

export default function SegmentedControl(props:SegmentedControlProps){
  const theme = useMantineTheme()
  return (
    <Flex
      align='center'
      justify={'center'}
      // w='80%'
      bg='rgba(0, 0, 0, 0.4)'
      p='xs'
      gap='xs'
      style={{
        borderRadius: theme.radius.xs,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {props.data.map((item, index) => {
        return (
          <Button
            text={item.label}
            rect
            selected={props.value === item.value}
            key={index}
            onClick={() => props.onChange(item.value)}
            icon={item.icon}
          />
        )
      })}
    </Flex>
  )
}