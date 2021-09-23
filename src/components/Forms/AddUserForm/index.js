import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { useEffect } from "react";

export function AddUserForm({ handleSubmitForm, hanldeEditForm, isLoading, isFetching, mode, data }) {
  const { handleSubmit, control, setValue } = useForm();

  const handleSubmitMode = (value) => {
    if (mode === 'add') {
      handleSubmitForm(value)
    } else {
      hanldeEditForm(value)
    }
  }

  useEffect(() => {
    if (mode === 'edit' && !isFetching && data) {
      setValue('firstName', data.firstName)
      setValue('lastName', data.lastName)
      setValue('email', data.email)
      setValue('id', data.id)
    }
  }, [data, isFetching, setValue, mode]);

  return (
    <form onSubmit={handleSubmit(handleSubmitMode)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: 'required' }}
        render={({ field, fieldState: { error } }) =>
          <TextField {...field}
            autoFocus
            label="FirstName"
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
            disabled={mode === 'edit' ? true : false}
          />}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={isLoading || isFetching}
        sx={{ mt: 3, mb: 2 }}
      >
        {mode === 'add' ? 'Add' : 'Edit'} User
      </Button>
      {isLoading && 'loading'}
    </form>
  )
}

export default AddUserForm;