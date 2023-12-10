import { useCallback } from "react";

import useStore from "../../store";
import { userLogout } from "../../services/apiService";

function Header() {
  const [state, actionFunctions] = useStore();

  const onLogout = useCallback(async () => {
    await userLogout();
    actionFunctions.userLoggedOut();
  }, []);

  return (
    <header className="flex items-center justify-between bg-gray-800 px-4 py-4 text-white">
      <div className="max-w-[1120px] text-lg font-bold">
        Meteorites dashboard
      </div>
      {state.userAuthData.isAuthenticated && (
        <div>
          <span className="mr-4">
            {state.userAuthData.userData?.firstName}{" "}
            {state.userAuthData.userData?.lastName}
          </span>
          <button
            onClick={onLogout}
            type="button"
            className="rounded border border-solid border-white px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
