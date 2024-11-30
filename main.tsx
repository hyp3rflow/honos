import { Hono } from 'hono'
import {renderToReadableStream, Suspense} from 'hono/jsx/streaming'

const app = new Hono()

app.get('/', (c) => {
  const stream = renderToReadableStream(
    <html>
      <body>
        <Suspense fallback="hi">
          <Component time={1000} />
        </Suspense>
        <Suspense fallback="hi">
          <Component time={2000} />
        </Suspense>
      </body>
    </html>
  )
  return c.body(stream, {
    headers: {
      'Content-Type': 'text/html/html; charset=UTF-8',
      'Transfer-Encoding': 'chunked'
    }
  })
})

const Component = async ({time}: {time: number}) => {
  await new Promise(r => setTimeout(r, time));
  return <div>Done!</div>
}

Deno.serve(app.fetch)
