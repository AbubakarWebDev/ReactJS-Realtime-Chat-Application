import useEventListener from './useEventListener';

function useOnClickOutside(ref, handler, mouseEvent = 'mousedown') {
  useEventListener(mouseEvent, event => {
    const el = ref?.current

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target)) {
      return;
    }

    handler(event)
  })
}

export default useOnClickOutside;
