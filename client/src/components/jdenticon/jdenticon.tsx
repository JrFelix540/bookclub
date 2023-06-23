import React, { useRef, useEffect } from "react";
import { update } from "jdenticon";

interface JProps {
  value: string;
  size?: string;
}

export const Jdenticon: React.FunctionComponent<JProps> = ({
  value = "test",
  size = "100%",
}) => {
  const icon = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (icon.current) {
      update(icon.current, value);
    }
  }, [value]);

  return (
    <div>
      <svg data-jdenticon-value={value} height={size} ref={icon} width={size} />
    </div>
  );
};
