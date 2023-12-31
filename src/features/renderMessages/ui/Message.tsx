import { FC } from 'react';
import Markdown from 'react-markdown';

interface MessageProps {
  key: React.Key;
  text: string;
  role: 'user' | 'assistant' | 'system';
  owner: string;
}

export const Message: FC<MessageProps> = ({ text, owner, key, role }) => {
  return (
    <div
      className={`p-5 rounded ${
        role === 'user' ? 'bg-blue-300 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'
      }  flex flex-col gap-1 relative`}
      key={key}
    >
      <div className='absolute top-2 right-4 text-xs'>{owner}</div>
      <Markdown>{text}</Markdown>
    </div>
  );
};
