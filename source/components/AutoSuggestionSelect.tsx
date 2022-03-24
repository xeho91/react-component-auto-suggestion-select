import type { FunctionComponent } from "react";

import CSS from "./AutoSuggestionSelect.module.scss";

const COMPONENT_NAME = "auto-suggestion-select" as const;

export interface AutoSuggestionSelectProperties {
	id: string;
	label: string;
}

export const AutoSuggestionSelect: FunctionComponent<
	AutoSuggestionSelectProperties
> = ({ id, label }) => {
	return (
		<div className={CSS.container}>
			<label className={CSS.label} htmlFor={setInputId(id)}>
				{label}
			</label>

			<span className={CSS.announcer} aria-live="assertive" />

			<input
				id={setInputId(id)}
				role="combobox"
				type="search"
				autoComplete="off"
				aria-activedescendant="item1"
				aria-autocomplete="list"
				aria-controls={setOptionsListId(id)}
				aria-expanded={false}
				aria-owns="res"
			/>

			<ul id={setOptionsListId(id)} role="listbox">
				<li id="option1" role="option" aria-selected={false}>
					Option 1
				</li>
			</ul>
		</div>
	);
};
AutoSuggestionSelect.displayName = "AutoSuggestionSelect";
AutoSuggestionSelect.defaultProps = {};

type ComponentId = `${typeof COMPONENT_NAME}-${string}`;

function setInputId(id: string): ComponentId {
	return `${COMPONENT_NAME}-${id}`;
}

type ComponentOptionsId = `${ReturnType<typeof setInputId>}-options`;

function setOptionsListId(id: string): ComponentOptionsId {
	return `${setInputId(id)}-options`;
}
