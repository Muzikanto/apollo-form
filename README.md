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
-  [Demo](#demo)
-  [Examples](#examples)
   -  [Full form](#full-form)
   -  [Create field](#create-field)
   -  [Create array field](#create-array-field)
   -  [Create file field](#create-file-field)
   -  [Submit btn](#create-submit-button)
   -  [Reset btn](#create-reset-button)
   -  [Loader](#show-loader)
   -  [Error message](#show-error-message)
-  [API](#api)
   -  [Form api](#form-api)
   -  [Field](#field-api)
-  [License](#license)

<!-- /TOC -->

## Introduction

Advanced form state, optimized fields rendering, form validation, file picker and more.

## Installation

```sh
npm i apollo-form
# or
yarn add apollo-form
```

## Demo

Show [code](./examples) of stories

[Demo sign in](https://muzikanto.github.io/apollo-form?path=/story/components--sign-in)

[Demo todo list](https://muzikanto.github.io/apollo-form?path=/story/components--todo-list)

[Demo with confirm](https://muzikanto.github.io/apollo-form?path=/story/components--with-confirm)

## Examples

### Full form

```typescript jsx
interface CreatePlanFormValues {
   title: string;
   price: number;
   features: Array<{ title: string }>;
}

const validationSchema = Yup.object().shape({
   title: Yup.string().required(),
   price: Yup.number()
      .required()
      .min(0),
   features: Yup.array().of(
      Yup.object().shape({
         title: Yup.string().required(),
      }),
   ),
});

const initialState = {
   title: '',
   price: 0,
   features: [],
};

function CreatePlanForm() {
   return (
      <ApolloForm<CreatePlanFormValues>
         name='CreatePlanForm'
         enableReinitialize
         initialState={initialState}
         validationSchema={validationSchema}
         onSubmit={async ({ values }, form) => {
            try {
               await createPlanMutation({ variables: values });

               form.reset();
            } catch (e) {
               form.responseError(e.message);
            }
         }}
      >
         <Field name='title'>{({ field }) => <input {...getFieldProps(field)} />}</Field>
         <Field name='price'>
            {({ field }) => <input type='number' {...getFieldProps(field)} />}
         </Field>

         <FieldArray<{ title: string }> name='features'>
            {({ field }) => {
               return (
                  <>
                     {field.value.map((el, i) => {
                        return (
                           <div key={'plan-feature-' + i}>
                              <input key={'test' + i} name={'features' + '.' + i} />
                           </div>
                        );
                     })}

                     <div>
                        <button onClick={() => field.push({ title: '' })}>Push feature</button>
                        <Button onClick={() => field.pop()}>Pop feature</Button>
                     </div>
                  </>
               );
            }}
         </FieldArray>

         <ResponseMessage>{({ error }) => <span>{error}</span>}</ResponseMessage>
         <FormLoader>
            {({ loading }) => (
               <span style={{ display: loading ? 'block' : 'none' }}>Loading...</span>
            )}
         </FormLoader>

         <Submit>
            {({ disabled }) => (
               <button type='submit' disabled={disabled}>
                  Create plan
               </button>
            )}
         </Submit>
         <Reset>
            {({ disabled }) => (
               <button type='reset' disabled={disabled}>
                  Reset
               </button>
            )}
         </Reset>
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

### create file field

```typescript jsx
function ImageField(props: Omit<ImageFieldProps, 'children'>) {
   return (
      <FileField accept={['image/jpeg', 'image/png']} maxSize={1024 * 500} {...props}>
         {({ field, onClick }) => {
            const [img, setImg] = React.useState<string | null>(null);

            React.useEffect(() => {
               if (field.value) {
                  fileToBase64(field.value).then(r => setImg(r));
               }
            }, [field.value]);

            return (
               <>
                  {field.value ? (
                     <>
                        {img && (
                           <>
                              <img style={{ width: '100%' }} src={img} alt={field.value.name} />
                              <Button onClick={onClick} variant='contained'>
                                 Upload new image
                              </Button>
                           </>
                        )}
                     </>
                  ) : (
                     <Button variant='contained' onClick={onClick}>
                        Upload image
                     </Button>
                  )}
               </>
            );
         }}
      </FileField>
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

### create reset button

```typescript jsx
function FormSubmit() {
   return (
      <Reset>
         {({ disabled }) => (
            <Button type='reset' disabled={disabled}>
               Submit
            </Button>
         )}
      </Reset>
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

## Api

### Form api

| Name               | Type         | Required | Description                                                                 |
| ------------------ | ------------ | -------- | --------------------------------------------------------------------------- |
| name               | string       | yes      | graphql client value name, like this `query ApolloForm { ${name} @client }` |
| initialState       | object       | yes      | Initial form state                                                          |
| initialErrors      | FormErrors   | no       | Initial errors                                                              |
| initialTouches     | FormTouches  | no       | Initial touched fields                                                      |
| validationSchema   | ObjectSchema | no       | Yup validation schema                                                       |
| validate           | Function     | no       | Custom form validation, function returned errors state                      |
| resetOnSubmit      | boolean      | no       | Reset form with `initialState` after submit                                 |
| validateOnMount    | boolean      | no       | Validate form on mount                                                      |
| enableReinitialize | boolean      | no       | Reset form with new `initialState`                                          |
| onInit             | Function     | no       | Function for save form reference                                            |
| onSubmit           | Function     | no       | Async function for handle form submit                                       |
| onChange           | Function     | no       | Handle state changes (called only if values changed)                        |
| saveOnUnmount      | boolean      | no       | Save form state in apollo global state                                      |
| resetOnUnmount     | boolean      | no       | Reset form with `initialState` after unmount form                           |

### Field api

| Name     | Type     | Required | Description                                                                                     |
| -------- | -------- | -------- | ----------------------------------------------------------------------------------------------- |
| name     | string   | yes      | key of state object                                                                             |
| validate | Function | no       | Function for validate value, return err(string) or undefined                                    |
| children | Function | yes      | Function for render, return object of "value", "error", "touched", "focused" and change actions |

## License

[MIT](LICENSE)
