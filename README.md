# Nepal Area Unit Converter

A responsive web app for converting between traditional Nepali land measurement units and modern units built on HTML/CSS/JavaScript learning project.

**Live demo:** https://nepali-area-unit-conversion-8a46h1e4s-apocaloptimist.vercel.app/

## Overview

Nepal uses multiple, regionally distinct systems for measuring land area. This tool lets you enter a value in any system and see the equivalent across all of them, instantly.

### Supported unit systems

**Ropani System** (compound unit — like feet & inches)
- Ropani, Aana, Paisa, Daam
- 1 Ropani = 16 Aana = 64 Paisa = 256 Daam

**Bigha System** (compound unit)
- Bigha, Kattha, Dhur
- 1 Bigha = 20 Kattha = 400 Dhur

**Modern System**
- Square Meters, Square Feet, Hectare

## How it works

The Ropani and Bigha systems are **compound units** — similar to how "5 feet 8 inches" is one measurement split across two fields, not two separate equivalent values. Entering `5` Ropani, `6` Aana, `3` Paisa, and `1` Daam represents *one* combined land size, not four different expressions of the same amount.

Under the hood:
1. All fields within a system are summed into a common base unit (square meters).
2. That total is then broken back down into the other systems — using whole-number division and remainders (like converting total inches into feet + inches) for the compound systems, and straightforward unit conversion for the Modern system.

Conversion reference values used:
- 1 Ropani = 508.72 m²
- 1 Bigha = 6772.63 m²
- 1 Hectare = 10,000 m²
- 1 m² = 10.764 ft²

## Tech stack

- HTML5
- CSS3 (no framework — custom design)
- Vanilla JavaScript (no libraries/frameworks)
- Deployed on [Vercel](https://vercel.com)

## Project structure

```
nepal-area-converter/
├── index.html
├── style.css
└── script.js
```

## Running locally

1. Clone or download this repository.
2. Open `index.html` in a browser — or use a live-reload tool (e.g. VS Code's Live Server extension) for auto-refresh during development.

No build step, no dependencies, no installation required.

