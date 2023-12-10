import Header from "../Header/Header";

function MainContainer(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1120px] p-4">{props.children}</main>
    </>
  );
}

export default MainContainer;
