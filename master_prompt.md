# Master Prompt: Redesign My Developer Portfolio into a Luxury, Premium Digital Experience

## 1. Your Role

Act as a senior product designer, award-winning digital art director, senior frontend engineer, and design systems architect.

Your task is to redesign and implement my existing portfolio website:

**Website:** https://mustafatawab.vercel.app/

I am Mustafa Tawab, a Software Engineer and Product Builder working with modern web technologies, SaaS products, and AI-powered solutions.

I want my portfolio to feel like a **luxury, premium, highly polished digital experience for a modern software engineer and AI product builder**.

This is a real production website redesign, not a conceptual mockup, static prototype, or superficial CSS refresh.

You must inspect the existing repository, understand its architecture and content, and implement the redesign directly in the codebase.

Your final work should demonstrate exceptional visual design, consistent branding, thoughtful interactions, responsive layouts, and production-quality engineering.

---

## 2. The Core Design Vision

The visual identity must align with my LinkedIn branding, particularly my existing profile portrait and banner.

My branding uses:

- Deep, almost-black emerald-green backgrounds.
- Rich forest-green and teal undertones.
- Vivid emerald and turquoise-green highlights.
- Clean white typography.
- Subtle luminous gradients.
- Elegant abstract curves, fine lines, and restrained technical details.
- A professional portrait against a deep green gradient.

Use these existing branding assets as visual references:

- `Professional Portrait on Green Gradient(1).png`
- `Mustafa Tawab Tech Portfolio Banner(1).png`

Locate these assets in the repository or use their existing project equivalents if already present. Do not assume their current file paths; inspect the repository first.

### The intended impression

When someone opens the website, they should immediately perceive:

1. A serious software engineer with strong technical capabilities.
2. A product builder who can turn ideas into polished, working products.
3. Someone experienced in modern web technologies and AI-powered applications.
4. A professional with a recognizable, coherent personal brand.
5. A portfolio that feels deliberately designed, sophisticated, and memorable.

The experience should combine the restraint of a luxury editorial website with the precision of a premium technology product.

**Think: sophisticated creative direction, exceptional typography, deliberate negative space, rich emerald lighting, precise alignment, and carefully executed interactions.**

Do not make it look like a generic developer portfolio template, a gaming dashboard, a cyberpunk landing page, or an overdecorated AI-generated website.

---

## 3. Mandatory Color System: Emerald & Bone

Use the following design tokens as the source of truth. Adapt the existing CSS variables rather than introducing an unrelated palette.

### Light theme

The light theme should feel editorial, warm, clean, and expensive.

| Semantic role        | HEX       |
| -------------------- | --------- |
| Main background      | `#F7F6F2` |
| Main surface         | `#FFFFFF` |
| Secondary surface    | `#EFECE6` |
| Elevated surface     | `#FFFFFF` |
| Primary text         | `#14201B` |
| Secondary text       | `#3F4D46` |
| Muted text           | `#66736C` |
| Primary emerald      | `#047857` |
| Primary hover        | `#065F46` |
| Soft emerald surface | `#E3F3EC` |
| Light accent         | `#087F5B` |
| Accent hover         | `#066747` |
| Border               | `#E7E5DE` |
| Strong border        | `#D8D5CC` |
| Focus ring           | `#047857` |

### Dark theme

The dark theme is the signature brand experience and should closely match the atmosphere of my LinkedIn banner.

| Semantic role           | HEX       |
| ----------------------- | --------- |
| Main background         | `#06130F` |
| Main surface            | `#0C1D17` |
| Secondary surface       | `#132A20` |
| Elevated surface        | `#132A20` |
| Primary text            | `#F2F7F4` |
| Secondary text          | `#B4C8BE` |
| Muted text              | `#91A99C` |
| Primary emerald         | `#00D6A0` |
| Primary hover           | `#00E6AD` |
| Dark primary foreground | `#03251B` |
| Accent emerald          | `#35E6B4` |
| Accent hover            | `#70F0CC` |
| Border                  | `#254438` |
| Strong border           | `#355746` |
| Focus ring              | `#35E6B4` |

### Color usage rules

- Emerald is the primary brand color.
- Bone/off-white defines the light theme.
- Deep emerald-black defines the dark theme.
- Bright emerald is reserved for emphasis and interaction.
- Use gradients to create depth, not as a substitute for composition.
- Use subtle translucent emerald layers where they improve hierarchy.
- Keep text contrast high.
- Use muted green-gray colors for secondary information.
- Keep status colors such as success, warning, and error semantically distinct from the brand accent.

Do not introduce gold, brass, electric blue, purple, or unrelated accent colors as major parts of the design.

Do not use vivid emerald on every component. The visual impact comes from contrast between dark negative space and carefully positioned luminous details.

### Important implementation requirement

The existing stylesheet contains both semantic variables and Tailwind `@theme` variables, including duplicate light and dark definitions.

Inspect the existing implementation and ensure all relevant tokens remain synchronized.

Components using `--primary`, `--color-primary`, `--color-brand`, `--accent`, `--color-accent`, and related tokens must render consistently.

Do not simply append duplicate CSS overrides and leave conflicting values in place. Establish a coherent, maintainable design-token system.

---

## 4. Design Language: What Premium Actually Means

Premium does not mean adding more gradients, rounded cards, shadows, animations, or glowing borders.

It means making deliberate decisions about hierarchy, typography, spacing, composition, contrast, and detail.

### Follow these principles

**Composition**

- Use a clear visual hierarchy.
- Give important content room to breathe.
- Avoid cramped layouts and unnecessarily dense sections.
- Use asymmetrical compositions where they improve visual interest.
- Make each major section feel intentionally art-directed.

**Typography**

- Use Plus Jakarta Sans for headings and display typography.
- Use Inter for body text and interface elements.
- Preserve the existing Urdu font support.
- Establish a consistent type scale for headings, paragraphs, labels, metadata, and buttons.
- Use large, confident headlines without excessive font sizes.
- Use controlled line lengths and deliberate line breaks.
- Avoid overly bold typography everywhere.

**Spacing**

- Establish a consistent spacing scale.
- Use generous section spacing on desktop.
- Maintain comfortable spacing on mobile.
- Align content to a consistent grid.
- Avoid arbitrary margins and inconsistent padding.

**Surfaces**

- Use restrained borders and subtle changes in surface color.
- Avoid placing every element inside its own card.
- Use cards when they improve grouping, not as a default layout mechanism.
- Prefer elegant editorial layouts over repetitive grids when appropriate.

**Depth**

- Use soft radial emerald gradients selectively.
- Use subtle shadows and translucent layers where appropriate.
- Keep decorative lighting away from important text.
- Avoid excessive blur, glow, glassmorphism, and animated background effects.

**Consistency**

- Every page must belong to the same visual system.
- Shared components should behave and look consistently.
- Project, case-study, and blog detail pages must receive the same level of design attention as the homepage.

---

## 5. Repository Audit Before Implementation

Before making changes, inspect the existing codebase.

Identify:

- Framework and application architecture.
- Package manager and installed dependencies.
- Routing configuration.
- All public routes and dynamic routes.
- Homepage sections and reusable components.
- Project data and project detail pages.
- Case-study data and case-study detail pages.
- Blog data and blog detail pages.
- Existing images, thumbnails, illustrations, and other assets.
- Existing CSS, Tailwind configuration, design tokens, and fonts.
- Light/dark theme implementation and persistence.
- Navigation, dropdowns, mobile menus, and theme controls.
- Forms, contact integrations, social links, and external links.
- SEO metadata and structured data.
- Any existing internationalization or Urdu-language functionality.
- Current build, lint, type-check, and test commands.

Do not assume the project uses a particular routing or content architecture. Discover the actual implementation.

Preserve existing content, meaningful URLs, integrations, and working functionality unless a change is necessary and justified.

Do not replace real portfolio content with invented projects, fabricated achievements, fake testimonials, or placeholder statistics.

After the audit, proceed with implementation. Do not stop at a written proposal.

---

## 6. Global Navigation and Site Shell

Create a sophisticated, consistent navigation experience.

Requirements:

- A refined personal wordmark or text-based identity using my name.
- Clear navigation to the existing main sections.
- A visually polished active-route state.
- A working light/dark theme toggle.
- A mobile navigation menu with accessible interactions.
- A clear contact action.
- Appropriate sticky or fixed behavior if it improves the experience.
- Subtle borders, translucency, or background transitions where useful.

The navigation should feel integrated into the page, not like a generic component copied from a template.

Avoid unnecessarily tall headers, oversized navigation pills, and excessive blur.

Ensure the navigation works correctly on every route and at every supported screen size.

---

## 7. Homepage Redesign

The homepage should communicate my identity, capabilities, work, and value proposition within seconds.

### A. Hero section

This is the most important section.

Create an immersive, premium hero inspired by my LinkedIn banner.

Use:

- A deep emerald-black background in dark mode.
- A warm editorial background in light mode.
- My real profile portrait when appropriate.
- White or dark forest-green typography depending on the theme.
- Emerald-highlighted text.
- Carefully controlled radial gradients.
- Subtle abstract curved lines or fine technical details inspired by the banner.
- A confident headline.
- A concise description grounded in my actual experience.
- Clear calls to action.

Use the existing identity:

**Mustafa Tawab — Software Engineer · Product Builder**

The existing positioning includes:

**Building scalable software, SaaS, and AI-powered solutions.**

You may refine the wording to fit the design, but do not invent expertise or claims that the repository does not support.

The hero should answer:

- Who am I?
- What do I build?
- What distinguishes my approach?
- Where should a visitor go next?

Use a deliberate layout rather than centering everything by default.

If the portrait is used, integrate it naturally into the composition. Do not add an exaggerated glow, oversized circular border, or distracting decorative frame.

### B. Selected projects

Create an editorial-quality presentation of my strongest existing projects.

Each project should have:

- A clear title.
- A concise, accurate description.
- Relevant technology labels.
- A strong project thumbnail or screenshot when available.
- An appropriate link to the existing project detail page or external project.
- A polished hover and focus state.

Use a mixture of image-led layouts, asymmetrical compositions, and restrained borders where appropriate.

Do not make every project card visually identical if the content supports more interesting compositions.

### C. About and capabilities

Present my actual background and technical strengths in a clean, structured layout.

Use existing content and experience as the source of truth.

Avoid generic marketing copy and long, unstructured paragraphs.

### D. Experience and technical expertise

Where these sections already exist, refine their presentation.

Use clear hierarchy and compact metadata. Avoid turning the entire section into a dashboard of badges, logos, or progress bars.

Do not invent skill proficiency percentages.

### E. Case studies

Present case studies as substantive engineering work, not just another grid of cards.

Show meaningful summaries and link to the corresponding detail pages.

### F. Blog and writing

Present existing articles with readable titles, publication metadata, and restrained visual treatment.

### G. Contact and footer

Create a deliberate closing section with a clear next step, functional links, and a polished footer.

Use the brand colors consistently without turning the contact section into a giant glowing panel.

---

## 8. Project Listing Pages

Redesign the existing projects index route.

Requirements:

- A strong page heading and concise introduction.
- A clean and responsive project layout.
- Appropriate filtering or categorization if the existing content supports it.
- High-quality project thumbnails and previews.
- Consistent spacing, typography, metadata, and link treatment.
- Empty states where necessary.
- Functional navigation to project detail pages.

Do not invent filters that cannot work with the actual project data.

The page should feel like a curated engineering portfolio rather than an automatically generated catalog.

---

## 9. Individual Project Detail Pages

Every project detail page must receive a complete, intentional design.

Do not redesign only the project listing while leaving the detail pages untouched.

Inspect all existing dynamic routes and slugs before implementing the template.

Each detail page should use the real available project content and may include:

- Project title and concise summary.
- Project role and relevant metadata.
- Hero screenshot, product preview, or existing visual asset.
- Problem and context.
- Approach and implementation.
- Key technical decisions.
- Relevant architecture or feature details.
- Screenshots or galleries where assets exist.
- Technology stack.
- Outcomes and lessons where supported by the content.
- Live demo and source repository links when available.
- Previous/next project navigation if appropriate.
- A clear path back to the projects listing.

Only render sections supported by the actual content. Do not fabricate metrics, business outcomes, or technical details to fill empty space.

Use an editorial case-study-like layout with comfortable reading widths, deliberate headings, and well-presented screenshots.

---

## 10. Case Study Listing and Detail Pages

Treat case studies as a separate content type from ordinary project cards when the existing architecture and content support that distinction.

### Listing page

Include:

- A strong introduction.
- A curated, visually consistent list or grid.
- Meaningful summaries.
- Clear links to each case study.
- Relevant imagery and metadata where available.

### Individual case study pages

Create a reusable detail template that supports the actual content structure.

Potential sections include:

- Overview.
- Context and problem.
- Constraints and requirements.
- My role.
- Research or discovery.
- Solution and design decisions.
- Architecture and implementation.
- Important trade-offs.
- Results, if documented.
- Lessons learned.
- Related work.

Do not force every case study to contain sections for which no content exists.

Give technical diagrams, screenshots, code examples, and other available materials enough space to be useful.

Keep the reading experience polished and accessible.

---

## 11. Blog Listing and Article Detail Pages

Redesign the existing blog index and individual article pages.

### Blog listing

Use:

- Clear typography.
- Well-presented article titles.
- Readable summaries.
- Publication dates and categories where available.
- Thoughtful whitespace.
- A responsive editorial layout.

Avoid oversized card grids that make article discovery feel like shopping.

### Individual articles

Prioritize readability over decoration.

Implement:

- A clear article title and introduction.
- Author and publication metadata where available.
- A controlled reading width.
- Proper heading hierarchy.
- Readable paragraphs and lists.
- Styled links, blockquotes, inline code, and code blocks.
- Responsive images and captions where appropriate.
- Table-of-contents support when useful for longer articles.
- Related articles where supported.
- Previous/next navigation where appropriate.

Preserve existing article content and formatting.

Do not truncate, rewrite, or replace article content just to fit a new layout.

Ensure that syntax highlighting and code overflow behave correctly on mobile.

---

## 12. One Cohesive Design System Across All Pages

Build reusable components and templates instead of implementing every page independently.

Use the project's existing architecture where practical.

Establish consistent shared patterns for:

- Navigation.
- Theme switching.
- Page containers.
- Section headings.
- Buttons and links.
- Project previews.
- Article metadata.
- Detail-page headers.
- Image galleries.
- Technology labels.
- Breadcrumbs where useful.
- Contact sections.
- Footer.
- Loading, error, and empty states.

Create separate templates for project details, case studies, and blog articles where their content structures differ.

The design system must support both themes without requiring duplicated page implementations.

Avoid unnecessary abstraction. The architecture should remain easy to maintain and extend.

---

## 13. Motion and Interaction

Use motion to reinforce hierarchy and provide feedback.

Appropriate examples:

- Subtle hero content entrance.
- Gentle reveal effects for selected sections.
- Refined button and link transitions.
- Image transitions on project cards.
- Smooth theme changes.
- Understated navigation indicators.
- Subtle background movement only where it materially improves the experience.

Keep animations restrained and purposeful.

Avoid:

- Continuous large background animations.
- Aggressive parallax.
- Constantly moving gradients.
- Excessive cursor effects.
- Distracting particle systems.
- Long entrance animations.
- Animations that delay access to important content.

Use the existing animation infrastructure when appropriate.

Respect `prefers-reduced-motion`.

Ensure the site remains usable when animations are disabled or JavaScript is unavailable where relevant.

---

## 14. Dark and Light Themes

Both themes are required and must be treated as first-class designs.

Dark mode should express the signature emerald brand.

Light mode should express the same identity through bone-colored surfaces and forest-green accents.

Requirements:

- Every route must render correctly in both themes.
- All cards, borders, buttons, forms, menus, code blocks, and metadata must use the correct tokens.
- No hardcoded colors should accidentally break the active theme.
- The theme toggle must work.
- Persist theme preference using the existing application mechanism where available.
- Avoid flashes of the wrong theme during initial rendering.
- Respect the user's system preference when appropriate.
- Verify focus indicators and contrast in both modes.

Do not simply invert colors. Design each theme intentionally.

---

## 15. Responsive Design

The experience must work on:

- Small mobile phones.
- Larger phones.
- Tablets.
- Laptops.
- Large desktop monitors.

Requirements:

- Responsive typography.
- Appropriate container widths.
- No horizontal overflow.
- Carefully controlled hero composition.
- Proper portrait cropping.
- Readable article widths.
- Responsive project imagery.
- Touch-friendly controls.
- Navigation that works on small screens.
- Consistent spacing at every breakpoint.

On mobile, preserve the identity and hierarchy of the desktop design rather than merely stacking every element vertically.

Test real responsive behavior instead of assuming that responsive utility classes are sufficient.

---

## 16. Asset and Image Quality

Prioritize existing authentic portfolio assets.

Use real project screenshots and imagery wherever available.

For the profile portrait:

- Preserve natural proportions.
- Use an intentional crop.
- Avoid unnecessary filters or visual effects.
- Ensure the image works against both themes.

For the banner-inspired graphics:

- Reproduce the visual language of the abstract emerald curves and lighting with lightweight CSS or SVG when practical.
- Keep decorative elements behind the content.
- Avoid adding large background images when simple vector shapes or gradients can achieve the same result.
- Ensure decorative elements do not interfere with text contrast.

Optimize images and avoid unnecessarily large assets.

Use appropriate image dimensions, responsive sizing, lazy loading below the fold, and useful alternative text.

Do not use generic stock imagery to fill gaps when genuine project assets are available.

---

## 17. Technical Requirements

Preserve and improve the existing technical architecture.

Requirements:

- Keep the existing framework unless there is a compelling reason to change it.
- Reuse installed dependencies where practical.
- Avoid adding large libraries for trivial visual effects.
- Preserve all valid existing routes and deep links.
- Keep content data separate from reusable presentation components where appropriate.
- Preserve existing API integrations and working functionality.
- Keep components maintainable and type-safe.
- Avoid unnecessary client-side JavaScript.
- Optimize rendering performance.
- Avoid layout shifts.
- Maintain stable image dimensions.
- Avoid hydration errors.
- Avoid console errors and React warnings.

Use semantic HTML and accessible interaction patterns.

Do not add decorative complexity at the expense of performance or maintainability.

---

## 18. Accessibility and SEO

Implement or preserve:

- Semantic landmarks.
- Logical heading hierarchy.
- Keyboard-accessible navigation.
- Visible focus indicators.
- Sufficient color contrast.
- Accessible names for icon-only buttons.
- Accessible theme controls.
- Appropriate alternative text.
- Correct link semantics.
- Reduced-motion support.
- Descriptive page titles and meta descriptions.
- Canonical URLs where appropriate.
- Open Graph metadata.
- Structured data where appropriate and factually supported.
- Existing sitemap and robots configuration.
- Proper handling of not-found routes.

Do not sacrifice accessibility for visual effects.

---

## 19. Contact and Existing Functionality

Audit the existing contact form, social links, external project links, navigation, filters, theme controls, and other interactive features.

Preserve working functionality.

If a form currently submits to an API or third-party service, preserve that integration.

Do not replace working functionality with a visually attractive but nonfunctional component.

Ensure:

- Forms validate correctly.
- Submission and error states are clear.
- External links work.
- Buttons perform their advertised actions.
- Mobile menus open and close correctly.
- Theme switching works on every route.
- Dynamic route parameters resolve correctly.

Never claim that a feature works unless you have tested it.

---

## 20. Implementation Workflow

Follow this workflow.

### Phase 1 — Audit

Inspect the repository, routes, content, assets, components, CSS tokens, and current functionality.

### Phase 2 — Design system

Establish the final semantic tokens, theme architecture, typography scale, layout primitives, buttons, borders, and reusable components.

Resolve duplicate and conflicting CSS variable definitions.

### Phase 3 — Global shell

Implement the navigation, theme toggle, page container, shared spacing, global typography, and footer.

### Phase 4 — Homepage

Build the hero and remaining homepage sections with the intended emerald visual identity.

### Phase 5 — Content pages

Redesign the project listing, every project detail template, the case-study listing and detail templates, and the blog listing and article templates.

### Phase 6 — Responsive and interaction refinement

Verify mobile navigation, theme switching, hover and focus states, responsive images, animations, and accessibility.

### Phase 7 — Validation

Run the project's available checks, including:

- Production build.
- Linting.
- Type checking.
- Existing tests.
- Route-level verification.
- Browser testing where available.

Inspect actual rendered pages at desktop and mobile sizes in both light and dark themes.

Take screenshots when browser tooling is available and use them to identify visual defects.

Fix the defects you find rather than merely reporting them.

Do not stop after the homepage looks good.

---

## 21. Definition of Done

The task is complete only when:

- The portfolio has a cohesive luxury emerald visual identity.
- The design aligns with my LinkedIn banner and profile branding.
- Light mode and dark mode both feel intentional and polished.
- The homepage communicates my professional identity clearly.
- Project listing and detail pages are redesigned.
- Case-study listing and detail pages are redesigned.
- Blog listing and article pages are redesigned.
- All existing meaningful routes remain functional.
- Real content is preserved.
- Existing integrations continue to work.
- The site is responsive.
- Accessibility and contrast have been checked.
- The build and available checks pass, or any remaining failures are explicitly documented.
- No obvious visual regressions remain.
- The implementation is maintainable and production-ready.

## 22. Final Report

When finished, provide a concise implementation report containing:

1. The main design changes.
2. The color-token and theme changes.
3. The routes and page templates redesigned.
4. Important components created or refactored.
5. Accessibility and responsive improvements.
6. Tests and validation commands executed, with actual results.
7. Any remaining limitations or issues.
8. Any functionality that could not be verified.

**Final instruction:** Do not merely describe what you would build. Inspect the existing project, make the changes in the repository, validate the result, and report what was actually implemented.

The final experience must feel like a carefully art-directed personal brand for a serious software engineer and AI product builder: dark emerald depth, refined typography, restrained luminous accents, exceptional spacing, high-quality project presentation, and consistency across every page.
