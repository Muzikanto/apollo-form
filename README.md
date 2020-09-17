## Apollo-form

[![npm version](https://badge.fury.io/js/%40muzikanto%2Fapollo-form.svg)](https://badge.fury.io/js/%40muzikanto%2Fapollo-form)
[![downloads](https://img.shields.io/npm/dm/@muzikanto/apollo-form.svg)](https://www.npmjs.com/package/@muzikanto/apollo-form)
[![dependencies Status](https://david-dm.org/muzikanto/apollo-form/status.svg)](https://david-dm.org/muzikanto/apollo-form)
[![size](https://img.shields.io/bundlephobia/minzip/@muzikanto/apollo-form)](https://bundlephobia.com/result?p=@muzikanto/apollo-form)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

<!-- TOC -->

-  [Introduction](#introduction)
-  [Installation](#installation)
-  [Examples](#examples)
-  [API](#api)
-  [License](#license)

<!-- /TOC -->

## Introduction

-  create form state and helpers
-  create form fields

## Installation

```sh
npm i @muzikanto/apollo-form
# or
yarn add @muzikanto/apollo-form
```

## Examples

[demo](https://muzikanto.github.io/apollo-form)

[example code](./stories/example.stories.tsx)

### create api

```typescript jsx
interface State {
   text: string;
   field: string;
   deep: {
      one: string;
      two: string;
   };
   arr: string[];
}

const validationSchema = Yup.object().shape({
   text: Yup.string()
      .required()
      .max(5),
   field: Yup.string()
      .required()
      .max(3),
});

const form = createForm<FormState>({
   validateOnMount: false,
   initialState: {
      text: '123',
      field: '',
      deep: { one: '1', two: '' },
      arr: ['1', '2', '3'],
   },
   validationSchema,
});

form.values.watch(state => console.log('values: ', state));
```

### create field

```typescript jsx
function FieldInput(props: { name: string }) {
   const { value, error, touched, setFieldTouched, setFieldValue } = useField<string>({
      name: props.name,
      validate: v => {
         if (false) {
            return 'my custom error';
         }
      },
   });

   const touchedAndError = Boolean(touched && error);

   return (
      <>
         <input
            value={value}
            onChange={e => setFieldValue(e.target.value)}
            onBlur={() => setFieldTouched(true)}
         />
         {touchedAndError && <span>{error}</span>}
      </>
   );
}
```

### Use

```typescript jsx
function FormComponent() {
   return (
      <Form
         form={form}
         formId='form-id'
         formProps={{}}
         Confirm={({ open, onClose, onAccept }) => (
            <Dialog open={open} onClose={onClose}>
               <DialogContent>
                  <Button
                     onClick={() => {
                        onClose();
                        form.reset();
                     }}
                  >
                     Reject
                  </Button>
                  <Button onClick={onAccept}>Accept</Button>
               </DialogContent>
            </Dialog>
         )}
      >
         <FieldInput name='text' />
         <FieldInput name='field' />
         <FieldInput name='deep.one' />

         <button onClick={() => form.reset()}>RESET</button>
         <button onClick={() => form.validate()}>VALIDATE</button>

         <Submit
            component={({ onClick, disabled }) => (
               <button onClick={onClick} disabled={disabled}>
                  Submit
               </button>
            )}
         />
         <ErrorMessage name='field' component={props => <span {...props} />} />
      </Form>
   );
}
```

## License

[MIT](LICENSE)
