import { create } from "zustand";
import DeleteModal from "./DeleteModal";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  icon: string;
  description: string;
  height?: string;
};

type ModalStore = {
  active: ModalProps | null;
  setActive: (modal: ModalProps) => void;
}



export const useModal = create<ModalStore>((set) => ({
  active: null,
  setActive: (modal) => set({active: modal}),
}));

export const showModal = (modal: ModalProps) => {
  useModal.setState({active: modal})
}

export const hideModal = () => {
  useModal.setState({active: null})
}

export const deleteModal = (props: {title: string, description: string, onDelete: () => void, icon: string, height?: string}) => {  
  showModal({
    title: props.title,
    description: props.description,
    icon: props.icon,
    height: props.height,
    children: (
      <DeleteModal 
        onDelete={props.onDelete}
      />
    )
  })
} 