import { ApolloForm, makeApolloFormQuery, Submit } from '../src';
import * as React from 'react';
import { ButtonProps, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CodeHighlighter } from './utils';
import { useQuery } from '@apollo/client';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default {
   title: 'Components',
};

type WithConfirmFormState = {
   test: string;
};

const initialState: WithConfirmFormState = {
   test: '',
};

function SubmitConfirm(props: ButtonProps) {
   const [openConfirm, toggleConfirm] = React.useState(false);

   const onClose = () => toggleConfirm(false);

   return (
      <Submit>
         {({ isValid, isSubmitted, loading, form }) => (
            <>
               <Button
                  disabled={isSubmitted ? !isValid : false}
                  onClick={() => toggleConfirm(true)}
                  {...props}
               />
               <Dialog maxWidth='xs' fullWidth open={openConfirm} onClose={onClose}>
                  <DialogTitle>Confirm title</DialogTitle>
                  <DialogActions>
                     {loading ? (
                        <CircularProgress />
                     ) : (
                        <Box display='flex'>
                           <Button onClick={onClose} variant='contained'>
                              Decline
                           </Button>
                           <Button
                              style={{ marginLeft: 16 }}
                              variant='contained'
                              color='primary'
                              onClick={() => {
                                 form.submit().then(() => {
                                    onClose();
                                 });
                              }}
                           >
                              Accept
                           </Button>
                        </Box>
                     )}
                  </DialogActions>
               </Dialog>
            </>
         )}
      </Submit>
   );
}

export function WithConfirm() {
   return (
      <Grid container spacing={3}>
         <Grid item xs={12} md={6}>
            <Paper style={{ maxWidth: 500, padding: 20 }}>
               <ApolloForm<WithConfirmFormState>
                  name='withConfirm'
                  saveOnUnmount
                  initialState={initialState}
                  onSubmit={async ({ values }, form) => {
                     await wait(1000);
                     console.log('Submit state: ', values);
                  }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography variant='h5' align='center'>
                           Example confirm
                        </Typography>
                     </Grid>
                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <SubmitConfirm variant='contained' color='primary'>
                           Submit (with confirm)
                        </SubmitConfirm>
                     </Grid>
                  </Grid>
               </ApolloForm>
            </Paper>
         </Grid>
         <Grid item xs={12} md={6}>
            <PreviewState />
         </Grid>
      </Grid>
   );
}

const query = makeApolloFormQuery('withConfirm');

function PreviewState() {
   const { data } = useQuery(query);

   return (
      <Paper style={{ maxWidth: 500, padding: 20 }}>
         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}
      </Paper>
   );
}

function wait(time: number) {
   return new Promise(resolve => setTimeout(resolve, time));
}
