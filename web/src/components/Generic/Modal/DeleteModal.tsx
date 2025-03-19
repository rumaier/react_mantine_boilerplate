import { Flex } from "@mantine/core";
import { locale } from "../../../stores/locales";
import Button from "../Button";
import { showModal, useModal } from "./store";

type DeleteModalProps = {
  onDelete: () => void;
}

export default function DeleteModal(props: DeleteModalProps) {
  return (
    <Flex flex={1} w='100%' justify='space-evenly' gap='xs' p='xs'>
      <Button
        w='40%'
        rect
        // hoverColor="rgba(255, 0, 0, 0.5)"
        
        text={locale('Cancel')}
        onClick={() => useModal.setState({active: null})}
      />
      <Button
        w='40%'
        rect
        text={locale('Delete')}
        hoverColor="rgba(255, 0, 0, 0.5)"
        onClick={() => {
          showModal({
            title: locale('AreYouSure'),
            description: locale('AreYouSureDescription'),
            icon: 'trash',
            height:'fit-content',
            children: (
              <Flex flex={1} w='100%' justify='space-evenly' gap='xs' p='xs'>
                <Button
                  w='40%'
                  rect
                  // hoverColor="rgba(255, 0, 0, 0.5)"
                  text={locale('Cancel')}
                  onClick={() => useModal.setState({active: null})}
                />
                <Button
                  w='40%'
                  rect
                  text={locale('DeleteIt')}
                  hoverColor="rgba(255, 0, 0, 0.5)"
                  onClick={() => {
                    props.onDelete()
                  }}
                />
              </Flex>
            )
          })
        }}
      />
    </Flex>
  )
}