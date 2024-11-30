// import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
// import Quill from 'quill'; // Make sure to import Quill if it's not already imported

// // Define the props type for the Editor component
// interface EditorProps {
//   readOnly?: boolean;
//   defaultValue?: any; // Change 'any' to a more specific type if needed
//   onTextChange?: (delta: any, oldDelta: any, source: string) => void; // Adjust types based on your use case
//   onSelectionChange?: (range: any, oldRange: any, source: string) => void; // Adjust types based on your use case
// }

// // Editor is an uncontrolled React component
// const Editor = forwardRef<Quill, EditorProps>(
//   ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const defaultValueRef = useRef<any>(defaultValue); // Change 'any' to a more specific type if needed
//     const onTextChangeRef = useRef<typeof onTextChange>(onTextChange);
//     const onSelectionChangeRef = useRef<typeof onSelectionChange>(onSelectionChange);

//     useLayoutEffect(() => {
//       onTextChangeRef.current = onTextChange;
//       onSelectionChangeRef.current = onSelectionChange;
//     });

//     useEffect(() => {
//       if (ref && typeof ref !== 'function') {
//         (ref as React.MutableRefObject<Quill | null>).current?.enable(!readOnly);
//       }
//     }, [ref, readOnly]);

//     useEffect(() => {
//       const container = containerRef.current;
//       if (!container) return;

//       const editorContainer = document.createElement('div');
//       container.appendChild(editorContainer);
//       const quill = new Quill(editorContainer, {
//         theme: 'snow',
//       });

//       if (ref && typeof ref !== 'function') {
//         (ref as React.MutableRefObject<Quill | null>).current = quill;
//       }

//       if (defaultValueRef.current) {
//         quill.setContents(defaultValueRef.current);
//       }

//       quill.on(Quill.events.TEXT_CHANGE, (...args) => {
//         onTextChangeRef.current?.(...args);
//       });

//       quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
//         onSelectionChangeRef.current?.(...args);
//       });

//       return () => {
//         if (ref && typeof ref !== 'function') {
//           (ref as React.MutableRefObject<Quill | null>).current = null;
//         }
//         container.innerHTML = '';
//       };
//     }, [ref]);

//     return <div ref={containerRef}></div>;
//   },
// );

// Editor.displayName = 'Editor';

// export default Editor;