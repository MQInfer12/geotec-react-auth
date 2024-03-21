import { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: any,
  onEvent: () => void,
  exceptElement: string | undefined
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (exceptElement) {
          if (event.target.id !== exceptElement && event.target.offsetParent.id !== exceptElement) {
            onEvent();
          }
        } else {
          onEvent();
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

interface Props {
  children: JSX.Element;
  onEvent: () => void;
  full?: boolean;
  maxHeight?: string;
  exceptElement?: string;
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({
  children,
  onEvent,
  full,
  maxHeight,
  exceptElement,
}: Props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onEvent, exceptElement);

  return (
    <div
      className={full ? "flex-1" : ""}
      style={{
        maxHeight,
      }}
      ref={wrapperRef}
    >
      {children}
    </div>
  );
}
