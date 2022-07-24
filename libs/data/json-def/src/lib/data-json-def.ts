interface AttrBase {
    name: string;
    title: string;
}

export interface Attribute {
    string: AttrBase & {
        type: 'string';
    };
    number: AttrBase & {
        type: 'number';
    };
    array: AttrBase & {
        type: 'array';
        item: Attribute[keyof Attribute];
    };
    object: AttrBase & {
        type: 'object';
        properties: {
            [k: string]: Attribute[keyof Attribute];
        };
    };
}

export const attrTypeList: (keyof Attribute)[] = [
    'string',
    'number',
    'array',
    'object',
];

export type DataFile =
    | {
          type: 'list';
          schema: Attribute['object'];
      }
    | {
          type: 'item';
          schema: {
              [k: string]: Attribute[keyof Attribute];
          };
      };

export function dataJsonDef(): string {
    return 'data-json-def';
}
