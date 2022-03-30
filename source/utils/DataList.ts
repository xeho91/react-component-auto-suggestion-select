import {
	type DataListType,
	type DataListMap,
	getMapFromDataList,
	type ReferenceKey,
} from "$helpers/data-list";
import { isMapEmpty } from "$helpers/map";

export class DataList<Schema extends object = object> {
	public map: DataListMap<Schema>;

	constructor(
		dataList: DataListType<Schema>,
		referenceKey: ReferenceKey<Schema>,
	) {
		this.map = getMapFromDataList(dataList, referenceKey);
	}

	get isEmpty(): boolean {
		return isMapEmpty(this.map);
	}

	get list(): Array<Schema> {
		return [...this.map.values()];
	}
}
