import 'highlight.js/styles/github-dark.css';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

import { CopyIcon, SuccessCopiedIcon } from './icons';

const MarkdownWrapper = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;

  h1,
  h2,
  h3,
  h4 {
    margin: 1rem 0 0.5rem;
    font-weight: 600;
    color: inherit;
  }

  p {
    margin: 0;
    color: inherit;
  }

  ul,
  ol {
    margin-left: 1.25rem;
    margin-bottom: 0.75rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  code {
    font-family: monospace;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  pre {
    background: rgba(0, 0, 0, 0.2);
    padding: 4px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.8rem;
    margin: 1rem 0;
    position: relative;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.8rem;
    border: 1px solid #ccc;
  }

  th,
  td {
    border: 1px solid #666;
    padding: 0.5rem;
    text-align: left;
  }

  thead {
    background-color: rgba(255, 255, 255, 0.1);
  }

  blockquote {
    border-left: 4px solid #88b3ff;
    padding-left: 1rem;
    background: rgba(255, 255, 255, 0.05);
    font-style: italic;
    margin: 1rem 0;
    border-radius: 4px;
  }

  a {
    color: #a5c8ff;
    text-decoration: underline;
  }

  hr {
    border: none;
    border-top: 1px solid #666;
    margin: 1rem 0;
  }
`;

const CodeBlockContainer = styled.pre`
  position: relative;

  &:hover .copy-button {
    opacity: 1;
    pointer-events: auto;
  }

  code {
    display: block;
    padding: 0;
    background: transparent;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s,
    background 0.2s;
  z-index: 10;
  color: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    outline: none;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    outline: none;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
const CodeBlock = ({ children, ...props }: any) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const codeRef = React.useRef<HTMLPreElement>(null);

  // Generate unique ID for this code block
  const codeId = React.useMemo(() => `code-${uuidv4()}`, []);

  const handleCopy = () => {
    // Get text from code element directly
    const codeElement = codeRef.current?.querySelector('code');
    const codeText = codeElement?.textContent || codeElement?.innerText || '';

    if (codeText) {
      copyToClipboard(codeText, codeId);
    }
  };

  return (
    <CodeBlockContainer {...props} ref={codeRef}>
      {children}
      <CopyButton
        className='copy-button'
        onClick={handleCopy}
        aria-label='Copy code'
        title={isCopied(codeId) ? 'Copied!' : 'Copy code'}
      >
        {isCopied(codeId) ? (
          <SuccessCopiedIcon size={16} />
        ) : (
          <CopyIcon size={16} />
        )}
      </CopyButton>
    </CodeBlockContainer>
  );
};

const MarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: CodeBlock,
        }}
      >
        {children}
      </ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default MarkdownRenderer;
