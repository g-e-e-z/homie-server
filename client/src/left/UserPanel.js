import React, { useContext, useState } from "react";
import "./UserPanel.css";
import { AuthContext } from "../context/auth";

// Material Imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Import Components
import UserCardL from "./UserCardL";
import RegisterCard from "./RegisterCard";
import LoginCard from "./LoginCard";

function Userpanel() {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const userPanel = user ? (
    <div className="user-panel">
      <UserCardL />
    </div>
  ) : (
    <div className="user-panel">
      <Tabs
        className="login-tabs"
        value={selectedTab}
        onChange={handleChange}
        centered
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {selectedTab === 0 && <LoginCard />}
      {selectedTab === 1 && <RegisterCard />}
    </div>
  );

  return userPanel;
}

export default Userpanel;

/* UserCardFull */

/* <UserCardL /> */

/* PostBox */

/* LogoutButton */
