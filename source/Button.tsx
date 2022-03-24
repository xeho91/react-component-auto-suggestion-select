import clsx from "clsx";
import type {
	ButtonHTMLAttributes,
	FunctionComponent,
	MouseEventHandler,
} from "react";

import CSS from "./Button.module.scss";

export interface ButtonProperties {
	/**
	 * @description Will this button run a _dangerous_ action?
	 * @default false
	 */
	dangerous?: boolean;
	/**
	 * @description Callback function action to run when Button element was clicked.
	 */
	onClick?: MouseEventHandler<HTMLButtonElement>;
	/**
	 * @description HTML type of the button element.
	 * @default "button"
	 */
	type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
	title: string;
	disabled?: boolean;
	className?: string;
	label: string;
}

export const Button: FunctionComponent<ButtonProperties> = ({
	className,
	disabled,
	label,
	onClick,
	title,
	type,
}) => {
	return (
		<button
			className={clsx(CSS.red, className)}
			aria-label={title}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{label && <span className={CSS.label}>{label}</span>}
		</button>
	);
};
Button.displayName = "Button";
Button.defaultProps = {};
