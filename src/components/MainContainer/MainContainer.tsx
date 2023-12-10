function MainContainer(props: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-[1120px] p-8">{props.children}</main>;
}

export default MainContainer;
