import { useRef, useCallback, useEffect } from 'react';
export const useDroppable = () => {
  const droppableRef = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
    },
    []
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    const ref = droppableRef.current;
    if (ref) {
      ref.addEventListener('drop', handleDrop as unknown as EventListener);
      ref.addEventListener('dragover', handleDragOver as unknown as EventListener);

      return () => {
        ref.removeEventListener('drop', handleDrop as unknown as EventListener);
        ref.removeEventListener('dragover', handleDragOver as unknown as EventListener);
      };
    }
  }, [handleDrop, handleDragOver]);

  return {
    droppableRef,
  };
};
