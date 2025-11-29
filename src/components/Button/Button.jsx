import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Button = forwardRef(
  (
    {
      to,
      href,
      primary = false,
      outline = false,
      text = false,
      rounded = false,
      disabled = false,
      small = false,
      large = false,
      leftIcon = null,
      rightIcon = null,
      children,
      className,
      onClick,
      ...passProps
    },
    ref
  ) => {
    let Component = "button";
    let props = {
      onClick,
      ...passProps,
    };

    if (to) {
      props.to = to;
      Component = Link;
    } else if (href) {
      props.href = href;
      Component = "a";
    }

    if (disabled) {
      props["aria-disabled"] = true;

      if (Component !== "button") {
        props.onClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };
      }
    }

    const classes = cx("wrapper", className, {
      primary,
      outline,
      text,
      rounded,

      small,
      large,

      disabled,
    });

    return (
      <Component
        ref={ref}
        className={classes}
        {...props}
        disabled={Component === "button" ? disabled : undefined}
      >
        {leftIcon && <span className={cx("icon", "leftIcon")}>{leftIcon}</span>}
        <span className={cx("title")}>{children}</span>
        {rightIcon && (
          <span className={cx("icon", "rightIcon")}>{rightIcon}</span>
        )}
      </Component>
    );
  }
);

export default Button;
