# Auto suggestion select

[![react badge url]][react]

[React] component `<AutoSuggestionSelect />`, which is a non-standard select
component. It dynamically uses data from the API.

[react badge url]: https://img.shields.io/github/package-json/dependency-version/xeho91/react-component-auto-select-suggestion/react?label=React&logo=react&style=for-the-badge
[react]: https://reactjs.org/

## Motivation

This project is a challenge I made while applying for the job position in one
of the companies. Their name is not mentioned for obvious reasons. 😉

Also, I wanted to take this as **an opportunity to research the latest modern
open-source toolings for JavaScript**. Finally, this repository could be used
as an example reproduction code and testing case.

---

## Getting started

Firstly, the project uses the LTS _(Long-Term Support)_ version of [Node.js]
with the [ESM package] enabled. Also, [pnpm] package manager. If you haven't
heard about it yet, give it a try. It was a truly enchanting experience for me
and my projects.

Secondly, [ladle] is being used as an alternative to the [Storybook]. Because
it is _very_ fast and doesn't require a complex setup, it helps develop a
single or a few React components quickly.

[node.js]: https://nodejs.org/
[pnpm]: https://github.com/pnpm/pnpm
[esm package]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[ladle]: https://github.com/tajo/ladle/
[storybook]: https://github.com/storybookjs/storybook/

### Development

Use the following command to start developing:

```sh
pnpm develop
```

### Building

To build the output for the production, use:

```sh
pnpm build
```

### Serving

To serve the built output, use:

```sh
pnpm serve
```

### testing

The projest has tests! [Vitest], with [Testing Library] and [MSW.js].

There are the following scripts available:

-   for getting the **tests coverage**, use:

    ```sh
    pnpm coverage
    ```

-   **simple run of tests**, use:

    ```sh
    pnpm test
    ```

-   to **run tests in the development mode** _(watch option enabled)_, use:

    ```sh
    pnpm test:dev
    ```

-   to **run tests in Vitest' built-in UI**\_, use:

    ```sh
    pnpm test:ui
    ```

---

## Resources & inspirations

-   Blog post on [Accessible custom select dropdowns]

[accessible custom select dropdowns]: https://www.webaxe.org/accessible-custom-select-dropdowns

---

## License

[![License badge]](./LICENSE.md "Project's license")

⚖️ _**The code**_ is licensed under the [MIT license](./LICENSE.md).

[license badge]: https://img.shields.io/github/license/xeho91/react-component-auto-suggestion-select?style=for-the-badge
