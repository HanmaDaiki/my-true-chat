import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const WithRouter = (component: React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
    </BrowserRouter>
  );
