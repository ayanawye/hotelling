import {
  useLazyGetMeQuery,
  useLoginMutation,
} from '@entities/user/api/authApi';
import { setCredentials, setToken } from '@entities/user/model/slice';
import type { LoginDto } from '@entities/user/types';
import { loginHello, LoginHelloSVG, loginLogo } from '@shared/assets';
import { useAppDispatch } from '@shared/hooks/redux';
import { Form, Input, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Token } from '@shared/hooks/token.ts';

import { useStyles } from './styled';
import { Button } from '@shared/ui';

export const LoginPage = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [triggerGetMe, { isLoading: isGetMeLoading }] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    layoutStyle,
    leftSideStyle,
    input,
    rightSideStyle,
    containerStyle,
    titleStyle,
    formItemStyle,
    hotellingImgStyle,
    submitButton,
    logoImgStyle,
    helloImgStyle,
  } = useStyles();

  const onFinish = async (values: LoginDto) => {
    try {
      const authData = await login(values).unwrap();
      Token.setToken(authData);

      const userData = await triggerGetMe().unwrap();

      dispatch(setCredentials({ user: userData }));
      dispatch(setToken(authData));

      message.success('Вход выполнен успешно');
      navigate('/bookings/board');
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || 'Ошибка авторизации. Проверьте данные.';
      message.error(errorMessage);
    }
  };

  const isLoading = isLoginLoading || isGetMeLoading;

  return (
    <Layout style={layoutStyle}>
      <div style={leftSideStyle}>
        <img src={LoginHelloSVG} alt='Hotelling' style={hotellingImgStyle} />
        <img src={loginLogo} alt='Logo' style={logoImgStyle} />
        <img src={loginHello} alt='Hello' style={helloImgStyle} />
      </div>

      <div style={rightSideStyle}>
        <div style={containerStyle}>
          <div>
            <h2 style={titleStyle}>
              Добро пожаловать <br /> в Hotelling.io
            </h2>
          </div>

          <Form
            name='login'
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
            requiredMark={false}
          >
            <Form.Item
              label='Логин'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите логин',
                },
              ]}
              style={formItemStyle}
            >
              <Input style={input} size='large' placeholder='Введите логин' />
            </Form.Item>

            <Form.Item
              label='Пароль'
              name='password'
              rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
              <Input.Password
                style={input}
                size='large'
                placeholder='Ваш пароль'
              />
            </Form.Item>

            <Button
              style={submitButton}
              variant='primary'
              htmlType='submit'
              isLoading={isLoading}
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
