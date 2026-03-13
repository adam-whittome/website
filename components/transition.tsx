"use client";

import { useEffect, useState } from "react";

export default function Transition({
  delay = 0,
  ...props
}: {
  className?: string;
  before?: string;
  after?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  const [transition, setTransition] = useState(false);

  const output = (
    <div
      className={`${props.className} ${transition ? props.after : props.before}`}
    >
      {props.children}
    </div>
  );

  useEffect(() => {
    setTimeout(() => setTransition(() => true), delay);
  }, []);

  return output;
}
