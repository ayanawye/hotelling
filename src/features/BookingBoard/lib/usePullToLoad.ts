import { useState, useRef, useCallback } from 'react';

interface UsePullToLoadProps {
  onLoadMore?: (direction: 'forward' | 'backward') => void;
  threshold?: number;
  maxOffset?: number;
  resistance?: number;
}

export const usePullToLoad = ({
  onLoadMore,
  threshold = 70,
  maxOffset = 70,
  resistance = 0.7,
}: UsePullToLoadProps) => {
  const [pullProgress, setPullProgress] = useState({ start: 0, end: 0 });
  const [pullOffset, setPullOffset] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const touchState = useRef({
    startX: 0,
    startY: 0,
    isAtStart: false,
    isAtEnd: false,
  });

  const reset = useCallback(() => {
    setPullProgress({ start: 0, end: 0 });
    setPullOffset(0);
    setIsPulling(false);
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
      const edgeThreshold = 5;

      // Backward pull (elastic scroll on macOS/iOS)
      if (scrollLeft < 0) {
        setIsPulling(true);
        const absScroll = Math.abs(scrollLeft);
        const progress = Math.min(absScroll / threshold, 1.2);
        setPullProgress((p) => ({ ...p, start: progress }));
        setPullOffset(Math.min(absScroll * resistance, maxOffset));

        if (absScroll >= threshold) {
          onLoadMore?.('backward');
          reset();
        }
      } else if (scrollLeft <= edgeThreshold && (pullOffset > 0 || isPulling)) {
        reset();
      }

      // Forward pull (elastic scroll on macOS/iOS)
      const scrollRight = scrollWidth - (scrollLeft + clientWidth);
      if (scrollRight < 0) {
        setIsPulling(true);
        const absScroll = Math.abs(scrollRight);
        const progress = Math.min(absScroll / threshold, 1.2);
        setPullProgress((p) => ({ ...p, end: progress }));
        setPullOffset(-Math.min(absScroll * resistance, maxOffset));

        if (absScroll >= threshold) {
          onLoadMore?.('forward');
          reset();
        }
      } else if (
        scrollRight <= edgeThreshold &&
        (pullOffset < 0 || isPulling)
      ) {
        reset();
      }
    },
    [
      onLoadMore,
      threshold,
      maxOffset,
      resistance,
      reset,
      pullOffset,
      isPulling,
    ],
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;

      // Ignore vertical scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

      // Scroll left at start
      if (e.deltaX < 0 && scrollLeft <= 0) {
        setIsPulling(true);
        setPullProgress((p) => {
          const newStart = Math.min(p.start + Math.abs(e.deltaX) / 100, 1.2);
          if (newStart >= 1) {
            onLoadMore?.('backward');
            reset();
            return { ...p, start: 0 };
          }
          setPullOffset(Math.min(newStart * maxOffset, maxOffset));
          return { ...p, start: newStart };
        });
      }

      // Scroll right at end
      const scrollRight = scrollWidth - (scrollLeft + clientWidth);
      if (e.deltaX > 0 && scrollRight <= 0) {
        setIsPulling(true);
        setPullProgress((p) => {
          const newEnd = Math.min(p.end + Math.abs(e.deltaX) / 100, 1.2);
          if (newEnd >= 1) {
            onLoadMore?.('forward');
            reset();
            return { ...p, end: 0 };
          }
          setPullOffset(-Math.min(newEnd * maxOffset, maxOffset));
          return { ...p, end: newEnd };
        });
      }

      // Reset if not at edges
      if (
        (e.deltaX > 0 && scrollLeft > 0) ||
        (e.deltaX < 0 && scrollRight > 0)
      ) {
        reset();
      }
    },
    [onLoadMore, maxOffset, reset],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;

      touchState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        isAtStart: scrollLeft <= 0,
        isAtEnd: scrollWidth - (scrollLeft + clientWidth) <= 0,
      };
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      const { startX, startY, isAtStart, isAtEnd } = touchState.current;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      // Ignore vertical gestures
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;

      if (isAtStart && deltaX > 0) {
        setIsPulling(true);
        const progress = Math.min(deltaX / threshold, 1.2);
        setPullProgress((p) => ({ ...p, start: progress }));
        setPullOffset(Math.min(deltaX * resistance, maxOffset));

        if (deltaX >= threshold) {
          onLoadMore?.('backward');
          reset();
          touchState.current.startX = touch.clientX; // reset base
        }
      } else if (isAtEnd && deltaX < 0) {
        setIsPulling(true);
        const absDeltaX = Math.abs(deltaX);
        const progress = Math.min(absDeltaX / threshold, 1.2);
        setPullProgress((p) => ({ ...p, end: progress }));
        setPullOffset(-Math.min(absDeltaX * resistance, maxOffset));

        if (absDeltaX >= threshold) {
          onLoadMore?.('forward');
          reset();
          touchState.current.startX = touch.clientX; // reset base
        }
      }
    },
    [onLoadMore, threshold, maxOffset, resistance, reset],
  );

  const handleTouchEnd = useCallback(() => {
    reset();
  }, [reset]);

  return {
    pullProgress,
    pullOffset,
    isPulling,
    handleScroll,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
