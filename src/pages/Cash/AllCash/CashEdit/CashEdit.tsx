import { useParams } from 'react-router-dom';
import { useGetCashByIdQuery } from '@entities/cash';
import { CashForm } from '@features/CashForm';
import { PageLoader } from '@shared/ui';

const CashEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCashByIdQuery(Number(id));

  if (isLoading) {
    return <PageLoader />;
  }

  return <CashForm initialValues={data} />;
};

export default CashEdit;
