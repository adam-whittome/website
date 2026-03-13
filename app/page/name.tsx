import Text from "@/components/text";
import Transition from "@/components/transition";

export default function Name({ className }: { className?: string }) {
  return (
    <div className={`${className} flex flex-col items-center`}>
      <div className="overflow-hidden pb-3">
        <Transition
          className="transition-all duration-1000"
          before="translate-y-25 opacity-0"
          delay={100}
        >
          <Text className="font-merriweather text-6xl sm:text-7xl">Adam</Text>
        </Transition>
      </div>
      <Transition
        className="transition-all duration-1000 h-0.5 bg-foreground"
        before="w-0"
        after="w-2xs sm:w-sm"
      />
      <div className="overflow-hidden pt-3">
        <Transition
          className="transition-all duration-1000"
          before="-translate-y-25 opacity-0"
          delay={300}
        >
          <Text className="font-merriweather text-6xl sm:text-7xl">
            Whittome
          </Text>
        </Transition>
      </div>
    </div>
  );
}
