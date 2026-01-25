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
  };

  const hotellingImgStyle: CSSProperties = {
    position: 'absolute',
    top: '8%',
    right: '-5%',
    width: '65%',
  };

  const logoImgStyle: CSSProperties = {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: '60%',
  };

  const helloImgStyle: CSSProperties = {
    position: 'absolute',
    bottom: '0',
    right: '-15%',
    width: '60%',
  };

  const rightSideStyle: CSSProperties = {
    flex: 1,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  };

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: '360px',
  };

  const headerStyle: CSSProperties = {
    marginBottom: '32px',
  };

  const titleStyle: CSSProperties = {
    marginBottom: 8,
  };

  const formItemStyle: CSSProperties = {
    marginBottom: 0,
  };

  return {
    layoutStyle,
    leftSideStyle,
    rightSideStyle,
    containerStyle,
    headerStyle,
    titleStyle,
    formItemStyle,
    hotellingImgStyle,
    logoImgStyle,
    helloImgStyle,
  };
};
