import "./App.scss";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Clients from "./pages/Clients/Clients";
import Tags from "./pages/Tags/Tags";
import Calendar from "./pages/Calendar/Calendar";
import SingIn from "./pages/SignIn/SingIn";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoutes from "./utils/api/ProtectedRoutes";
import NotFound from "./pages/NotFound/NotFound";

const theme = createTheme({
  palette: {
    primary: {
      light: "#87e1e6",
      main: "#34b4eb",
      dark: "#83a7de",
    },
    secondary: {
      light: "#83a7de",
      main: "#87e1e6",
      dark: "#34b4eb",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Navigation />}>
              <Route path="" element={<Navigate to="/home"></Navigate>}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/projects" element={<Projects />}></Route>
              <Route
                path="/clients"
                element={<Clients />}
              ></Route>
              <Route path="/tags" element={<Tags />}></Route>
              <Route path="/calendar" element={<Calendar />}></Route>
            </Route>
          </Route>
          <Route path="/signin" element={<SingIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
