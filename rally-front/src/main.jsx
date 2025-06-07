import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";
import { HeaderProviderWrapper } from "./context/header.context.jsx";
import { UserProviderWrapper } from "./context/user.context.jsx";
import { DateProviderWrapper } from "./context/date.context.jsx";
import { RallyProviderWrapper } from "./context/rally.context.jsx";
import { PhotoProviderWrapper } from "./context/photo.context.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <BrowserRouter>
    <UserProviderWrapper>
      <HeaderProviderWrapper>
        <DateProviderWrapper>
          <RallyProviderWrapper>
            <PhotoProviderWrapper>
              <App />
            </PhotoProviderWrapper>
          </RallyProviderWrapper>
        </DateProviderWrapper>
      </HeaderProviderWrapper>
    </UserProviderWrapper>
  </BrowserRouter>
  //</StrictMode>
);
