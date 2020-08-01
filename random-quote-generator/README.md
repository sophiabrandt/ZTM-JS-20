# Random Quote Generator

The original course shows you how to build a staple of every JavaScript beginner. You fetch data from an API and render it to the screen.

My implementation consists of two parts: a **Deno back-end API** and the **front-end code in Vanilla JavaScript**.

The Deno back-end uses [Oak][oak], a middle-ware framework for Deno's http server.

I use the techniques from [Bill Sourour's Microservice API][commentsapi], an implementation of th "Clean Architecture".  
The back-end is mostly written in pure JavaScript. It was an exercise in porting the architecture over to Deno.  
The Deno back-end fetches quotes from the free [Forismatic API](https://forismatic.com/en/api/), but wraps the API call with CORS headers.

The front-end uses different styling techniques (CSS) than the original, but is functionally the same.  
I try to use the methods from [Every Layout][everylayout]/**[CUBE CSS][cubecss]**.

## Installation

You either need Deno or Docker.

There's a Makefile available which wraps all the important commands. Alternatively, you can run the [Drake][drake] commands with:

```bash
deno run -A Drakefile.ts <command>
```

## Usage

The Deno server is available at [http://localhost:3000/quotes/random](http://localhost:3000/quotes/random).

The client application is in the `/client` folder.

You can run both with `make dev-run`.  
The command is a wrapper around Docker and [pnpx/pnpm][pnpm]. Adjust to your needs.

[oak]: https://github.com/oakserver/oak
[commentsapi]: https://github.com/dev-mastery/comments-api
[drake]: https://deno.land/x/drake
[everylayout]: https://every-layout.dev/
[cubecss]: https://piccalil.li/cube-css/
[pnpm]: https://pnpm.js.org/
