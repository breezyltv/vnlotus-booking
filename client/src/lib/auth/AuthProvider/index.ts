import React from "react";

import { Viewer } from "../../../lib/types";

export const initViewer: Viewer = {
  id: null,
  email: null,
  csrfToken: null,
  displayName: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

interface ContextType {
  viewer: Viewer;
}

export const AuthContext = React.createContext<ContextType>({
  viewer: initViewer,
});
