import * as Yup from 'yup';
import { ApolloForm, Field, ResponseMessage, Submit } from '../src';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { IUseFieldProps } from '../src/hooks/useField';
import { ButtonProps, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PreviewState, wait } from './utils';
import getFieldProps from '../src/field/getFieldProps';
import Alert from '@material-ui/lab/Alert';
import FormManager from '../src/FormManager';

export default {
   title: 'Components',
};

type SignInFormState = {
   email: string;
   password: string;
};

const validationSchema = Yup.object().shape<SignInFormState>({
   email: Yup.string()
      .required()
      .min(4),
   password: Yup.string()
      .required()
      .min(4),
});

const initialState: SignInFormState = {
   email: '',
   password: '',
};

type FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;

function FormTextField({ name, validate, ...other }: FormTextFieldProps) {
   return (
      <Field<string> name={name} validate={validate}>
         {({ field }) => {
            console.log('Render: ', name);

            return <TextField {...getFieldProps(field)} variant='outlined' {...other} />;
         }}
      </Field>
   );
}

function FormPassword(props: FormTextFieldProps) {
   const [show, toggle] = React.useState(false);

   return (
      <FormTextField
         {...props}
         type={show ? 'text' : 'password'}
         InputProps={{
            endAdornment: (
               <InputAdornment position='end'>
                  <IconButton onClick={() => toggle(!show)}>
                     {show ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
               </InputAdornment>
            ),
            ...props.InputProps,
         }}
      />
   );
}

function SubmitButton(props: ButtonProps) {
   return (
      <Submit>
         {({ isValid, isSubmitted, loading }) =>
            loading ? (
               <CircularProgress />
            ) : (
               <Button disabled={isSubmitted ? !isValid : false} {...props} />
            )
         }
      </Submit>
   );
}

export function SignIn() {
   const [form, setForm] = React.useState<FormManager<SignInFormState> | null>(null);
   console.log(form);
   return (
      <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <Paper style={{ maxWidth: 500, padding: 20 }}>
               <ApolloForm<SignInFormState>
                  name='signin'
                  initialState={initialState}
                  removeOnUnmount
                  validationSchema={validationSchema}
                  onSubmit={async ({ values }, form) => {
                     await wait(1000);
                     console.log('Submit state: ', values);

                     form.reset({ ...initialState, email: 'reseted' });
                     form.responseMessage('Invalid password');
                  }}
                  onInit={form => {
                     setForm(form);
                  }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography variant='h5' align='center'>
                           Sign in form
                        </Typography>
                     </Grid>
                     <Grid item xs={12}>
                        <ResponseMessage>
                           {({ error }) => (
                              <Alert variant='filled' severity='error'>
                                 {error}
                              </Alert>
                           )}
                        </ResponseMessage>
                     </Grid>
                     <Grid item xs={12}>
                        <FormTextField
                           name='email'
                           type='email'
                           label='Enter email'
                           validate={email => {
                              if (email && email.includes('@mail.ru')) {
                                 return 'Please don`t use @mail.ru email';
                              }
                           }}
                           fullWidth
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormPassword name='password' label='Enter password' fullWidth />
                     </Grid>
                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <SubmitButton type='submit' variant='contained' color='primary'>
                           Sign in
                        </SubmitButton>
                     </Grid>
                  </Grid>
               </ApolloForm>
            </Paper>
         </Grid>
         <Grid item xs={12} md={6}>
            {form && <PreviewState name={form.name} />}
         </Grid>
      </Grid>
   );
}
