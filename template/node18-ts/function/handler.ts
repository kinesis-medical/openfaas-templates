import { IFunctionEvent, IFunctionContext } from './interfaces/i-handler-parameters'

async function handle(event: IFunctionEvent, context: IFunctionContext) {
  const result = {
    'body': JSON.stringify(event.body),
    'content-type': event.headers["content-type"]
  }

  return context
    .status(200)
    .succeed(result)
}

export = handle
