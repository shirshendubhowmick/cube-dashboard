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
    <header className="flex items-center justify-between bg-gray-800 px-4 py-4 font-bold text-white">
      <div className="max-w-[1120px]">Meteorites dashboard</div>

      {state.userAuthData.isAuthenticated && (
        <div>
          <p>
            {state.userAuthData.userData?.firstName}{" "}
            {state.userAuthData.userData?.lastName}
          </p>
          <button onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
