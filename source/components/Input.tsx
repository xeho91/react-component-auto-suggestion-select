import { AnimatePresence, m } from "framer-motion";
import {
	type ChangeEventHandler,
	type FunctionComponent,
	forwardRef,
	useCallback,
	useState,
} from "react";

import { setComponentId } from "$helpers/component";

import CSS from "./Input.module.scss";

const COMPONENT_NAME = "input";
const PATTERN = "^[-, A-Za-z]+$";
const ERROR_MESSAGE =
	"Do not include numbers or special characters (except: - and ,)!";

export type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;

export interface InputProperties {
	activeDescendant?: string;
	defaultValue?: string;
	id?: string;
	label: string;
	onChange?: InputChangeHandler;
	owns?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProperties>(
	(
		{ activeDescendant, defaultValue, id, label, onChange, owns },
		reference,
	) => {
		const inputId = setComponentId(COMPONENT_NAME, id ? id : "1");

		const [value, setValue] = useState<string>(defaultValue ?? "");
		const [isValid, setIsValid] = useState<boolean>(
			defaultValue ? new RegExp(PATTERN).test(defaultValue) : true,
		);

		const handleInputChange: InputChangeHandler = useCallback(
			(event) => {
				if (onChange) {
					onChange(event);
				}

				setValue(event.target.value);
				setIsValid(event.target.validity.valid);
			},
			[onChange],
		);

		return (
			<div className={CSS.container}>
				<label
					className={CSS.label}
					aria-labelledby={label}
					htmlFor={inputId}
				/>
				<input
					id={inputId}
					className={CSS.input}
					autoComplete="off"
					aria-activedescendant={activeDescendant}
					aria-autocomplete="list"
					// TODO: Finish controls
					aria-controls={""}
					aria-describedby={`${inputId}-feedback`}
					aria-expanded={false}
					aria-invalid={!isValid}
					aria-owns={owns}
					role="combobox"
					type="search"
					onChange={handleInputChange}
					pattern={PATTERN}
					ref={reference}
					value={value}
				/>
				<ErrorFeedback id={inputId} hidden={isValid} />
			</div>
		);
	},
);
Input.displayName = "Input";
Input.defaultProps = {
	defaultValue: "",
};

interface ErrorFeedbackProperties {
	id: string;
	hidden: boolean;
}

const ErrorFeedback: FunctionComponent<ErrorFeedbackProperties> = ({
	id,
	hidden,
}) => {
	return (
		<AnimatePresence exitBeforeEnter>
			{!hidden && (
				<m.small
					id={`${id}-feedback`}
					className={CSS.error}
					animate="visible"
					exit="hidden"
					initial="hidden"
					role="alert"
					variants={{
						hidden: { opacity: 0, scale: 0 },
						visible: { opacity: 1, scale: 1 },
					}}
				>
					{ERROR_MESSAGE}
				</m.small>
			)}
		</AnimatePresence>
	);
};
ErrorFeedback.displayName = "InputErrorFeedback";
