import { FC } from 'react';

interface MessageProps {
  key: React.Key;
  text: string;
  owner: string;
}

export const Message: FC<MessageProps> = ({ text, owner, key }) => {
  return (
    <div key={key}>
      {owner}: {text}
    </div>
  );
};
