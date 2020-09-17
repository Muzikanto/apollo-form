import useField, { FieldParams, FieldValidator } from './useField';

export interface IUseFieldArrayProps<Value> {
   name: string;
   validate?: FieldValidator<Value[]>;
}

export interface FieldArrayParams<Value> extends FieldParams<Value[]> {
   push: (value: Value) => void;
   removeAt: (index: number) => void;
   insertAt: (index: number) => void;
   pop: () => void;
   swap: (index1: number, index2: number) => void;
   clear: () => void;
}

function useFieldArray<Value>(props: IUseFieldArrayProps<Value>): FieldArrayParams<Value> {
   const field = useField<Value[]>({
      name: props.name,
      validate: props.validate,
   });

   if (!Array.isArray(field.value)) {
      console.error(props.name + ' is not array');
   }

   const push = (...args: Value[]) => {
      field.setFieldValue([...field.value, ...args]);
   };
   const removeAt = (index: number) => {
      const newArr = [...field.value];

      newArr.splice(index, 1);

      field.setFieldValue(newArr);
   };
   const insertAt = (index: number, ...args: Value[]) => {
      const newArr = [...field.value];

      newArr.splice(index, 0, ...args);

      field.setFieldValue(newArr);
   };
   const pop = () => {
      const newArr = [...field.value];

      newArr.pop();

      field.setFieldValue(newArr);
   };
   const swap = (index1: number, index2: number) => {
      const newArr = [...field.value];

      [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];

      field.setFieldValue(newArr);
   };
   const clear = () => {
      field.setFieldValue([]);
   };

   return {
      ...field,

      push,
      removeAt,
      insertAt,
      pop,
      swap,
      clear,
   };
}

export default useFieldArray;
