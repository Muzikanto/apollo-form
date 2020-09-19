import React from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/ocean';

export type CodeHighlighterProps = SyntaxHighlighterProps;

function CodeHighlighter(props: CodeHighlighterProps) {
   return <SyntaxHighlighter {...props} language='tsx' style={style} />;
}

export { CodeHighlighter };
