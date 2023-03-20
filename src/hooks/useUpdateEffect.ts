import { useLayoutEffect, useRef } from 'react';

const useUpdateEffect: typeof useLayoutEffect = (effect, deps) => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    if (mounted.current) return effect();

    mounted.current = true;
  }, deps);
};

export default useUpdateEffect;
