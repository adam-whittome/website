import Name from "./page/name";
import Text from "@/components/text";
import PullUpText from "./page/pullUpText";
import Cube from "@/icons/cube";
import BarChart from "@/icons/barChart";
import User from "@/icons/user";
import DoubleListItem from "./page/doubleListItem";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="sm:w-lg p-3 sm:p-0 sm:text-xl flex flex-col gap-0.5">
        <Name className="pt-5 pb-10 sm:pt-30 sm:pb-15" />
        <PullUpText delay={600}>Software Developer</PullUpText>
        <PullUpText delay={700}>
          Gonville & Caius College Cambridge - Computer Science
        </PullUpText>
        <PullUpText delay={800}>I'm interested in: </PullUpText>
        <div className="p-3 pl-5 flex flex-col gap-2">
          <DoubleListItem
            delay={1000}
            left={<Cube className="size-8" />}
            right={<Text>Computer Graphics</Text>}
          />
          <DoubleListItem
            delay={1100}
            left={<BarChart className="size-8" />}
            right={<Text>Data Science</Text>}
          />
          <DoubleListItem
            delay={1200}
            left={<User className="size-8" />}
            right={<Text>Human-Computer Interaction</Text>}
          />
        </div>
      </div>
    </div>
  );
}
