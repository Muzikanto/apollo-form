import { Form, Submit } from '../src';
import * as React from 'react';
import { ButtonProps, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PreviewState, wait } from './utils';
import Alert from '@material-ui/lab/Alert';
import FormManager from '../src/form/FormManager';
import FirstError from '../src/consumers/FirstError';
import FieldImage from '../src/field/FieldImage';

export default {
   title: 'Components',
};

type GalleryFormState = {
   image: File | undefined;
};

const initialState: GalleryFormState = {
   image: undefined,
};

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

function GalleryForm() {
   const [form, setForm] = React.useState<FormManager<GalleryFormState> | null>(null);

   return (
      <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <Paper style={{ maxWidth: 500, padding: 20 }}>
               <Form<GalleryFormState>
                  name='gallery'
                  saveOnUnmount
                  initialState={initialState}
                  onSubmit={async ({ values }, form) => {
                     await wait(1000);

                     form.reset();
                     console.log(values);
                  }}
                  onInit={form => {
                     setForm(form);
                  }}
                  onChange={s => console.log(s)}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography variant='h5' align='center'>
                           Gallery form
                        </Typography>
                     </Grid>
                     <Grid item xs={12}>
                        <FirstError>
                           {({ error }) => (
                              <Alert variant='filled' severity='error'>
                                 {error}
                              </Alert>
                           )}
                        </FirstError>
                     </Grid>
                     <Grid item xs={12}>
                        <FieldImage name='image' compressFunc={async f => f} maxSize={1024 * 1}>
                           {({ field, image, onClick }) => (
                              <>
                                 {field.value ? (
                                    <>
                                       {image && (
                                          <>
                                             <img
                                                style={{ width: '100%' }}
                                                src={image}
                                                alt={field.value.name}
                                             />
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
                           )}
                        </FieldImage>
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

export function Gallery() {
   return <GalleryForm />;
}
