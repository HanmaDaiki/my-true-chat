import { FC, useRef } from 'react';
import { useAppDispatch } from '@shared/model';
import { addMessage, updateMessage } from '@entities/chat';
import { openai } from '../api/openai';

export const SendMessage: FC = () => {
  const dispatch = useAppDispatch();

  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addMessage({ owner: 'user', text: messageRef.current?.value ?? '' }));

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: messageRef.current?.value ?? '' }],
      stream: true,
    });

    dispatch(addMessage({ owner: 'bot', text: '' }));

    for await (const message of stream) {
      dispatch(updateMessage({ owner: 'bot', text: message.choices[0].delta.content }));
    }
  };

  return (
    <form className='flex flex-col gap-2 overflow-y-auto w-[95vw] sm:w-[55vw]' onSubmit={handleSubmit}>
      <input
        ref={messageRef}
        type='text'
        id='username'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Your message'
        required
      />
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Submit
      </button>
    </form>
  );
};
