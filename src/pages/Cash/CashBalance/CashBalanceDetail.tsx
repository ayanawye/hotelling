import { useParams } from 'react-router-dom';
import { useGetCashBalanceByIdQuery } from '@entities/cash';
import { Spin } from 'antd';
import { CashBalanceForm } from '@features/CashBalanceForm';

const CashBalanceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCashBalanceByIdQuery(Number(id));

  if (isLoading) {
    return <Spin size='large' />;
  }

  return <CashBalanceForm data={data} />;
};

export default CashBalanceDetail;
