import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api/axios";
import { ApiMessage } from "../../DTO/apiMessage";
import axios, { AxiosError } from "axios";

interface FormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (data: FormInputs) => {
    setIsLoading(true);

    api
      .post<ApiMessage>("/user/signup", {
        password: data.password,
        email: data.email,
      })
      .then((res) => {
        navigate("/signin");
        console.log(res.data.msg);
      })
      .catch((error: AxiosError<ApiMessage>) => {
        let message = "Error";
        if (axios.isAxiosError(error)) {
          if (error.response?.data) {
            message = error.response.data.msg;
          }
        }
        console.log(message);
      })
      .finally(() => setIsLoading(false));
  };

  const repeatPasswordValidator = useCallback(
    (value: string) => getValues("password") === value,
    [getValues]
  );

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
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          gap: "0.6em",
          width: { xs: "100%", sm: "80%" },
          maxWidth: "600px",
        }}
      >
        <TextField
          label="Email"
          type="email"
          className="form-field"
          error={Boolean(errors.email)}
          helperText={errors.email && "Email is required"}
          {...register("email", { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          className="form-field"
          error={Boolean(errors.password)}
          helperText={errors.password && "Password is required"}
          {...register("password", { required: true })}
        />
        <TextField
          label="Repeat password"
          type="password"
          className="form-field"
          error={Boolean(errors.repeatPassword)}
          helperText={errors.repeatPassword && "Passwords don't match"}
          {...register("repeatPassword", {
            required: true,
            validate: repeatPasswordValidator,
          })}
        />
        {isLoading && <LinearProgress />}
        <Button type="submit" variant="contained" color="primary">
          Registration
        </Button>
        <Grid container justifyContent="flex-end">
          <Box>
            Already have account? <Link to="/signin">Sign in</Link>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};

export default SignUp;
