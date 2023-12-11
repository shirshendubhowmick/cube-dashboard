import { createContext, useContext, useMemo, useReducer } from "react";

import { UserData } from "../types";
import { removeCsrfToken, setCsrfToken } from "../services/storage";

export interface UserAuthData {
  isAuthenticated: boolean;
  isAuthCheckComplete: boolean;
  userData: UserData | null;
  authData: {
    cubeApiToken: string;
  };
}

export interface State {
  userAuthData: UserAuthData;
}

const initialState: State = {
  userAuthData: {
    isAuthCheckComplete: false,
    isAuthenticated: false,
    userData: null,
    authData: {
      cubeApiToken: "",
    },
  },
};

const initialActionFunctions: ActionFunctions = {
  userLoggedIn: () => {},
  userLoggedOut: () => {},
  authCheckComplete: () => {},
};

const StoreContext = createContext<[State, ActionFunctions]>([
  initialState,
  initialActionFunctions,
]);

export interface UserLoggedInAction {
  type: "USER_LOGGED_IN";
  payload: {
    userData: UserData;
    cubeApiToken: string;
    csrfToken?: string;
  };
}

export interface UserLoggedOutAction {
  type: "USER_LOGGED_OUT";
}

export interface AuthCheckCompleteAction {
  type: "AUTH_CHECK_COMPLETE";
}

export type Actions =
  | UserLoggedInAction
  | UserLoggedOutAction
  | AuthCheckCompleteAction;

export interface ActionFunctions {
  userLoggedIn: (payload: UserLoggedInAction["payload"]) => void;
  userLoggedOut: () => void;
  authCheckComplete: () => void;
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        userAuthData: {
          isAuthCheckComplete: true,
          isAuthenticated: true,
          userData: action.payload.userData,
          authData: {
            cubeApiToken: action.payload.cubeApiToken,
          },
        },
      };
    case "USER_LOGGED_OUT":
      return {
        ...state,
        userAuthData: {
          ...initialState.userAuthData,
          isAuthCheckComplete: true,
        },
      };
    case "AUTH_CHECK_COMPLETE":
      return {
        ...state,
        userAuthData: {
          ...state.userAuthData,
          isAuthCheckComplete: true,
        },
      };
    default:
  }
  throw Error("Unknown action.");
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actionFunctions = useMemo(
    () => ({
      userLoggedIn: (payload: UserLoggedInAction["payload"]) => {
        if (payload.csrfToken) {
          setCsrfToken(payload.csrfToken);
        }
        dispatch({ type: "USER_LOGGED_IN", payload });
      },
      userLoggedOut: () => {
        removeCsrfToken();
        dispatch({ type: "USER_LOGGED_OUT" });
      },
      authCheckComplete: () => dispatch({ type: "AUTH_CHECK_COMPLETE" }),
    }),
    [],
  );

  return (
    <StoreContext.Provider value={[state, actionFunctions]}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  return useContext(StoreContext);
}

export default useStore;
