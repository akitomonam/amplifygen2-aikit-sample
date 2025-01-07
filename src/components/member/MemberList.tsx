import { Grid, Container } from '@mui/material';
import { MemberCard } from './MemberCard';
import { useEffect, useState } from 'react';
import { amplifyClient } from '../../utils/amplifyClient';
import { Schema } from '../../../amplify/data/resource';

type MemberListUIProps = {
  members: Schema['Member']['type'][];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const MemberListUI = ({
  members,
  onEdit,
  onDelete,
}: MemberListUIProps) => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
        sx={{
          py: 2,
        }}
      >
        {members.map((member) => (
          <Grid
            key={member.id}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <MemberCard
              member={member}
              onEdit={
                onEdit
                  ? () => onEdit(member.id)
                  : undefined
              }
              onDelete={
                onDelete
                  ? () => onDelete(member.id)
                  : undefined
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const MemberList = () => {
  const [members, setMembers] = useState<
    Schema['Member']['type'][]
  >([]);

  const handleEdit = (id: string) => {
    console.log('編集:', id);
  };

  const handleDelete = async (id: string) => {
    try {
      await amplifyClient.models.Member.delete({
        id,
      });
      fetchMembers();
    } catch (error) {
      console.error('削除エラー:', error);
    }
  };

  const fetchMembers = async () => {
    const res =
      await amplifyClient.models.Member.list();
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <MemberListUI
      members={members}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
