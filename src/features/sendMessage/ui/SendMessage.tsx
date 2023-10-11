import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/model';
import { Message, addMessage, clearChat, selectMessages, updateMessage } from '@entities/chat';
import { openai } from '../api/openai';
import { selectSession } from '@/src/entities/session';

export const SendMessage: FC = () => {
  const session = useAppSelector(selectSession);
  const previousMessages = useAppSelector(selectMessages);

  const dispatch = useAppDispatch();

  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message: Message = {
      role: 'user',
      text: messageRef.current?.value ?? '',
      name: session.username,
    };

    dispatch(addMessage(message));

    const messages = previousMessages.map((message) => {
      return { role: message.role, content: message.text };
    });

    messages.push({
      role: 'user',
      content: 'Это не мой запрос - разметь свой ответ с помощью markdown. Мой запрос - ' + messageRef.current?.value,
    });

    messageRef.current!.value = '';

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    });

    const answerAi: Message = {
      role: 'assistant',
      text: '',
      name: 'AI',
    };

    dispatch(addMessage(answerAi));

    for await (const message of stream) {
      dispatch(updateMessage({ ...answerAi, text: message.choices[0].delta.content || '' }));
    }
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(previousMessages));
  }, [previousMessages]);

  return (
    <form className='flex flex-col gap-2 w-[95vw] sm:w-[55vw] h-[5vh]' onSubmit={handleSubmit}>
      <input
        ref={messageRef}
        type='text'
        id='username'
        className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Your message'
        required
      />
      <div className='flex gap-2'>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
        <button
          onClick={() => {
            dispatch(clearChat());
            localStorage.removeItem('messages');
          }}
          type='button'
          className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
        >
          Clear Chat
        </button>
      </div>
    </form>
  );
};
