import React from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/ocean';
import { makeApolloFormQuery } from '../src';
import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';

export type CodeHighlighterProps = SyntaxHighlighterProps;

function CodeHighlighter(props: CodeHighlighterProps) {
   return <SyntaxHighlighter {...props} language='tsx' style={style} />;
}

function PreviewState(props: { name: string }) {
   const [query] = React.useState(makeApolloFormQuery(props.name));

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

export { CodeHighlighter, PreviewState, wait };
