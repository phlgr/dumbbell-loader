# Dumbbell Loader

Plate-loading calculator for the **Eisenlink adjustable square dumbbell** (the A030, also sold as **Zipro**) — a 4 kg screw-cap handle loaded with 1 kg and 2 kg cast-iron plates, up to 36 kg per dumbbell.

Enter the total weight you want to lift and pick one or two dumbbells; it works out the exact, balanced plate stack for each and draws it.

**Live:** https://dumbbell.gartz.dev/

## Loading rules

- Handle: 4 kg. A bare handle (no plates, no screws) is the only 4 kg load.
- Screws: 1 kg each, one per side, mandatory as soon as any plate is fitted — so a loaded dumbbell is 6 kg before plates.
- Plates: unlimited 2 kg; exactly two 1 kg (one per side) to cover an odd kilogram.
- Both sides always balanced. Max 36 kg per dumbbell (72 kg across a pair).

Single self-contained file — `index.html`, no build step or dependencies.
