import { useState } from "react";
import {OidcProvider} from "../index.ts";
import store from "./store.ts";
import userManager from "./user-manager.ts";
import * as ReactDOMClient from 'react-dom/client';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(userManager)
  return (
    <div>
      <button
        style={{
          position: "fixed",
          left: 0,
          top: "40%",
          zIndex: 1,
          backgroundColor: "yellow",
        }}
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
      <OidcProvider store={store} userManager={userManager}>
        <div>Loading</div>
      </OidcProvider>
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
