import { Card, Space, Typography } from 'antd';
import { useStyles } from '@shared/styles';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { fullWidthStyle, marginBottomStyle } = useStyles();

  return (
    <Space orientation='vertical' size='large' style={fullWidthStyle}>
      <Card>
        <Title level={2}>Добро пожаловать в Hotelling!</Title>
        <Paragraph>
          Это главная страница системы управления отелем. Здесь вы можете видеть
          общую статистику и быстрые действия.
        </Paragraph>
      </Card>

      <Space orientation='vertical' size='middle' style={fullWidthStyle}>
        {Array.from({ length: 15 }).map((_, index) => (
          <Card key={index} title={`Событие №${index + 1}`} size='small'>
            <Paragraph>
              Описание важного события или уведомления, которое произошло в
              отеле. Этот контент добавлен специально для того, чтобы проверить,
              как работает кастомный скроллбар при большом количестве данных на
              странице.
            </Paragraph>
            <Paragraph type='secondary'>
              Дата: {new Date().toLocaleDateString()}
            </Paragraph>
          </Card>
        ))}
      </Space>

      <Card style={marginBottomStyle}>
        <Title level={4}>Конец списка</Title>
        <Paragraph>
          Вы прокрутили до самого низа! Если скроллбар выглядит тонким, серым и
          плавно подсвечивается при наведении — значит, настройка прошла
          успешно.
        </Paragraph>
      </Card>
    </Space>
  );
};

export default HomePage;
