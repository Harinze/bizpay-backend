// utils.ts
import  classes  from 'tailwindcss-classnames';
// utils.ts

export const generateStyles = (...classNames: (string | string[])[]): string => {
  return classNames.flat().join(' ');
};

