import "semantic-ui-css/semantic.min.css";
import "./App.css";

import UserPanel from "./left/UserPanel";
import CommunityPanel from "./right/CommunityPanel";
import MainFeed from "./middle/MainFeed";

import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <div className="ui-container">
        <UserPanel />
        <MainFeed />
        <CommunityPanel />
      </div>
    </AuthProvider>
  );
}

export default App;
