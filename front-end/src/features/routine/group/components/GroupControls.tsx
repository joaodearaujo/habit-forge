import { InlineEditField } from '../../components/InlineEditField';
import { useDeleteGroup, useUpdateGroup } from '../hooks/useGroup';

interface Props {
  groupId: string;
  currentTitle: string;
}

export function GroupControls({ groupId, currentTitle }: Props) {
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  return (
    <InlineEditField
      currentTitle={currentTitle}
      onSave={(title, onSuccess) =>
        updateGroup({ id: groupId, body: { title } }, { onSuccess, onError: onSuccess })
      }
      onDelete={() => {
        if (
          window.confirm(
            `Confirm deleting "${currentTitle}"? It'll delete all its tasks too.`,
          )
        ) {
          deleteGroup(groupId);
        }
      }}
      editLabel="Editr group"
      deleteLabel="Delete group"
    />
  );
}
