import { isObjectEmpty } from "$helpers/object";

export type DataListType<Schema extends object = object> = Array<Schema>;
export type ReferenceKey<Schema> = Extract<keyof Schema, number | string>;
export type DataListMap<Schema> = Map<Schema[ReferenceKey<Schema>], Schema>;

function hasEmptyData(dataList: DataListType) {
	return !dataList.every((data) => !isObjectEmpty(data));
}

export function isValidDataList(dataList: DataListType): boolean {
	if (!Array.isArray(dataList)) {
		return false;
	} else if (hasEmptyData(dataList)) {
		return false;
	} else {
		const sharedKeys = new Set(Object.keys(dataList[0]));

		for (const data of dataList) {
			const keys = Object.keys(data);

			if (
				keys.length !== sharedKeys.size ||
				!keys.every((key) => sharedKeys.has(key))
			) {
				return false;
			}
		}

		return true;
	}
}

function validateDataList(dataList: DataListType): DataListType {
	if (!Array.isArray(dataList)) {
		throw new TypeError(
			`Data list should be an array! Passed argument type is: "${typeof dataList}".`,
		);
	} else if (hasEmptyData(dataList)) {
		throw new TypeError(`At least one of the data in the list is empty!`);
	} else if (!isValidDataList(dataList)) {
		throw new TypeError("Data list should contain objects with same keys!");
	} else {
		return dataList;
	}
}

// TODO::
// Research on how to extract the *final* type from the Schema.
// Currently it returns an union (number | string), which is not desired.
export function getMapFromDataList<Schema extends object = object>(
	dataList: DataListType<Schema>,
	referenceKey: ReferenceKey<Schema>,
): DataListMap<Schema> {
	validateDataList(dataList);

	return new Map(
		dataList.map((data, index) => {
			if (!Object.hasOwn(data, referenceKey)) {
				throw new ReferenceError(
					`The data item with index: ${index} - in the list doesn't have a key named: "${referenceKey}"!`,
				);
			} else {
				const keyValue = data[referenceKey];

				if (
					typeof keyValue === "string" ||
					typeof keyValue === "number"
				) {
					return [keyValue, data];
				} else {
					throw new TypeError(
						`Only keys whole values are either type of "number" or "string" can be accepted! The provided one was type of "${typeof keyValue}".`,
					);
				}
			}
		}),
	);
}
