import type { PropsWithChildren } from "@kitajs/html";
import clsx from "clsx";

import styles from "./Button.module.css";

type Size = "small" | "medium" | "large";
type Variant = "default" | "primary" | "link" | "error";

const SizeToClass: Record<Size, string> = {
  small: "is-small",
  medium: "is-normal",
  large: "is-medium",
};

const VariantToClass: Record<Variant, string> = {
  default: "",
  primary: "is-link", // yes, this is the bulma class for link, but I prefer it over the primary
  link: "is-primary",
  error: "is-danger",
};

export function Button({
  children,
  size = "medium",
  variant = "default",
  ...rest
}: PropsWithChildren<
  {
    size?: Size;
    variant?: Variant;
  } & JSX.HtmlButtonTag
>) {
  const klass = clsx(
    "button",
    styles.Button,
    SizeToClass[size],
    VariantToClass[variant]
  );

  return (
    <button type="submit" class={klass} {...rest}>
      {children}
    </button>
  );
}
