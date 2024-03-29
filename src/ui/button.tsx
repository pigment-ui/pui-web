"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { useObjectRef } from "@react-aria/utils";
import { ForwardedRef, forwardRef } from "react";
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { variantColorRadiusStyles } from "./styles";
import { AsChildProps, ChildrenProps, ColorProps, ContentProps, RadiusProps, SizeProps, StyleProps, VariantProps } from "./types";

import { Spinner } from "./spinner";

// styles

const buttonStyles = tv({
  extend: variantColorRadiusStyles,
  base: "relative flex items-center justify-center min-w-max whitespace-nowrap overflow-hidden",
  variants: {
    size: {
      sm: "h-8 gap-x-2 px-4 text-xs [&_svg]:size-4",
      md: "h-10 gap-x-2.5 px-5 text-sm [&_svg]:size-5",
      lg: "h-12 gap-x-3 px-6 text-base [&_svg]:size-6",
    },
    isIconOnly: { true: "" },
    isLoading: { true: "!text-transparent" },
  },
  compoundVariants: [
    { size: "sm", isIconOnly: true, className: "px-2" },
    { size: "md", isIconOnly: true, className: "px-2.5" },
    { size: "lg", isIconOnly: true, className: "px-3" },
  ],
});

// props

interface PigmentButtonProps
  extends AriaButtonProps,
    VariantProps,
    ColorProps,
    SizeProps,
    RadiusProps,
    ContentProps,
    AsChildProps,
    ChildrenProps,
    StyleProps {
  isIconOnly?: boolean;
  isLoading?: boolean;
}

// component

function _Button(props: PigmentButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = "md",
    startContent,
    endContent,
    isLoading,
    isDisabled: disabled,
    isIconOnly,
    asChild,
    children,
    className,
    style,
    ...restProps
  } = props;

  const isDisabled = disabled || isLoading;

  const objRef = useObjectRef(ref);
  const { buttonProps, isPressed } = useButton({ ...restProps, isDisabled }, objRef);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={objRef}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={buttonStyles({ variant, color, size, radius, isIconOnly, isLoading, isHovered, isPressed, isDisabled, isFocusVisible, className })}
      style={style}
    >
      {isLoading && (
        <div className={twMerge("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", variant === "solid" && "invert")}>
          <Spinner size={size} color={variant === "solid" ? "default" : color} />
        </div>
      )}

      {startContent}
      <Slottable>{children}</Slottable>
      {endContent}
    </Component>
  );
}

const Button = forwardRef(_Button);

// exports

export { Button };
export type { PigmentButtonProps };
