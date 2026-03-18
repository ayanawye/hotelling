import { useParams } from 'react-router-dom';
import { useGetCashShiftByIdQuery } from '@entities/cash';
import { PageLoader } from '@shared/ui';
import { CashShiftForm } from '@features/CashShiftForm';

const CashShiftEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCashShiftByIdQuery(Number(id));

  if (isLoading) {
    return <PageLoader />;
  }

  return <CashShiftForm initialValues={data} />;
};

export default CashShiftEdit;
