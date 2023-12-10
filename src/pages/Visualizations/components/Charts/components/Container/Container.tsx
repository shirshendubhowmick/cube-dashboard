function Container(props: { children: React.ReactNode; label: string }) {
  return (
    <div className="inline-block h-[400px] w-full">
      <p className="mb-4 text-lg font-medium">{props.label}</p>
      {props.children}
    </div>
  );
}

export default Container;
