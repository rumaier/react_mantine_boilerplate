import React, { createContext, useCallback, useContext, useState } from 'react';

type draggingItemProps = {
  sourceInventory: string;  
  sourceSlot: number | string;
}


type DragContextType = {
  draggingItem: draggingItemProps | null;
  startDrag: (item: draggingItemProps) => void;
  endDrag: () => void;
};

const DragContext = createContext<DragContextType | undefined>(undefined);


export const DragProvider = ({ children }: { children: React.ReactNode }) => {
  const [draggingItem, setDraggingItem] = useState<draggingItemProps | null>(null);

  const startDrag = useCallback((item: {
    sourceInventory: string;
    sourceSlot: number | string;
  }) => {
    setDraggingItem(item);
  }, []);

  const endDrag = useCallback(() => {
    setDraggingItem(null);
  }, []);

  const value = {
    draggingItem,
    startDrag,
    endDrag,
  };

  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
};

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error('useDragContext must be used within a DragProvider');
  }
  return context;
};
