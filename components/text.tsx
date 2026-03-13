export default function Text(props: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <p className={props.className}>{props.children}</p>;
}
