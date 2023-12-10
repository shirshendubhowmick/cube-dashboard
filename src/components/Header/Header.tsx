import useStore from "../../store";

function Header() {
  const [state, actionFunctions] = useStore();

  return (
    <header className="flex items-center justify-between bg-gray-800 px-4 py-4 font-bold text-white">
      <div className="max-w-[1120px]">Meteorites dashboard</div>

      {state.userAuthData.isAuthenticated && (
        <div>
          <p>{state.userAuthData.userData.name}</p>
          <button onClick={actionFunctions.userLoggedOut} type="button">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
