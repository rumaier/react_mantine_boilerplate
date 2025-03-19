import { useDragContext } from "../context";
import { useRef, useCallback, useEffect } from 'react';

export const useDraggable = ({
  sourceInventory,
  sourceSlot,
  onDrop,
}: {
  sourceInventory: string;
  sourceSlot: number | string;
  onDrop?: (sourceInventoryId: string, sourceSlot: number, targetInventoryId: string, targetSlot: number) => Promise<boolean | void>
}) => {
  const { startDrag, endDrag, draggingItem } = useDragContext();
  const ref = useRef<HTMLDivElement>(null);

  const onDragStart = useCallback(
    (event: React.DragEvent) => {
      // Prevent dragging with the right mouse button
      if (event.button === 2) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      const item = { sourceInventory, sourceSlot };
      startDrag(item);

      if (ref.current) {
        const clone = ref.current.cloneNode(true) as HTMLDivElement;

        const computedStyle = window.getComputedStyle(ref.current);

        clone.style.position = 'absolute';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = '1000';
        clone.style.width = computedStyle.width;
        clone.style.height = computedStyle.height;
        clone.style.transform = computedStyle.transform;
        clone.style.margin = '0';
        clone.style.padding = computedStyle.padding;

        // ref.current.style.visibility = 'visible';
        ref.current.style.opacity = '0.5';
        document.body.appendChild(clone);

        const moveAt = (pageX: number, pageY: number) => {
          clone.style.left = pageX - clone.offsetWidth / 2 + 'px';
          clone.style.top = pageY - clone.offsetHeight / 2 + 'px';
        };

        moveAt(event.pageX, event.pageY);

        const onMouseMove = (e: MouseEvent) => moveAt(e.pageX, e.pageY);

        const onMouseUp = async (e: MouseEvent) => { // Make this function async
          document.removeEventListener('mousemove', onMouseMove);
          clone.remove();

          // Handle drop logic
          const elements = document.elementsFromPoint(e.clientX, e.clientY);
          const droppableElement = elements.find(el =>
            el.hasAttribute('data-droppable-inventory-id')
          );

          let shouldRevert = true;

          if (droppableElement) {
            const droppableInventoryId = droppableElement.getAttribute('data-droppable-inventory-id');
            const droppableInventorySlot = droppableElement.getAttribute('data-droppable-slot');
            const parsedDroppableSlot = isNaN(Number(droppableInventorySlot)) ? droppableInventorySlot : Number(droppableInventorySlot);

            if (droppableInventoryId && droppableInventorySlot) {
              // Handle successful drop
              if (onDrop) {
                const dropResult = await onDrop(sourceInventory, sourceSlot, droppableInventoryId, parsedDroppableSlot || 0);
                if (dropResult) {      
                  shouldRevert = false;
                }
              }
            }
          }

          if (shouldRevert) {
            ref.current!.style.visibility = 'visible';
            ref.current!.style.opacity = '1';
          }

          endDrag();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
      }
    },
    [startDrag, endDrag, sourceInventory, sourceSlot, onDrop]
  );

  // Add event listener to prevent the default context menu from appearing on right-click
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return {
    ref,
    dragging: draggingItem,
    onDragStart,
  };
};
