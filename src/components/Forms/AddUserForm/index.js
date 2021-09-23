import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
} from "@material-ui/core";

export function AddUserForm({ handleSubmitForm, isLoading }) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: 'required' }}
        render={({ field, fieldState: { error } }) =>
          <TextField {...field}
            autoFocus
            label="FisrtName"
            type="text"
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
            margin="normal"
          />}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: 'required' }}
        render={({ field, fieldState: { error } }) =>
          <TextField {...field}
            label="Last Name"
            type="text"
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
            margin="normal"
          />}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'required' }}
        render={({ field, fieldState: { error } }) =>
          <TextField {...field}
            label="Email"
            type="email"
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
            margin="normal"
          />}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        Add User
      </Button>
      {isLoading && 'loading'}
    </form>
  )
}

export default AddUserForm;