import React from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/ocean';
import Paper from '@material-ui/core/Paper';
import FormManager from '../src/form/FormManager';

export type CodeHighlighterProps = SyntaxHighlighterProps;

function CodeHighlighter(props: CodeHighlighterProps) {
   return <SyntaxHighlighter {...props} language='tsx' style={style} />;
}

function PreviewState(props: { form: FormManager<any> }) {
   const data = props.form.useState();

   return (
      <Paper style={{ maxWidth: 500, padding: 20 }}>
         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}
      </Paper>
   );
}

function wait(time: number) {
   return new Promise(resolve => setTimeout(resolve, time));
}

export { CodeHighlighter, PreviewState, wait };
