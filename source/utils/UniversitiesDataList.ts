import { DataList } from "$utils/DataMap";
import type { ReferenceKey } from "$helpers/data-list";

export interface UniversityRecord {
	"country": string;
	"name": string;
	"domains": Array<string>;
	"alpha_two_code": string;
	"state-province": string | null;
	"web_pages": Array<string>;
}

export type APIResponseUniversitiesList = Array<UniversityRecord>;

export class UniversitiesDataList extends DataList<UniversityRecord> {
	constructor(
		dataList: APIResponseUniversitiesList,
		referenceKey: ReferenceKey<UniversityRecord> = "name",
	) {
		super(dataList, referenceKey);
	}

	get names(): Array<UniversityRecord["name"]> {
		return [...this.map.keys()] as Array<UniversityRecord["name"]>;
	}
}
