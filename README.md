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

[demo](https://muzikanto.github.io/apollo-form)

[example code](./stories/example.stories.tsx)

### create field

```typescript jsx
function FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {
   return (
      <Field<string> name={props.name} validate={props.validate}>
         {({ field }) => {
            const err = Boolean(field.touched && field.error);
            console.log('render ' + props.name);

            return (
               <TextField
                  value={field.value}
                  onChange={e => field.setFieldValue(e.target.value)}
                  onBlur={() => field.setFieldTouched(true)}
                  helperText={err ? field.error : undefined}
                  error={Boolean(field.touched && field.error)}
                  label={props.label}
               />
            );
         }}
      </Field>
   );
}
```

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
         name='test'
         initialState={initialState}
         enableReinitialize
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
         onChange={(state, form) => console.log('onChange: ', form.get().values)}
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

## create submit button

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

## show error message

```typescript jsx
function FormError(props: { name: string; ignoreTouched?: boolean }) {
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

## show loader

```typescript jsx
function CustomLoader() {
   return (
      <FormLoader children={({ loading }) => <span>{loading ? 'loading...' : 'loaded'}</span>} />
   );
}
```

## License

[MIT](LICENSE)
