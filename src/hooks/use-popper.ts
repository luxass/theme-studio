/**
 * Modified code from https://github.com/chakra-ui/chakra-ui/blob/main/packages/popper/src/use-popper.ts
 */

import mergeRefs from "@helpers/refs";
import { innerArrow, positionArrow } from "@lib/popper/modifiers/tooltip";
import {
  createPopper,
  Instance,
  Modifier,
  Placement,
  VirtualElement,
} from "@popperjs/core";
import { useCallback, useEffect, useRef } from "react";

export interface UsePopperProps {
  strategy?: "absolute" | "fixed";
  placement?: Placement;
  modifiers?: Array<Partial<Modifier<string, any>>>;
}

export default function usePopper({
  strategy = "absolute",
  placement = "top",
  modifiers,
}: UsePopperProps = {}) {
  const reference = useRef<Element | VirtualElement | null>(null);
  const popper = useRef<HTMLElement | null>(null);
  const instance = useRef<Instance | null>(null);
  const cleanup = useRef(() => {});

  const setupPopper = useCallback(() => {
    if (!reference.current || !popper.current) return;

    // If popper instance exists, destroy it so we can create a new one
    cleanup.current?.();

    instance.current = createPopper(reference.current, popper.current, {
      placement,
      modifiers: [
        {
          name: "topLogger",
          enabled: true,
          phase: "main",
          fn({ state }) {
            if (state.placement === "top") {
              console.log("Popper is on the top");
            }
          },
        },
        innerArrow,
        positionArrow,
        // customModifiers.innerArrow,
        // customModifiers.positionArrow,
        // customModifiers.transformOrigin,
        // { ...customModifiers.matchWidth, enabled: !!matchWidth },
        // {
        //   name: "eventListeners",
        //   ...getEventListenerOptions(eventListeners),
        // },
        {
          name: "arrow",
          options: { padding: 8 },
        },
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        // {
        //   name: "flip",
        //   enabled: !!flip,
        //   options: { padding: 8 },
        // },
        {
          name: "preventOverflow",
          enabled: true,
          options: { boundary: "clippingParents" },
        },
        // allow users override internal modifiers
        ...(modifiers ?? []),
      ],
      strategy,
    });

    // force update one-time to fix any positioning issues
    instance.current.forceUpdate();

    cleanup.current = instance.current.destroy;
  }, [placement, modifiers, strategy]);

  useEffect(() => {
    return () => {
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        instance.current?.destroy();
        instance.current = null;
      }
    };
  }, []);

  const referenceRef = useCallback(
    <T extends Element | VirtualElement>(node: T | null) => {
      reference.current = node;
      setupPopper();
    },
    [setupPopper]
  );

  const getReferenceProps = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(referenceRef, ref),
    }),
    [referenceRef]
  );

  const popperRef = useCallback(
    <T extends HTMLElement>(node: T | null) => {
      popper.current = node;
      setupPopper();
    },
    [setupPopper]
  );

  const getPopperProps = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(popperRef, ref),
      style: {
        ...props.style,
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0",
      },
    }),
    [strategy, popperRef]
  );

  const getArrowProps = useCallback((props = {}, ref = null) => {
    const { size, shadowColor, bg, style, ...rest } = props;
    return {
      ...rest,
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle(props),
    };
  }, []);

  const getArrowInnerProps = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      "data-popper-arrow-inner": "",
    }),
    []
  );

  return {
    update() {
      instance.current?.update();
    },
    forceUpdate() {
      instance.current?.forceUpdate();
    },
    // transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps,
  };
}

function getArrowStyle(props: any) {
  const { size, shadowColor, bg, style } = props;
  const computedStyle = { ...style, position: "absolute" };
  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}
