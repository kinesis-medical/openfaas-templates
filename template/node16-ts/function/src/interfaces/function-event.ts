export interface FunctionEvent {
    body: string | object | undefined;
    headers: Record<string, string>;
    method: string;
    query: Record<string, string>;
    path: string;
}
