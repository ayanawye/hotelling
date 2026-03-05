import { loginPageBg } from '@shared/assets';
import type { CSSProperties } from 'react';

export const useStyles = () => {
  const layoutStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
  };

  const leftSideStyle: CSSProperties = {
    flex: 1,
    background: `linear-gradient(var(--primary-light-1), var(--primary-light-1)), url(${loginPageBg})`,
    backgroundBlendMode: 'multiply',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    position: 'relative',
    width: '45%',
  };

  const hotellingImgStyle: CSSProperties = {
    position: 'absolute',
    top: '8%',
    right: '5%',
    width: '65%',
  };

  const logoImgStyle: CSSProperties = {
    position: 'absolute',
    top: '25%',
    left: '0',
    width: '60%',
  };

  const helloImgStyle: CSSProperties = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '60%',
  };

  const rightSideStyle: CSSProperties = {
    flex: 1,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    width: '55%',
  };

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: '372px',
  };

  const titleStyle: CSSProperties = {
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '130%',
    marginBottom: 40,
  };

  const formItemStyle: CSSProperties = {
    marginBottom: '20px',
  };

  const input: CSSProperties = {
    height: 48,
  };
  const submitButton: CSSProperties = {
    maxHeight: 52,
    width: '100%',
    minHeight: 52,
  };

  return {
    submitButton,
    layoutStyle,
    leftSideStyle,
    rightSideStyle,
    containerStyle,
    input,
    titleStyle,
    formItemStyle,
    hotellingImgStyle,
    logoImgStyle,
    helloImgStyle,
  };
};
