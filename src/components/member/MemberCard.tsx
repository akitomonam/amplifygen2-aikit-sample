import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cake as CakeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Schema } from '../../../amplify/data/resource';

interface MemberCardProps {
  member: Schema['Member']['type'];
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MemberCard = ({
  member,
  onEdit,
  onDelete,
}: MemberCardProps) => {
  const formatDate = (
    date: string | null | undefined
  ) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(
      'ja-JP',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  return (
    <Card
      elevation={2}
      sx={{
        position: 'relative',
        transition:
          'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <PersonIcon color="primary" />
            <Typography
              variant="h6"
              component="div"
            >
              {member.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 'auto' }}
            >
              {member.age}歳
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CakeIcon color="action" />
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {formatDate(member.birthday)}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            {(member.hobby ?? []).map((hobby) => (
              <Chip
                key={hobby}
                label={hobby}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>

      {onEdit || onDelete ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            p: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{
              '&:hover': {
                bgcolor: 'error.lighter',
                color: 'error.main',
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : null}
    </Card>
  );
};
