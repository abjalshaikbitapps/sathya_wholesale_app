import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteThreeplMutation } from '@/data/threepl';
import { useUpdateUserMutation } from '@/data/user';
import { getErrorMessage } from '@/utils/form-error';

const ThreePlDeleteView = () => {
 
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: deleteThreepl } = useDeleteThreeplMutation();
  async function handleDelete() {
    try {
      
      deleteThreepl({
        id: data,
       
      });
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
    />
  );
};

export default ThreePlDeleteView;
