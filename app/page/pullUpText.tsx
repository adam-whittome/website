import Text from "@/components/text";
import Transition from "@/components/transition";

export default function PullUpText({
  delay = 0,
  children,
}: {
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <Transition
      className="transition-all duration-1000"
      before="translate-y-5 opacity-0"
      delay={delay}
    >
      <Text className="text-foreground">{children}</Text>
    </Transition>
  );
}
