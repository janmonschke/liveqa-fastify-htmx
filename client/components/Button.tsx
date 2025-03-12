import { PropsWithChildren } from "@kitajs/html";
import clsx from "clsx";

import styles from "./Button.module.css";

type Size = "small" | "medium" | "large";
type Variant = "default" | "error";

const SizeToClass: Record<Size, string> = {
  small: styles.Small,
  medium: styles.Medium,
  large: styles.Large,
};

const VariantToClass = {
  default: "",
  error: "error",
};

export function Button({
  children,
  size = "medium",
  variant = "default",
}: PropsWithChildren<{
  size?: Size;
  variant?: Variant;
}>) {
  const klass = clsx(styles.Button, SizeToClass[size], VariantToClass[variant]);

  return (
    <button type="submit" class={klass}>
      {children}
    </button>
  );
}
