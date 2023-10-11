import { FC, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@shared/model';
import { getRanadomNumber } from '@shared/lib';
import { login } from '@entities/session';

export const Authorization: FC = () => {
  const usernameRf = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');

    if (session.sessionId && session.username) {
      dispatch(login({ ...session, isAuthenticated: true }));
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sessionId = getRanadomNumber(1000000000);
    const username = usernameRf.current?.value;

    if (username) {
      dispatch(login({ username, sessionId, isAuthenticated: true }));
      localStorage.setItem('session', JSON.stringify({ sessionId, username }));
      usernameRf.current!.value = '';
      navigate('/');
    }
  };

  return (
    <div className='flex flex-col gap-5 w-[310px] text-center'>
      <h2 className='text-5xl select-none'> 👋 Hello!</h2>
      <p className='text-2xl select-none'>What's your name?</p>
      <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
        <input
          ref={usernameRf}
          type='text'
          id='username'
          className='bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Your name'
          required
        />
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
