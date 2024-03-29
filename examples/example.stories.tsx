import * as React from 'react';
import { Form, Field, FieldValidator, FormErrors } from '../src';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ErrorMessage from '../src/consumers/ErrorMessage';
import Submit from '../src/consumers/Submit';
import FormConsumer from '../src/consumers/FormConsumer';
import FieldArray from '../src/field/FieldArray';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { PreviewState } from './utils';
import FormManager from '../src/form/FormManager';

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
      .test('arr', 'Not length equal 2 words', arr => {
         return !(arr.filter((el: string) => el.length === 2).length > 0);
      }),
});

function FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {
   return (
      <Field<string> name={props.name} validate={props.validate}>
         {({ field }) => {
            const err = Boolean(field.touched && field.error);

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
      <Paper style={{ padding: 24 }}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography>Example deep array fields</Typography>
            </Grid>
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

                        <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>
                           <Button
                              variant='contained'
                              onClick={() => field.push((field.value.length + 1).toString())}
                           >
                              push
                           </Button>
                           <Button
                              variant='contained'
                              onClick={() => field.pop()}
                              style={{ marginLeft: 16 }}
                           >
                              pop
                           </Button>
                        </Grid>
                     </>
                  );
               }}
            </FieldArray>
         </Grid>
      </Paper>
   );
}

type FormState = {
   email: string;
   password: string;
   deep: { one: string; two: { test: string } };
   arr: string[];
};

export function Example() {
   const [form, setForm] = React.useState<FormManager<FormState> | null>(null);

   const [initialState, setState] = React.useState<FormState>({
      email: '1',
      password: '',
      deep: { one: '1', two: { test: '2' } },
      arr: ['', '2', '31'],
   });

   return (
      <Form<FormState>
         name='example'
         saveOnUnmount
         initialState={initialState}
         validationSchema={validationSchema}
         validate={({ values }) => {
            const errors: FormErrors<FormState> = {};

            if (values.email === '12') {
               errors.email = 'Not 12';
            }
            if (false) {
               // example deep errors
               errors.deep = ['deep error', { one: 'deep oen error', two: [undefined, 'error'] }];
            }

            return errors;
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
         onInit={form => {
            setForm(form);
         }}
      >
         <Grid container spacing={2}>
            <Grid item xs={8}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Paper style={{ padding: 24 }}>
                        <Grid container spacing={2}>
                           <Grid item xs={12}>
                              <Typography>Example basic fields</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <FormTextField
                                 name={'email'}
                                 label='email'
                                 validate={v => {
                                    if (v && v.length === 1) {
                                       return 'custom error';
                                    }
                                 }}
                              />
                           </Grid>
                           <Grid item xs={6}>
                              <FormTextField name='password' label='password' />
                           </Grid>
                        </Grid>
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper style={{ padding: 24 }}>
                        <Grid container spacing={2}>
                           <Grid item xs={12}>
                              <Typography>Example deep object fields</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <FormTextField name='deep.one' label='deep.one' />
                           </Grid>
                           <Grid item xs={6}>
                              <FormTextField name='deep.two.test' label='deep.two.test' />
                           </Grid>
                        </Grid>
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <FormTextFieldArray
                        name='arr'
                        validate={arr => {
                           if (arr.filter(el => el.length === 0).length !== 0) {
                              return 'not empty in arr';
                           }
                        }}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Paper style={{ padding: 24 }}>
                        <Grid container spacing={2}>
                           <Grid item xs={12}>
                              <Typography>Example actions</Typography>
                           </Grid>
                           <Grid item>
                              <FormConsumer>
                                 {({ form }) => (
                                    <Button variant='contained' onClick={() => form.reset()}>
                                       RESET
                                    </Button>
                                 )}
                              </FormConsumer>
                           </Grid>
                           <Grid item>
                              <FormConsumer>
                                 {({ form }) => (
                                    <Button variant='contained' onClick={() => form.validate(true)}>
                                       VALIDATE
                                    </Button>
                                 )}
                              </FormConsumer>
                           </Grid>
                           <Grid item>
                              <Submit>
                                 {({ disabled }) => (
                                    <Button variant='contained' type='submit' disabled={disabled}>
                                       Submit
                                    </Button>
                                 )}
                              </Submit>
                           </Grid>
                        </Grid>
                     </Paper>
                  </Grid>
                  <Grid item xs={12}>
                     <Paper style={{ padding: 24 }}>
                        <Grid container spacing={2}>
                           <Grid item xs={3}>
                              <ErrorMessage
                                 name='password'
                                 children={({ error }) => (
                                    <span>
                                       password error: (<b style={{ color: 'red' }}>{error}</b>)
                                    </span>
                                 )}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <ErrorMessage
                                 name='arr'
                                 children={({ error }) => (
                                    <span>
                                       arr error: (<b style={{ color: 'red' }}>{error}</b>)
                                    </span>
                                 )}
                              />
                           </Grid>
                           <Grid item xs={3}>
                              <ErrorMessage
                                 name='arr.0'
                                 children={({ error }) => (
                                    <span>
                                       arr.0 error: (<b style={{ color: 'red' }}>{error}</b>)
                                    </span>
                                 )}
                              />
                           </Grid>
                        </Grid>
                     </Paper>
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={4}>
               {form && <PreviewState form={form} />}
            </Grid>
         </Grid>
      </Form>
   );
}

function wait(time: number) {
   return new Promise(resolve => setTimeout(resolve, time));
}
