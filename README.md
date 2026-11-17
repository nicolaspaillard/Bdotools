# BDO Tools

A small Angular application for Black Desert Online players. It collects a few practical utilities in one place: event tracking, trade-node distance checks, pearl item lookups, lightstone crystal data, and a character image untile helper.

## Features

- Home dashboard with upcoming in-game events and date-based timeline
- Trade calculator for comparing node distances from a selected source location
- Pearl item search for outfit and pet listings from recent periods
- Lightstone crystal table with copyable values for quick sharing
- Untile utility to assemble character images into a combined output zip

## Tech stack

- Angular 22
- TypeScript
- OpenNG UI components
- RxJS
- JSZip for archive generation

## Project structure

```text
src/
  app/
    routes/
      home/          # event timeline dashboard
      trade/         # trade distance calculator
      pearl/         # pearl item queries
      lightstones/   # crystal list and copy helpers
      untile/        # image untile generator
    shared/          # shared services and utilities
  styles.css
```

## Notes

- Most data is loaded from the external BDO API at `https://bdoapi.nicolaspaillard.fr/`.
- Some features rely on browser APIs such as Clipboard and FileReader.
- The app uses local storage for a few UI preferences, including the untile background and ordering.
