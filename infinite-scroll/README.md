# Infinite Scroll

**Infinite Scroll** is a wrapper around the [Unsplash API][unsplash] that fetches random images.

Notable Differences from the original course:

- implemented a Deno back-end that wraps the API call
- smaller functions
- CSS without media queries, see [Every Layout][everylayout]

## Installation

You'll need [Deno][deno].

Create an Unsplash developer account and retrieve your access token.  
Add the token to a new file `.env` (see [.env.example](.env.example)).

Install [denon](https://github.com/denosaurs/denon):

```bash
deno run -A Drakefile.ts denon-install
```

## Usage

Development server:

```bash
deno run -A Drakefile.ts denon
```

[deno]: https://deno.land/
[everylayout]: https://every-layout.dev/
[unsplash]: https://unsplash.com/
