# Vital Curiosity

Personal blog built with [Zola](https://www.getzola.org/), deployed to GitHub Pages.

## Local development

Install Zola ([instructions](https://www.getzola.org/documentation/getting-started/installation/)), then:

```sh
zola serve
```

The site will be available at `http://127.0.0.1:1111/`.

## Build

```sh
zola build
```

Static output is generated in the `public/` directory.

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions.
