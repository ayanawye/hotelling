import {
  useLazyGetMeQuery,
  useLoginMutation,
} from '@entities/user/api/authApi';
import { setCredentials } from '@entities/user/model/slice';
import type { LoginDto } from '@entities/user/types';
import { loginHello, loginHotelling, loginLogo } from '@shared/assets';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { Button, Form, Input, Layout, message, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './styled';

const { Title } = Typography;

export const LoginPage = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [triggerGetMe, { isLoading: isGetMeLoading }] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
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
  } = useStyles();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: LoginDto) => {
    try {
      const authData = await login(values).unwrap();
      localStorage.setItem('token', authData.access);

      // 3. Делаем запрос getMe.
      const userData = await triggerGetMe().unwrap();

      // 4. Теперь сохраняем всё в Redux
      dispatch(setCredentials({ user: userData, access: authData.access }));

      message.success('Вход выполнен успешно');
      navigate('/');
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
        <img src={loginHotelling} alt='Hotelling' style={hotellingImgStyle} />
        <img src={loginLogo} alt='Logo' style={logoImgStyle} />
        <img src={loginHello} alt='Hello' style={helloImgStyle} />
      </div>

      <div style={rightSideStyle}>
        <Space orientation='vertical' size='large' style={containerStyle}>
          <div style={headerStyle}>
            <Title level={2} style={titleStyle}>
              Добро пожаловать <br /> в Hotelling.io
            </Title>
            <Title level={2} style={titleStyle}></Title>
          </div>

          <Form
            name='login'
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
            requiredMark={false}
          >
            <Form.Item
              label='Имя пользователя'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите имя пользователя',
                },
              ]}
            >
              <Input size='large' placeholder='Введите имя пользователя' />
            </Form.Item>

            <Form.Item
              label='Пароль'
              name='password'
              rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
              <Input.Password size='large' placeholder='Ваш пароль' />
            </Form.Item>

            <Form.Item style={formItemStyle}>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                loading={isLoading}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </Layout>
  );
};
