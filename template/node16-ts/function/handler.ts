import { FunctionEvent, FunctionContext } from './interfaces'

async function handle(event: FunctionEvent, context: FunctionContext) {
    const result = {
        'body': JSON.stringify(event.body),
        'content-type': event.headers["content-type"]
    }

    return context
        .status(200)
        .succeed(result)
}

export = handle
