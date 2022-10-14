import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

import defaultClasses from '../styles/index.module.css';

interface YearButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: number;
  selected?: boolean;
}

const YearButton = ({ value, className, ...props }: YearButtonProps) => (
  <button
    className={classNames(defaultClasses['year-button'], className)}
    {...props}
  >
    {value}
  </button>
);
YearButton.displayName = 'YearButton';

export default YearButton;
