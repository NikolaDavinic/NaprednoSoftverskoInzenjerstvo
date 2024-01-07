import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Icon,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";

const BottomNav = ({ children }: any) => {
  const [value, setValue] = useState<number>();
  const navigate = useNavigate();

  const { signout } = useAuthContext();

  const handleSignOut = () => {
    signout();
  };

  useEffect(() => {
    switch (value) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/dashboard");
        break;
      case 2:
        navigate("/projects");
        break;
      case 3:
        navigate("/clients");
        break;
      case 4:
        navigate("/tags");
        break;
      case 5:
        navigate("/calendar");
        break;
    }
  }, [value, navigate]);

  return (
    <>
      <div>{children}</div>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          zIndex: 1000,
          left: 0,
          rigth: 0,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue: number) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Icon sx={{ fontSize: 35 }}>home</Icon>}
          />
          <BottomNavigationAction
            label="Dashboard"
            icon={<Icon sx={{ fontSize: 35 }}>dashboard</Icon>}
          />
          <BottomNavigationAction
            label="Projects"
            icon={<Icon sx={{ fontSize: 35 }}>article</Icon>}
          />
          <BottomNavigationAction
            label="Clients"
            icon={<Icon sx={{ fontSize: 35 }}>person</Icon>}
          />
          <BottomNavigationAction
            label="Tags"
            icon={<Icon sx={{ fontSize: 35 }}>sell</Icon>}
          />
          <BottomNavigationAction
            label="Calendar"
            icon={<Icon sx={{ fontSize: 35 }}>calendar_month </Icon>}
          />
          <BottomNavigationAction
            label="Logout"
            icon={<Icon sx={{ fontSize: 35 }}>logout </Icon>}
            onClick={handleSignOut}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default BottomNav;
