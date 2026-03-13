import Transition from "@/components/transition";

export default function DoubleListItem({
  delay = 0,
  ...props
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="flex flex-row">
      <Transition
        className="transition-opacity duration-600"
        before="opacity-0"
        delay={delay}
      >
        {props.left}
      </Transition>

      <div className="overflow-hidden pl-5">
        <Transition
          className="transition-all duration-1000"
          before="opacity-0 -translate-x-30"
          delay={delay}
        >
          {props.right}
        </Transition>
      </div>
    </div>
  );
}
