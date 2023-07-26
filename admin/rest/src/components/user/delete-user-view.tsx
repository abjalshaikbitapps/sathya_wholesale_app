import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useUpdateUserMutation } from '@/data/user';
import { getErrorMessage } from '@/utils/form-error';

const UserDeleteView = () => {
 
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: updateProfile } = useUpdateUserMutation();
  async function handleDelete() {
    try {
      
      updateProfile({
        id: data,
        input:{
          deletedDate:new Date()
        }
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

export default UserDeleteView;
