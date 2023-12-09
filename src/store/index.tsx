import { createContext, useContext, useMemo, useReducer } from "react";

export interface UserAuthData {
  isAuthenticated: boolean;
  isAuthCheckComplete: boolean;
  userData: {
    id: string;
    name: string;
    role: string;
  };
  authData: {
    cubeApiToken: string;
  };
}

export interface ActionFunctions {
  userLoggedIn: (payload: UserAuthData) => void;
  userLoggedOut: () => void;
  authCheckComplete: () => void;
}

export interface State {
  userAuthData: UserAuthData;
}

const initialState: State = {
  userAuthData: {
    isAuthCheckComplete: false,
    isAuthenticated: false,
    userData: {
      id: "",
      name: "",
      role: "",
    },
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
  payload: UserAuthData;
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

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        userAuthData: action.payload,
      };
    case "USER_LOGGED_OUT":
      return {
        ...state,
        userAuthData: {
          ...initialState.userAuthData,
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
      userLoggedIn: (payload: UserAuthData) =>
        dispatch({ type: "USER_LOGGED_IN", payload }),
      userLoggedOut: () => dispatch({ type: "USER_LOGGED_OUT" }),
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
