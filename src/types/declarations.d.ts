declare module '*.svg' {
    import { FunctionComponent, SVGProps } from 'react';
    const content: FunctionComponent<SVGProps<HTMLElement>>;
    export default content;
}