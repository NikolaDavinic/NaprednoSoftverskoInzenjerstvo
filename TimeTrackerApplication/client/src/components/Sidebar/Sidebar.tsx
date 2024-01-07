import { Box, Button, Icon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { useAuthContext } from "../../contexts/auth.context";

const Sidebar = ({ children }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userOptionsOpen = Boolean(anchorEl);

  const { signout } = useAuthContext();

  const handleLogout = () => {
    signout();
    setAnchorEl(null);
  };

  return (
    <div className="sidebar-content">
      <nav className="sidebar" style={{ position: "sticky", top: 0 }}>
        <ul>
          <li>
            <NavLink to="/">
              {({ isActive }) => (
                <Icon
                  sx={{ fontSize: 35 }}
                  className={`icon ${isActive ? "active" : undefined}`}
                >
                  home
                </Icon>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              {({ isActive }) => (
                <Icon
                  sx={{ fontSize: 35 }}
                  className={`icon ${isActive ? "active" : undefined}`}
                >
                  dashboard
                </Icon>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects">
              {({ isActive }) => (
                <Icon
                  sx={{ fontSize: 35 }}
                  className={`icon ${isActive ? "active" : undefined}`}
                >
                  article
                </Icon>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/clients">
              {({ isActive }) => (
                <Icon
                  sx={{ fontSize: 35 }}
                  className={`icon ${isActive ? "active" : undefined}`}
                >
                  person
                </Icon>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tags">
              {({ isActive }) => (
                <Icon
                  sx={{ fontSize: 35 }}
                  className={`icon ${isActive ? "active" : undefined}`}
                >
                  sell
                </Icon>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar">
              {({ isActive }) => (
                <Icon
                  sx={{ fontSize: 35 }}
                  className={`icon ${isActive ? "active" : undefined}`}
                >
                  calendar_month
                </Icon>
              )}
            </NavLink>
          </li>
        </ul>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Icon sx={{ fontSize: 35 }} className="icon">
            portrait
          </Icon>
        </Button>
        <Menu
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={userOptionsOpen}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogout}>
            <Icon className="icon">logout</Icon>Logout
          </MenuItem>
        </Menu>
      </nav>
      <Box className="content" sx={{ overflow: "auto", height: "100vh" }}>
        {children}
      </Box>
    </div>
  );
};

export default Sidebar;
