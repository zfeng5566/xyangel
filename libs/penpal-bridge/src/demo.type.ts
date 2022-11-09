export interface ParentBridgeApi {
    email: {
        getEmail(): string;
    };
    add(num1: number, num2: number): number;
}
export interface ChildBridgeApi {
    common: {
        getCount(): number;
    };
    getText(): string;
}
