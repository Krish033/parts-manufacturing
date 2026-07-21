import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all px-3.5 py-2.5 shadow-xs ' +
                className
            }
            ref={localRef}
        />
    );
});
