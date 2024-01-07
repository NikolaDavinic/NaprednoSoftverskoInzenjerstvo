import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api/axios";
import { User } from "../../models/user.model";

const SingIn: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    reValidateMode: "onSubmit",
  });

  const { signin } = useAuthContext();

  const onSubmit = handleSubmit((creds: any) => {
    setIsLoading(true);
    console.log(creds);

    api
      .post<{ user: User; authToken: string }>(`/user/loginUser`, creds)
      .then(({ data }) => {
        signin(data);
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <Box
      sx={{
        height: "100%",
        p: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          gap: "0.8em",
          width: { xs: "100%", sm: "80%" },
          maxWidth: "600px",
        }}
      >
        <TextField
          label="Email"
          className="form-field"
          type="email"
          {...register("email", { required: true })}
          error={Boolean(errors.email)}
        />
        <TextField
          label="Password"
          className="form-field"
          type="password"
          {...register("password", { required: true })}
          error={Boolean(errors.password)}
        />
        {isLoading && <LinearProgress></LinearProgress>}
        <Button variant="contained" sx={{ p: 1.2 }} type="submit">
          Login
        </Button>
        <Grid className="flex-end">
          <Box>
            You don't have account? <Link to="/signup">Sing up</Link>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};

export default SingIn;
