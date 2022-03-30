import { Icon } from "@iconify/react";
import clsx from "clsx";
import { m } from "framer-motion";
import {
	type FunctionComponent,
	type MouseEventHandler,
	useCallback,
	useState,
} from "react";

import { setComponentId } from "$helpers/component";

import CSS from "./Accordion.module.scss";

const COMPONENT_NAME = "accordion";

export type AccordionClickHandler = MouseEventHandler<HTMLButtonElement>;

export interface AccordionProperties {
	counter?: JSX.Element | undefined;
	expanded?: boolean;
	id?: string;
	onClick?: AccordionClickHandler;
	title: string;
}

export const Accordion: FunctionComponent<AccordionProperties> = ({
	children,
	counter,
	expanded,
	id,
	onClick,
	title,
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(expanded ?? false);
	const parentId = setComponentId(COMPONENT_NAME, id ? id : "1");

	const handleButtonClick: AccordionClickHandler = useCallback(
		(event) => {
			if (onClick) {
				onClick(event);
			}

			setIsExpanded((state) => !state);
		},
		[onClick],
	);

	return (
		<div className={CSS.container} aria-expanded={isExpanded}>
			<Header
				id={parentId}
				counter={counter}
				isExpanded={isExpanded}
				title={title}
				onClick={handleButtonClick}
			/>
			<Panel id={parentId} isExpanded={isExpanded}>
				{children}
			</Panel>
		</div>
	);
};
Accordion.displayName = "Accordion";
Accordion.defaultProps = {
	expanded: false,
	id: "1",
};

interface AccordionChildrenSharedProperties {
	id: string;
	isExpanded: boolean;
}

type AccordionHeaderProperties = Pick<
	AccordionProperties,
	"counter" | "onClick" | "title"
> &
	AccordionChildrenSharedProperties;

const Header: FunctionComponent<AccordionHeaderProperties> = ({
	counter,
	id,
	isExpanded,
	title,
	onClick,
}) => (
	<header className={clsx(CSS.header, { [CSS.is_expanded]: isExpanded })}>
		<button
			id={`${id}-header`}
			className={CSS.header_button}
			aria-controls={`${id}-panel`}
			data-testid="accordion-button"
			onClick={onClick}
		>
			<span className={CSS.header_title}>{title}</span>
			{counter ?? counter}
			<m.span
				className={CSS.header_icon}
				animate={isExpanded ? "expanded" : "hidden"}
				initial="expanded"
				transition={{ ease: "anticipate" }}
				variants={{
					expanded: { rotate: "90deg" },
					hidden: { rotate: "0deg" },
				}}
			>
				<Icon icon="ep:arrow-down-bold" width="100%" height="100%" />
			</m.span>
		</button>
	</header>
);
Header.displayName = "AccordionHeader";

type AccordionPanelProperties = AccordionChildrenSharedProperties;

const Panel: FunctionComponent<AccordionPanelProperties> = ({
	children,
	id,
	isExpanded,
}) => (
	<m.section
		id={`${id}-panel`}
		className={CSS.panel}
		aria-labelledby={`${id}-header`}
		aria-hidden={!isExpanded}
		data-testid="accordion-panel"
		animate={isExpanded ? "expanded" : "hidden"}
		initial={isExpanded ? "expanded" : "hidden"}
		variants={{
			expanded: {
				display: "block",
				width: "var(--content-width)",
				height: "var(--content-height)",
				opacity: 1,
				transition: { ease: "easeIn", when: "beforeChildren" },
			},
			hidden: {
				width: "var(--header-width)",
				height: 0,
				opacity: 0,
				transition: { ease: "easeOut", when: "afterChildren" },
				transitionEnd: { display: "none" },
			},
		}}
	>
		<m.div
			className={clsx(CSS.content)}
			variants={{
				expanded: { opacity: 1 },
				hidden: { opacity: 0 },
			}}
		>
			{children ?? (
				<p className={CSS.content_placeholder}>
					This accordion content is empty!
				</p>
			)}
		</m.div>
	</m.section>
);
Panel.displayName = "AccordionPanel";
