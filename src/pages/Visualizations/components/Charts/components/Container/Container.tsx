export interface ContainerProps {
  children: React.ReactNode;
  label: string;
  height?: number;
}
function Container(props: ContainerProps) {
  return (
    <div
      className="mb-16 inline-block w-full"
      style={{ height: props.height ?? 400 }}
    >
      <p className="mb-4 text-lg font-medium">{props.label}</p>
      {props.children}
    </div>
  );
}

export default Container;
