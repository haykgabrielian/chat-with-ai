import { ComponentType } from 'react';

import {
  BulbIcon,
  CodeIcon,
  GlobeIcon,
  LearnIcon,
  PencilIcon,
  ProductivityIcon,
} from '@/components/icons';

interface IconProps {
  className?: string;
}

type QuestionCategory = {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  questions: string[];
};

type QuestionsData = {
  categories: QuestionCategory[];
};

const questionsData: QuestionsData = {
  categories: [
    {
      id: 'general',
      label: 'General',
      icon: GlobeIcon,
      questions: [
        'What can you help me with?',
        'Explain quantum computing in simple terms',
        'What are the latest trends in artificial intelligence?',
        'How can I improve my time management skills?',
        'What are the benefits and risks of remote work?',
        'Explain the concept of compound interest with examples',
      ],
    },
    {
      id: 'coding',
      label: 'Coding',
      icon: CodeIcon,
      questions: [
        'What are the core differences between Angular, React, and Vue?',
        'Explain the difference between React hooks and class components',
        'Show me how to implement error handling in async/await functions',
        'Create a REST API endpoint for user authentication in Node.js',
        'Write code to invert a binary search tree in Python',
        'Write a function to find duplicate elements in a JavaScript array',
      ],
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: LearnIcon,
      questions: [
        'Explain machine learning algorithms with real-world examples',
        'How does blockchain technology work and what are its applications?',
        'What is the difference between stocks, bonds, and ETFs?',
        'Create a 30-day study plan for learning Python programming',
        'Explain the basics of data structures and algorithms',
        'What are the key principles of user interface design?',
      ],
    },
    {
      id: 'writing',
      label: 'Writing',
      icon: PencilIcon,
      questions: [
        'Write a professional email requesting a meeting with a client',
        'Create a compelling product description for wireless headphones',
        'Write a blog post about the future of electric vehicles',
        'Draft a LinkedIn summary for a software developer',
        'Create a persuasive cover letter for a marketing position',
        'Write a short story about time travel in 500 words',
      ],
    },
    {
      id: 'productivity',
      label: 'Productivity',
      icon: ProductivityIcon,
      questions: [
        'Create a daily routine template for maximum productivity',
        'Design a project timeline for launching a mobile app',
        'List the best productivity tools for remote teams',
        'Create a weekly meal prep plan for busy professionals',
        'Design a system for organizing digital files and folders',
        'Write a template for effective meeting agendas',
      ],
    },
    {
      id: 'creative',
      label: 'Creative',
      icon: BulbIcon,
      questions: [
        'Generate 10 unique business ideas for sustainable products',
        'Create a social media content calendar for a coffee shop',
        'Design a user onboarding flow for a fitness app',
        'Brainstorm creative team building activities for remote workers',
        'Generate creative writing prompts for science fiction stories',
        'Create a marketing campaign concept for eco-friendly packaging',
      ],
    },
  ],
};

export default questionsData;
