import { FC } from 'react';
import { RenderMessages } from '@features/renderMessages';
import { SendMessage } from '@features/sendMessage';

export const LayoutChat: FC = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center text-left gap-5'>
      <RenderMessages />
      <SendMessage />
    </div>
  );
};
