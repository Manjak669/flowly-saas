# Flowly — SaaS Landing Page

A high-converting dark landing page for a fictional productivity SaaS: animated product preview, pricing with billing toggle, FAQ and early-access signup.

> Demo project by **[MoonWave](https://moonwave-studio.com)**. The business is fictional and the forms don't send anything.

**Live demo:** _coming soon_

![Desktop](docs/screenshots/desktop.png)

<p align="center"><img src="docs/screenshots/mobile.png" width="300" alt="Mobile view"></p>

## Features

- Animated product mock-up built in HTML/CSS (no images) that flattens as you scroll
- Shimmering gradient headline and cursor-following spotlight on feature cards
- Monthly / yearly pricing switch (accessible role="switch")
- Early-access email form with validation
- Count-up stats, scroll-reveal sections, FAQ accordion (one open at a time)
- Fully responsive, respects prefers-reduced-motion
- SEO meta tags and Open Graph

## Tech stack

- Semantic HTML5
- Modern CSS (custom properties, grid, flexbox, `clamp()`, keyframe animations)
- Vanilla JavaScript (IntersectionObserver, no frameworks, no build step)
- Zero dependencies: loads fast and deploys anywhere

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

Static site: drag the folder into Netlify, or connect this repo with no build command and `.` as the publish directory.

## Want a site like this?

I build fast, animated websites for small businesses and startups.

- Studio: [moonwave-studio.com](https://moonwave-studio.com)
- Hire me on [Upwork](https://www.upwork.com/freelancers/~01f7f6a71cc800d79b)

---

© MoonWave. All rights reserved. See [LICENSE](LICENSE).
