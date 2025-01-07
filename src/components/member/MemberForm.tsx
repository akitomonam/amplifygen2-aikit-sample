import {
  useForm,
  Controller,
} from 'react-hook-form';
import {
  TextField,
  Button,
  Stack,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Cake as CakeIcon,
  Numbers as NumbersIcon,
  EmojiEvents as HobbyIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { amplifyClient } from '../../utils/amplifyClient';

type FormInputs = {
  name: string;
  hobby: string[];
  age: number;
  birthday: string;
};

interface MemberFormProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const MemberForm = ({
  open,
  onClose,
  title = 'メンバー登録',
}: MemberFormProps) => {
  const [newHobby, setNewHobby] = useState('');
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      hobby: [],
      age: 0,
      birthday: '',
    },
  });

  const hobbies = watch('hobby');

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    amplifyClient.models.Member.create({
      name: data.name,
      hobby: data.hobby,
      age: data.age,
      birthday: data.birthday,
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAddHobby = () => {
    if (newHobby && !hobbies.includes(newHobby)) {
      setValue('hobby', [...hobbies, newHobby]);
      setNewHobby('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom:
            '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box display="flex" alignItems="center">
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="h6">
            {title}
          </Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: '名前は必須です',
              }}
              render={({
                field,
                fieldState: { error },
              }) => (
                <TextField
                  {...field}
                  label="名前"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    startAdornment: (
                      <PersonIcon />
                    ),
                  }}
                />
              )}
            />

            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 1 }}
              >
                <TextField
                  label="趣味"
                  value={newHobby}
                  onChange={(e) =>
                    setNewHobby(e.target.value)
                  }
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: <HobbyIcon />,
                  }}
                />
                <IconButton
                  onClick={handleAddHobby}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >
                {hobbies.map((hobby) => (
                  <Chip
                    key={hobby}
                    label={hobby}
                    onDelete={() => {
                      setValue(
                        'hobby',
                        hobbies.filter(
                          (h) => h !== hobby
                        )
                      );
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Controller
              name="age"
              control={control}
              rules={{ min: 0, max: 150 }}
              render={({
                field,
                fieldState: { error },
              }) => (
                <TextField
                  {...field}
                  label="年齢"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    startAdornment: (
                      <NumbersIcon />
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="birthday"
              control={control}
              render={({
                field,
                fieldState: { error },
              }) => (
                <TextField
                  {...field}
                  label="誕生日"
                  type="date"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    startAdornment: <CakeIcon />,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            登録
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
