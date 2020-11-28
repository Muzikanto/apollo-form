'use strict';
var __importDefault =
   (this && this.__importDefault) ||
   function(mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
function parseFileList(fileList) {
   const list = [];
   for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (file) {
         list.push(file);
      }
   }
   return list;
}
const wrongErr = 'Wrong file format';
const toLargeErr = 'File size is to large';
function FilePicker(props) {
   const fileInputRef = react_1.default.createRef();
   const [dragged, setDragged] = react_1.default.useState(false);
   const onClick = react_1.default.useCallback(
      e => {
         if (fileInputRef.current) {
            fileInputRef.current.click();
         }
      },
      [fileInputRef],
   );
   const onChange = react_1.default.useCallback(
      list => {
         if (props.accept && props.accept.indexOf(list[0].type) === -1) {
            if (props.onError) {
               props.onError(wrongErr);
            }
            return;
         }
         if (props.maxSize && list[0].size > props.maxSize) {
            if (props.onError) {
               props.onError(toLargeErr);
            }
            return;
         }
         if (props.multiple) {
            const arr = [];
            if (!props.reset) {
               arr.push.apply(arr, props.value);
            }
            arr.push.apply(arr, list);
            if (props.onChange) {
               props.onChange(arr);
            }
         } else {
            if (props.onChange) {
               props.onChange(list[0]);
            }
         }
      },
      [props.onChange, props.value],
   );
   const onDragEnter = react_1.default.useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
         setDragged(true);
      }
   }, []);
   const onDragLeave = react_1.default.useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
      setDragged(false);
   }, []);
   const onDragOver = react_1.default.useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
   }, []);
   const onDrop = react_1.default.useCallback(e => {
      e.preventDefault();
      e.stopPropagation();
      setDragged(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         onChange(parseFileList(e.dataTransfer.files));
         e.dataTransfer.clearData();
      }
   }, []);
   return react_1.default.createElement(
      react_1.default.Fragment,
      null,
      props.children({
         onClick,
         onDragEnter,
         onDragLeave,
         onDragOver,
         onDrop,
         dragged,
      }),
      react_1.default.createElement('input', {
         ref: fileInputRef,
         type: 'file',
         value: '',
         accept: props.accept ? props.accept.join(',') : undefined,
         style: { display: 'none' },
         multiple: props.multiple,
         onChange: e => {
            const targetFiles = e.target.files;
            if (targetFiles) {
               onChange(parseFileList(targetFiles));
            }
            e.target.value = '';
         },
         'data-max-size': props.maxSize,
      }),
   );
}
exports.default = FilePicker;
