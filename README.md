<h1 align="center">Apollo-form</h1>

<div align="center">

[![npm version](https://badge.fury.io/js/apollo-form.svg)](https://badge.fury.io/js/apollo-form)
[![downloads](https://img.shields.io/npm/dm/apollo-form.svg)](https://www.npmjs.com/package/apollo-form)
[![size](https://img.shields.io/bundlephobia/minzip/apollo-form)](https://bundlephobia.com/result?p=apollo-form)
[![Coverage Status](https://img.shields.io/codecov/c/github/muzikanto/apollo-form/master.svg)](https://codecov.io/gh/muzikanto/apollo-form/branch/master)
[![dependencies Status](https://david-dm.org/apollo-form/status.svg)](https://david-dm.org/apollo-form)
[![type](https://badgen.net/npm/types/apollo-form)](https://badgen.net/npm/types/apollo-form)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/muzikanto/apollo-form/blob/master/LICENSE)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

</div>

<!-- TOC -->

-  [Introduction](#introduction)
-  [Installation](#installation)
-  [Examples](#examples)
-  [API](#api)
-  [License](#license)

<!-- /TOC -->

## Introduction

-  partial render form
-  easy create form
-  form validation
-  create form fields
-  create form array fields

## Installation

```sh
npm i apollo-form
# or
yarn add apollo-form
```

## Examples

[Demo](https://muzikanto.github.io/apollo-form)

[Demo sign in](https://muzikanto.github.io/apollo-form?path=/story/components--sign-in)

[Demo todo list](https://muzikanto.github.io/apollo-form?path=/story/components--todo-list)

[Demo with confirm](https://muzikanto.github.io/apollo-form?path=/story/components--with-confirm)

Show [code examples](./examples)

Learn [docs for use this package](https://github.com/Muzikanto/apollo-form/wiki)

## Api

### create Form

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
   email: Yup.string()
      .required()
      .max(5),
   deep: Yup.object().shape({
      one: Yup.string()
         .required()
         .max(2),
   }),
});

const initialState = {
   email: '1',
   password: '',
   deep: { one: '1' },
   arr: ['', '2', '31'],
};

function Example() {
   return (
      <ApolloForm
         // query name, please use valid name
         // generated: gql`query ApolloForm { test @client }`
         name='test'
         // reset form values with current `initialState`
         // please use carefully
         enableReinitialize
         initialState={initialState}
         validationSchema={validationSchema}
         validate={({ values }) => {
            if (values.email === '12') {
               return {
                  email: 'Not 12',
               };
            }

            return undefined;
         }}
         onSubmit={async ({ values }, form) => {
            await wait(1000);
            console.log('submit', values);
            form.reset({
               ...values,
               email: 'Reseted',
            });
         }}
         onChange={(state, form) => console.log('Values: ', state)}
      >
         <FormTextField
            name='email'
            validate={v => {
               if (v.length === 1) {
                  return 'custom error';
               }

               return undefined;
            }}
         />
         <FormTextField name='password' />
         <FormTextField name='deep.one' />
         <FormTextField name='arr.0' />
      </ApolloForm>
   );
}
```

### create field

```typescript jsx
function FormTextField(props: { name: string; validate?: FieldValidator<string> }) {
   const field = useField(props);

   return <TextField {...getFieldProps(field)} />;
}

// or

function FormTextField(props: { name: string; validate?: FieldValidator<string> }) {
   return (
      <Field<string> name={props.name} validate={props.validate}>
         {({ field }) => {
            const showError = Boolean(!field.focused && field.touched && field.error);

            return (
               <TextField
                  value={field.value}
                  onChange={e => field.setFieldValue(e.target.value)}
                  onFocus={() => field.setFieldFocused()}
                  onBlur={() => field.setFieldTouched(true)}
                  helperText={showError ? field.error : undefined}
                  error={showError}
               />
            );
         }}
      </Field>
   );
}
```

### create array field

```typescript jsx
function FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {
   return (
      <FieldArray<string> name={props.name} validate={props.validate}>
         {({ field }) => {
            return (
               <>
                  {field.value.map((el, i) => {
                     return (
                        <Grid item xs={3} key={'arr-field' + i}>
                           <FormTextField
                              key={'test' + i}
                              name={props.name + '.' + i}
                              label={props.name + '.' + i}
                           />
                        </Grid>
                     );
                  })}

                  <Grid item xs={3}>
                     <Box display='flex'>
                        <Button onClick={() => field.push((field.value.length + 1).toString())}>
                           push
                        </Button>
                        <Button onClick={() => field.pop()}>pop</Button>
                     </Box>
                  </Grid>
               </>
            );
         }}
      </FieldArray>
   );
}
```

### create submit button

```typescript jsx
function FormSubmit() {
   return (
      <Submit>
         {({ isValid, isSubmitted, loading, existsChanges }) => (
            <Button type='submit' disabled={loading || (isSubmitted ? !isValid : false)}>
               Submit
            </Button>
         )}
      </Submit>
   );
}
```

### show error message

```typescript jsx
function FirstError(props: { name: string; ignoreTouched?: boolean }) {
   return (
      <ErrorMessage
         ignoreTouched={props.ignoreTouched}
         name={props.name}
         children={({ error }) => (
            <span>
               password-err: (<b style={{ color: 'red' }}>{error}</b>)
            </span>
         )}
      />
   );
}
```

### show loader

```typescript jsx
function CustomLoader() {
   return (
      <FormLoader children={({ loading }) => <span>{loading ? 'loading...' : 'loaded'}</span>} />
   );
}
```

### create query

```typescript jsx
const myFormQuery = makeApolloFormQuery('my-form');

function useMyFormState() {
    return useQuery(myFormQuery);
}

function Form() {
   return (
      <ApolloForm
         name='my-form'
         ...
      >
         ...
      </ApolloForm>
   );
}
```

## License

[MIT](LICENSE)
