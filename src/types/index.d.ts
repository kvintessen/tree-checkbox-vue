export interface TreeNode {
    label: string;
    checked: boolean | null;
    children?: TreeNode[];  // Массив детей или undefined
}
