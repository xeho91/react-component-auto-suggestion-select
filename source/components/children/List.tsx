import { isArrayEmpty } from "$helpers/array";
import { Icon } from "@iconify/react";
import { m, type MotionStyle } from "framer-motion";
import {
	type CSSProperties,
	forwardRef,
	Fragment,
	useRef,
	FunctionComponent,
} from "react";
import { useVirtual } from "react-virtual";

import CSS from "./List.module.scss";

interface ListRecord {
	value: string;
	selected: boolean;
}

export interface ListProperties {
	data: Array<ListRecord>;
	emptyPlaceholder?: string;
	id: string;
}

interface ListCSSProperties extends CSSProperties {
	"--total-size": `${number}px`;
	"--item-position-start": `${number}px`;
}

const EMPTY_PLACEHOLDER = "The list is empty.";

export const List = forwardRef<HTMLUListElement, ListProperties>(
	({ data, emptyPlaceholder, id }, reference) => {
		// @see https://react-virtual.tanstack.com/
		const parentReference = useRef(null);
		const itemVirtualizer = useVirtual({
			horizontal: false,
			overscan: 3,
			parentRef: parentReference,
			size: data.length,
		});

		return (
			<div className={CSS.wrapper} ref={parentReference}>
				<ul
					id={id}
					className={CSS.list}
					ref={reference}
					role="listbox"
					style={
						{
							"--total-size": `${itemVirtualizer.totalSize}px`,
						} as ListCSSProperties
					}
				>
					{isArrayEmpty(data) ? (
						<Placeholder message={emptyPlaceholder} />
					) : (
						<Fragment>
							{itemVirtualizer.virtualItems.map((item) => (
								<Item
									key={item.index}
									positionStart={item.start}
									ref={item.measureRef}
									{...data[item.index]}
								/>
							))}
						</Fragment>
					)}
				</ul>
			</div>
		);
	},
);
List.displayName = "List";
List.defaultProps = {};

interface PlaceholderProperties {
	message: string | undefined;
}

const Placeholder: FunctionComponent<PlaceholderProperties> = ({ message }) => (
	<m.span
		className={CSS.placeholder}
		role="alert"
		aria-live="polite"
		initial="hidden"
		viewport={{ once: false }}
		variants={{
			hidden: { opacity: 0 },
			visible: { opacity: 1 },
		}}
		whileInView="visible"
	>
		<span className={CSS.placeholder_icon}>
			<Icon icon="ep:warning-filled" width="100%" height="100%" />
		</span>
		<span className={CSS.placeholder_message}>
			{message ?? EMPTY_PLACEHOLDER}
		</span>
	</m.span>
);
Placeholder.displayName = "ListPlaceholder";

interface ListItemProperties extends ListRecord {
	positionStart: number;
}

const Item = forwardRef<HTMLLIElement, ListItemProperties>(
	({ value, positionStart, selected }, measureReference) => (
		<m.li
			ref={measureReference}
			className={CSS.item}
			aria-selected={selected}
			initial="hidden"
			role="option"
			style={
				{ "--item-position-start": `${positionStart}px` } as MotionStyle
			}
			viewport={{ once: false }}
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1 },
			}}
			whileInView="visible"
		>
			<span className={CSS.item_value}>{value}</span>
			{selected && (
				<span className={CSS.item_icon_selected}>
					<Icon icon="ep:check" width="100%" height="100%" />
				</span>
			)}
		</m.li>
	),
);
Item.displayName = "Item";
