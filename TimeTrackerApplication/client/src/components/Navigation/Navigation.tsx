import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import BottomNav from "../BottomNav/BottomNav";

const Navigation = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 650);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return isDesktop ? (
    <Sidebar>
      <Outlet />
    </Sidebar>
  ) : (
    <BottomNav>
      <Outlet />
    </BottomNav>
  );
};

export default Navigation;
