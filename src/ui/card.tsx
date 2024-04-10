"use client";

import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { AsChildProps, ChildrenProps, StyleProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

// styles

const cardStyles = tv({
  slots: {
    base: "bg-default-0 text-default-1000 border border-default-1000/20 bg-clip-padding backdrop-blur-xl bg-opacity-75 overflow-auto rounded-xl outline-none",
    header: "p-4",
    body: "p-4",
    footer: "p-4",
    heading: "text-xl font-bold",
    buttons: "flex justify-end gap-x-4",
  },
  variants: {
    hasShadow: {
      true: "[box-shadow:0_5px_20px_rgba(0,0,0,.1)] dark:[box-shadow:0_5px_20px_rgba(255,255,255,.1)]",
      false: "shadow-none",
    },
  },
  defaultVariants: { hasShadow: true },
});

type CardStylesReturnType = ReturnType<typeof cardStyles>;

// props

interface PigmentCardProps
  extends HTMLAttributes<HTMLDivElement>,
    AsChildProps,
    ChildrenProps,
    StyleProps,
    StyleSlotsToStyleProps<CardStylesReturnType> {
  hasShadow?: boolean;
}

// slots

interface CardSlotsType extends StyleSlotsToSlots<CardStylesReturnType> {}

const [CardSlotsProvider, useCardSlots] = createSlots<CardSlotsType>();

// component

function _Card(props: PigmentCardProps, ref: ForwardedRef<HTMLDivElement>) {
  const { hasShadow = true, asChild, children, className, classNames, style, styles } = props;

  const styleSlots = cardStyles({ hasShadow });

  return (
    <CardSlotsProvider value={{ styleSlots, classNames, styles }}>
      <div ref={ref} className={styleSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
        {children}
      </div>
    </CardSlotsProvider>
  );
}

const Card = forwardRef(_Card);

function _CardHeader(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <header
      ref={ref}
      className={styleSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
      {...restProps}
    />
  );
}

const CardHeader = forwardRef(_CardHeader);

function _CardBody(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <section
      ref={ref}
      className={styleSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
      {...restProps}
    />
  );
}

const CardBody = forwardRef(_CardBody);

function _CardFooter(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <footer
      ref={ref}
      className={styleSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
      {...restProps}
    />
  );
}

const CardFooter = forwardRef(_CardFooter);

function _CardHeading(props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <h3
      ref={ref}
      className={styleSlots.heading({ className: twMerge(classNames?.heading, className) })}
      style={mergeProps(styles?.heading, style)}
      {...restProps}
    />
  );
}

const CardHeading = forwardRef(_CardHeading);

function _CardButtons(props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <div
      ref={ref}
      className={styleSlots.buttons({ className: twMerge(classNames?.buttons, className) })}
      style={mergeProps(styles?.buttons, style)}
      {...restProps}
    />
  );
}

const CardButtons = forwardRef(_CardButtons);

// exports

export { Card, CardHeader, CardBody, CardFooter, CardHeading, CardButtons, cardStyles };
export type { PigmentCardProps };
