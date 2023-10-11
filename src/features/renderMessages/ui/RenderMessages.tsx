import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/model';
import { Message as TypeMessage, addMessage, selectMessages } from '@entities/chat';
import { Message } from './Message';

export const RenderMessages: FC = () => {
  const messages = useAppSelector(selectMessages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const previousMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    previousMessages.forEach((message: TypeMessage) => {
      dispatch(addMessage(message));
    });
  }, [])

  return (
    <div className='flex flex-col gap-5 overflow-y overflow-x-hidden w-[95vw] sm:w-[55vw] h-[65vh] sm:h-[75vh] pr-1 scroll-behavior'>
      <span className='text-xs text-gray-500 dark:text-gray-400 text-center'>You can ask me anything</span>
      {messages.map((message, index) => {
        return <Message role={message.role} owner={message.name} text={message.text} key={index} />;
      })}
    </div>
  );
};
