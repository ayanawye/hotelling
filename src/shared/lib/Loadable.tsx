import type { FC, LazyExoticComponent } from 'react';
import { Suspense } from 'react';

import { PageLoader } from '../ui/PageLoader/PageLoader';

export const Loadable =
  <P extends object>(Component: LazyExoticComponent<FC<P>>) =>
  (props: P) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
