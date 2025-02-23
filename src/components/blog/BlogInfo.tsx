import React from "react";

type Props = {
  children: React.ReactNode;
  content: string;
};

export default function BlogInfo(props: Props) {
  return (
    <div className="flex items-center gap-2">
      {props.children}
      <span className="text-sm opacity-70">{props.content}</span>
    </div>
  );
}
