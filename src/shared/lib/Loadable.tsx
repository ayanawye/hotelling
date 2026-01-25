import { PageLoader } from '@shared/ui';
import type { FC, LazyExoticComponent } from 'react';
import { Suspense } from 'react';

export const Loadable =
  <P extends object>(Component: LazyExoticComponent<FC<P>>) =>
  (props: P) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
