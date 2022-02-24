export interface IFunctionEvent {
  body: string | object | undefined
  headers: Record<string, string>
  method: string
  query: Record<string, string>
  path: string
}

export interface IFunctionContext {
  status: (statusCode: number) => IFunctionContext
  headers: (value: Record<string, string>) => IFunctionContext
  succeed: (value: string | object) => void
  fail: (value: string) => void
}
