import {SelectedSortItem, SortItemSelector} from "../internal";
import {Func} from "../../types/internal";

export class DescendingSortItemSelector<TKey, TValue> extends SortItemSelector<TKey, TValue> {
    public constructor(keySelector: Func<TKey, TValue>) {
        super(keySelector);
    }

    protected selectFromNotEqualKeys(leftKey: TKey, rightKey: TKey): SelectedSortItem {
        if (rightKey < leftKey) {
            return SelectedSortItem.left;
        }

        return SelectedSortItem.right;
    }
}
