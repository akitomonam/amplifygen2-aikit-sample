import { createFileRoute } from '@tanstack/react-router';
import { MemberForm } from '../components/member/MemberForm';
import { MemberList } from '../components/member/MemberList';
import { Stack, Button } from '@mui/material';
import { useState } from 'react';

export const Route = createFileRoute('/member')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Member />;
}

function Member() {
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ alignSelf: 'flex-start' }}
      >
        メンバー登録
      </Button>
      <MemberList />
      <MemberForm
        open={open}
        onClose={() => setOpen(false)}
      />
    </Stack>
  );
}
