import * as Yup from 'yup';
import { ApolloForm, ResponseMessage, Submit } from '../src';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import useField, { IUseFieldProps } from '../src/hooks/useField';
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
import FormManager from '../src/managers/FormManager';
import Reset from '../src/utils/Reset';

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
   const field = useField<string>({ name, validate });

   console.log('Render: ', name);

   return <TextField {...getFieldProps(field)} variant='outlined' {...other} />;
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
         {({ disabled, loading }) =>
            loading ? <CircularProgress /> : <Button disabled={disabled} {...props} />
         }
      </Submit>
   );
}

function Form() {
   const [state, setState] = React.useState(initialState);
   // const apollo = useApolloClient();

   const ref = React.useRef<FormManager<SignInFormState>>(null);
   const [form, setForm] = React.useState<FormManager<SignInFormState> | null>(null);

   React.useEffect(() => {
      if (form) {
         form.watch(s => s.values, (next, prev) => console.log(next, prev));
      }
   }, [form]);

   return (
      <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <Paper style={{ maxWidth: 500, padding: 20 }}>
               <ApolloForm<SignInFormState>
                  ref={ref}
                  name='signin'
                  enableReinitialize
                  initialState={initialState}
                  validationSchema={validationSchema}
                  onSubmit={async ({ values }, form) => {
                     try {
                        await wait(1000);
                        console.log('Submit state: ', values);

                        form.reset({ ...initialState, email: 'reseted' });
                        // apollo.resetStore().then();
                     } catch (e) {
                        form.responseMessage('Invalid password');
                     }
                  }}
                  formatState={({ next, prev, event }) => ({
                     ...next,
                     email2: event.key === 'email' ? next.email : prev.email,
                  })}
                  onChange={(state, prev, form, event) => {
                     console.log(event);
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
                        <Reset>
                           {({ disabled }) => (
                              <Button
                                 variant='contained'
                                 style={{ marginLeft: 16 }}
                                 type='reset'
                                 disabled={disabled}
                              >
                                 Reset
                              </Button>
                           )}
                        </Reset>
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

export function SignIn() {
   return <Form />;
}
