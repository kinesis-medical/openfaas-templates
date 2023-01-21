export interface FunctionContext {
    status: (statusCode: number) => FunctionContext;
    headers: (value: Record<string, string>) => FunctionContext;
    succeed: (value: string | object) => void;
    fail: (value: string) => void;
}
