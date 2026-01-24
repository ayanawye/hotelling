import { useStyles } from '@shared/styles';
import { Input } from 'antd';
import React, { type FC } from 'react';

interface ComponentProps {
  value: string;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTextField: FC<ComponentProps> = (props) => {
  const { inputField } = useStyles();

  const { value, onChange, placeholder, prefixIcon, suffixIcon } = props;

  return (
    <Input
      prefix={prefixIcon}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputField}
      suffix={suffixIcon}
    />
  );
};
