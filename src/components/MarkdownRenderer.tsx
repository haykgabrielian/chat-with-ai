import 'highlight.js/styles/github-dark.css';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

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

const MarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight]}
      >
        {children}
      </ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default MarkdownRenderer;
