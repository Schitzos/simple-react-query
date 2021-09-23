import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
} from "@material-ui/core";

export function LoginForm({ handleLogin, isLoading }) {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: 'required' }}
        render={({ field, fieldState: { error } }) =>
          <TextField {...field}
            autoFocus
            label="Username"
            type="text"
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
            margin="normal"
          />}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'required' }}
        render={({ field, fieldState: { error } }) =>
          <TextField {...field}
            label="Password"
            type="password"
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
        // disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm;