import * as React from "react";
import { signOut } from "../../services/auth";

interface IDashboardProps {}

const Dashboard = () => {
  const handleSignOut = async () => {
    // Ends user session
    await signOut();
  };

  return (
    <div>
      <p>Welcome to ChatRoomz!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Dashboard;
