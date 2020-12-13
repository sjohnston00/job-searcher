/* eslint-disable react-hooks/exhaustive-deps */

//A custom hooks that uses the useEffect hook to re-render components when the state changes
//The only difference is that this hook doesn't run on first render of a component
import { useEffect, useRef } from 'react';

export default function useDidMountEffect (func, deps) {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

