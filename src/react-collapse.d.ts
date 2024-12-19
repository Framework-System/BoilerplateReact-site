declare module 'react-collapse' {
    import * as React from 'react';
  
    export interface CollapseProps {
      isOpened: boolean;
      children?: React.ReactNode;
      theme?: object;
      initialStyle?: object;
      style?: object;
      className?: string;
      hasNestedCollapse?: boolean;
      springConfig?: object;
      onRest?: () => void;
      onWork?: () => void;
    }
  
    export class Collapse extends React.Component<CollapseProps> {}
  }