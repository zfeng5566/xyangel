import { XYCoord } from 'react-dnd';
/**
 *
 * @param source 拖拽元素原始数据
 * @param xyCoord  当前拖拽光标位置
 * @param currentEl 当前需要调整的元素原始数据
 * @returns
 */
export function adjust(
    source?: DOMRect,
    xyCoord?: XYCoord | null,
    currentEl?: DOMRect
): number {
    if (source && xyCoord && currentEl) {
        // 拖拽元素位于当前元素下面
        if (source.y > currentEl.y) {
            if (xyCoord.y < currentEl.y + currentEl.height) {
                return source.height;
            }

            // 拖拽元素位于当前元素上面
        } else if (xyCoord.y > currentEl.y) {
            return -source.height;
        }
    }
    return 0;
}
