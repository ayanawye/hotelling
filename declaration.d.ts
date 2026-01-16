declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
