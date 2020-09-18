import * as React from 'react';
import { ApolloForm, Field, FieldValidator } from '../src';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../src/utils/ErrorMessage';
import Submit from '../src/utils/Submit';
import FormConsumer from '../src/consumers/FormConsumer';
import StateConsumer from '../src/consumers/StateConsumer';
import FieldArray from '../src/field/FieldArray';
import FormLoader from '../src/utils/FormLoader';

function wait(time: number) {
   return new Promise(resolve => {
      setTimeout(resolve, time);
   });
}

export default {
   title: 'Components',
};

const validationSchema = Yup.object().shape({
   email: Yup.string()
      .required()
      .max(5),
   password: Yup.string()
      .required()
      .max(3),
   deep: Yup.object().shape({
      one: Yup.string()
         .required()
         .max(2),
   }),
   arr: Yup.array()
      .of(
         Yup.string()
            .required()
            .max(3),
      )
      .min(3)
      .test('aeqwes', 'error test', arr => {
         return !(arr.filter((el: string) => el.length === 2).length > 0);
      }),
});

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

export function Example() {
   const [initialState, setState] = React.useState({
      email: '1',
      password: '',
      deep: { one: '1' },
      arr: ['', '2', '31'],
   });

   // check enableReinitialize
   // React.useEffect(() => {
   //    const interval = setInterval(() => {
   //       setState({ ...initialState, email: initialState.email + '1' });
   //    }, 2000);
   //
   //    return () => clearInterval(interval);
   // }, [setState, initialState]);
   // console.log('render');

   return (
      <ApolloForm
         name='test'
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
         onChange={(state, form) => console.log('onChange: ', form.get().values)}
         enableReinitialize
      >
         <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
               <Grid item xs={3}>
                  <FormTextField
                     name='email'
                     label='email'
                     validate={v => {
                        if (v.length === 1) {
                           return 'custom error';
                        }

                        return undefined;
                     }}
                  />
               </Grid>
               <Grid item xs={3}>
                  <FormTextField name='password' label='password' />
               </Grid>
               <Grid item xs={3}>
                  <FormTextField name='deep.one' label='Deep one' />
               </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
               <FormTextFieldArray
                  name='arr'
                  validate={arr => {
                     if (arr.filter(el => el.length === 0).length !== 0) {
                        return 'not empty in arr';
                     }

                     return undefined;
                  }}
               />
            </Grid>

            <Grid item xs={12}>
               <Divider />
            </Grid>
            <Grid item xs={12}>
               <FormConsumer>
                  {({ form }) => <Button onClick={() => form.reset()}>RESET</Button>}
               </FormConsumer>
               <FormConsumer>
                  {({ form }) => <Button onClick={() => form.validate(true)}>VALIDATE</Button>}
               </FormConsumer>
               <Submit>
                  {({ isValid, isSubmitted, loading }) => (
                     <Button type='submit' disabled={loading || (isSubmitted ? !isValid : false)}>
                        Submit
                     </Button>
                  )}
               </Submit>
            </Grid>

            <Grid item xs={12}>
               <Divider />
            </Grid>
            <Grid item xs={12} container spacing={2}>
               <Grid item xs={2}>
                  <StateConsumer>
                     {({ state: { isValid } }) => <>{'Is valid: ' + isValid.toString()}</>}
                  </StateConsumer>
               </Grid>
               <Grid item xs={2}>
                  <FormLoader>{({ loading }) => <>{'Loading ' + loading.toString()}</>}</FormLoader>
               </Grid>
               <Grid item xs={2}>
                  <StateConsumer selector={s => s.existsChanges}>
                     {({ state: existsChanges }) => (
                        <>{'Exists changes: ' + existsChanges.toString()}</>
                     )}
                  </StateConsumer>
               </Grid>
               <Grid item xs={2}>
                  <StateConsumer selector={s => s.isSubmitted}>
                     {({ state: isSubmitted }) => <>{'Is submitted: ' + isSubmitted.toString()}</>}
                  </StateConsumer>
               </Grid>
            </Grid>
            <Grid item xs={12}>
               <Divider />
            </Grid>

            <Grid item xs={3}>
               <ErrorMessage
                  name='password'
                  children={({ error }) => (
                     <span>
                        password-err: (<b style={{ color: 'red' }}>{error}</b>)
                     </span>
                  )}
               />
            </Grid>
            <Grid item xs={3}>
               <ErrorMessage
                  name='arr'
                  children={({ error }) => (
                     <span>
                        arr-err: (<b style={{ color: 'red' }}>{error}</b>)
                     </span>
                  )}
               />
            </Grid>
         </Grid>
      </ApolloForm>
   );
}

export function anotherPage() {
   return <div>another page</div>;
}
