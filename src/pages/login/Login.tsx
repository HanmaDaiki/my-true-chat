import { Authorization } from '@features/authorization';

export const Login = () => {
  return (
    <div className='flex items-center justify-center h-[calc(100%-264px)] w-full'>
      <Authorization />
    </div>
  );
};
