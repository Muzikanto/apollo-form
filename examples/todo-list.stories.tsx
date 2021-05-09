import * as Yup from 'yup';
import { Form, Submit, useFieldArray } from '../src';
import * as React from 'react';
import { UseFieldProps } from '../src/hooks/useField';
import { ButtonProps, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PreviewState } from './utils';
import Chip from '@material-ui/core/Chip';
import FormManager from '../src/form/FormManager';

export default {
   title: 'Components',
};

type SignInFormState = {
   todos: Date[];
};

const validationSchema = Yup.object().shape<SignInFormState>({
   todos: Yup.array()
      .of(Yup.date().max(addDay(new Date(), 3)))
      .required()
      .min(2),
});

const initialState: SignInFormState = {
   todos: [addDay(new Date(), 1), addDay(new Date(), 2), addDay(new Date(), 3)],
};

type FormTodoManagerProps = UseFieldProps<Date[]>;

function FormTodoManager({ name, validate, ...other }: FormTodoManagerProps) {
   const field = useFieldArray({ name, validate });

   return (
      <Grid container spacing={2}>
         {field.value.map((todo, i) => {
            return (
               <Grid item key={'todo-' + i}>
                  <Chip
                     label={todo.toLocaleDateString()}
                     style={{ width: 150 }}
                     onDelete={() => {
                        field.removeAt(i);
                     }}
                  />
               </Grid>
            );
         })}
         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
               onClick={() => field.push(addDay(new Date(), field.value.length + 1 || 1))}
               variant='contained'
               color='primary'
            >
               Push todo
            </Button>
            <Button
               onClick={() => field.swap(0, field.value.length - 1)}
               variant='contained'
               color='primary'
               disabled={field.value.length < 2}
            >
               Swap first and last
            </Button>
         </Grid>

         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
               onClick={() => field.pop()}
               variant='contained'
               color='secondary'
               disabled={field.value.length < 1}
            >
               Delete last
            </Button>
            <Button
               onClick={() => field.clear()}
               variant='contained'
               color='secondary'
               disabled={field.value.length < 1}
            >
               Clear
            </Button>
         </Grid>
      </Grid>
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

export function TodoList() {
   const [form, setForm] = React.useState<FormManager<SignInFormState> | null>(null);

   return (
      <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <Paper style={{ maxWidth: 500, padding: 20 }}>
               <Form<SignInFormState>
                  name='todolist'
                  saveOnUnmount
                  initialState={initialState}
                  validationSchema={validationSchema}
                  onSubmit={async ({ values }, form) => {
                     await wait(1000);
                     console.log('Submit state: ', values);

                     form.reset({
                        todos: [],
                     });
                  }}
                  onInit={form => {
                     setForm(form);
                  }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography variant='h5' align='center'>
                           Todo list
                        </Typography>
                     </Grid>
                     <Grid item xs={12}>
                        <FormTodoManager name='todos' />
                     </Grid>
                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <SubmitButton type='submit' variant='contained' color='primary'>
                           Save
                        </SubmitButton>
                     </Grid>
                  </Grid>
               </Form>
            </Paper>
         </Grid>
         <Grid item xs={12} md={6}>
            {form && <PreviewState form={form} />}
         </Grid>
      </Grid>
   );
}

function addDay(date: Date, days: number) {
   return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);
}

function wait(time: number) {
   return new Promise(resolve => setTimeout(resolve, time));
}
