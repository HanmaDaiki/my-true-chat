import { FC } from 'react';
import { useAppSelector } from '@shared/model';
import { selectMessages } from '@entities/chat';
import { Message } from './Message';

export const RenderMessages: FC = () => {
  const messages = useAppSelector(selectMessages);

  return (
    <div className='flex flex-col gap-5 overflow-y-auto w-[95vw] sm:w-[55vw] h-[75vh]'>
      {messages.map((message, index) => {
        return <Message owner={message.name} text={message.text} key={index} />;
      })}
    </div>
  );
};
