import Header from "../Header/Header";
import ToastContainer from "../Toast/ToastContainer";

function MainContainer(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] p-4">{props.children}</main>
      <ToastContainer />
    </>
  );
}

export default MainContainer;
