import { AceternityComponent, ComponentCategory } from "../types/index.js";

export const ACETERNITY_COMPONENTS: AceternityComponent[] = [
  {
    name: "bento-grid",
    description: "A responsive grid layout component with modern design",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json",
    dependencies: ["motion", "tailwindcss",  "clsx", "tailwind-merge"],
    tags: ["grid", "layout", "responsive", "bento"],
    isPro: false,
    documentation: "https://ui.aceternity.com/components/bento-grid"
  },
  {
    name: "background-beams",
    description: "Animated background beams with collision effects",
    category: "background",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/background-beams.json",
    dependencies: ["motion", "tailwindcss",  "clsx", "tailwind-merge"],
    tags: ["background", "animation", "beams", "effects"],
    isPro: false,
    documentation: "https://ui.aceternity.com/components/background-beams"
  },
  {
    name: "expandable-cards",
    description: "Click cards to expand them and show additional information",
    category: "cards",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/expandable-card-demo-standard.json https://ui.aceternity.com/registry/expandable-card-demo-grid.json",
    dependencies: ["motion", "tailwindcss",  "clsx", "tailwind-merge"],
    tags: ["cards", "expandable", "interactive", "animation"],
    isPro: false
  },
  {
    name: "floating-dock",
    description: "A floating dock mac os style component, acts as a navigation bar",
    category: "navigation",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/floating-dock.json",
    dependencies: ["motion", "tailwindcss",  "clsx", "tailwind-merge"],
    tags: ["dock", "navigation", "macos", "floating"],
    isPro: false
  },
  {
    name: "focus-cards",
    description: "Hover over the card to focus on it, blurring the rest of the cards",
    category: "cards",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/focus-cards.json",
    dependencies: ["motion", "tailwindcss",  "clsx", "tailwind-merge"],
    tags: ["cards", "focus", "hover", "blur"],
    isPro: false
  },
  {
    name: "file-upload",
    description: "A minimal file upload form with background grid, drag and drop, and micro interactions.",
    category: "form",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/file-upload.json",
    dependencies: ["motion", "tailwindcss",  "clsx", "tailwind-merge"],
    tags: ["form", "upload", "drag-drop", "file"],
    isPro: false
  },
  {
    name: "hero",
    description: "A set of hero sections ranging from simple to complex layouts",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/hero-section-demo-1.json",
    dependencies: ["motion", "clsx", "tailwind-merge", "@tabler/icons-react", "cobe"],
    tags: ["hero", "landing", "hero-section", "banner"],
    isPro: false
  },
  {
    name: "signup-form",
    description: "A customizable form built on top of shadcn's input and label, with a touch of framer motion",
    category: "form",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/signup-form-demo.json",
    dependencies: ["motion", "tailwindcss", "@radix-ui/react-label", "@tabler/icons-react",  "clsx", "tailwind-merge"],
    tags: ["form", "signup", "authentication", "input"],
    isPro: false
  },
  {
    name: "timeline",
    description: "A timeline component with sticky header and scroll beam follow.",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/timeline.json",
    dependencies: ["motion", "@tabler/icons-react", "clsx", "tailwind-merge"],
    tags: ["timeline", "chronological", "events", "history"],
    isPro: false
  },
  {
    name: "world-map",
    description: "A world map with animated lines and dots, programatically generated.",
    category: "map",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/world-map.json",
    dependencies: ["motion", "dotted-map", "clsx", "tailwind-merge"],
    tags: ["map", "world", "geography", "animation"],
    isPro: false
  },
  {
    name: "feature-section",
    description: "A set of feature sections ranging from bento grids to simple layouts",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/features-section-demo-1.json https://ui.aceternity.com/registry/features-section-demo-2.json https://ui.aceternity.com/registry/features-section-demo-3.json",
    dependencies: ["motion", "clsx", "tailwind-merge", "@tabler/icons-react", "cobe"],
    tags: ["card", "feature", "bento-grid"],
    isPro: false
  },
  {
    name: "sidebar",
    description: "Expandable sidebar that expands on hover, mobile responsive and dark mode support",
    category: "sidebar",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/sidebar.json",
    dependencies: ["motion", "clsx", "tailwind-merge", "@tabler/icons-react"],
    tags: ["sidebar", "special", "utilities", "dashboard"],
    isPro: false
  },
  {
    name: "resizable-navbar",
    description: "A navbar that changes width on scroll, responsive and animated.",
    category: "navbar",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/resizable-navbar.json",
    dependencies: ["motion", "clsx", "tailwind-merge", "@tabler/icons-react"],
    tags: ["navbar", "responsive", "navigation", "layout"],
    isPro: false
  },
  {
    name: "loader",
    description: "A set of simple and minimal loaders for your loading screens and components.",
    category: "loader",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/loader.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["loading", "loaders", "loader"],
    isPro: false
  },
  {
    name: "layout-grid",
    description: "A layout effect that animates the grid item on click, powered by framer motion layout.",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/layout-grid.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["section", "features", "product", "special"],
    isPro: false
  },
  {
    name: "hero-highlight",
    description: "A background effect with a text highlight component, perfect for hero sections.",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/hero-highlight.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["hero", "section", "special", "text", "background"],
    isPro: false
  },
  {
    name: "animated-tooltip",
    description: "A cool tooltip that reveals on hover, follows mouse pointer",
    category: "layout",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/animated-tooltip.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["card", "cover", "special", "utility"],
    isPro: false
  },
  {
    name: "container-cover",
    description: "A Cover component that wraps any children, providing beams and space effect, hover to reveal speed.",
    category: "container",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/cover.json",
    dependencies: ["motion", "clsx", "tailwind-merge", "@tsparticles/react", "@tsparticles/engine", "@tsparticles/slim"],
    tags: ["features", "special", "highlight"],
    isPro: false
  },
  {
    name: "placeholder-and-vanish-input",
    description: "Sliding in placeholders and vanish effect of input on submit",
    category: "container",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/placeholders-and-vanish-input.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["utility", "form", "section", "special"],
    isPro: false
  },
  {
    name: "animated-tabs",
    description: "Tabs to switch content, click on a tab to check background animation.",
    category: "container",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/tabs.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["hero", "feature", "product", "utility"],
    isPro: false
  },
  {
    name: "text-generate-effect",
    description: "A cool text effect that fades in text on page load, one by one.",
    category: "text",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/text-generate-effect.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["text", "content", "hero", "section", "special"],
    isPro: false
  },
  {
    name: "text-hover-effect",
    description: "A text hover effect that animates and outlines gradient on hover, as seen on x.ai.",
    category: "text",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/text-hover-effect.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["text", "content", "hero", "section", "special"],
    isPro: false
  },
  {
    name: "typewriter-effect",
    description: "Text generates as if it is being typed on the screen.",
    category: "text",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/typewriter-effect.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["text", "content", "hero", "section", "special"],
    isPro: false
  },
  {
    name: "text-reveal-card",
    description: "Mousemove effect to reveal text content at the bottom of the card.",
    category: "card",
    installCommand: "npx shadcn@latest add https://ui.aceternity.com/registry/text-reveal-card.json",
    dependencies: ["motion", "clsx", "tailwind-merge"],
    tags: ["map", "world", "geography", "animation"],
    isPro: false
  },
];

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    name: "layout",
    components: [
      "bento-grid", "hero", "timeline", "feature-section", "layout-grid", "hero-highlight", "animated-tooltip"
    ],
    description: "Layout and structural components"
  },
  {
    name: "cards",
    components: [
      "expandable-cards", "focus-cards"
    ],
    description: "Card-based components with various interactions"
  },
  {
    name: "form",
    components: [
      "file-upload", "signup-form"
    ],
    description: "Form components and input elements"
  },
  {
    name: "navigation",
    components: [
      "floating-dock", "resizable-navbar"
    ],
    description: "Navigation and menu components"
  },
  {
    name: "background",
    components: [
      "background-beams", "hero-highlight"
    ],
    description: "Background effects and animations"
  },
  {
    name: "utilities",
    components: [
      "loader", "placeholder-and-vanish-input"
    ],
    description: "Utility components for enhanced functionality"
  },
  {
    name: "map",
    components: [
      "world-map"
    ],
    description: "Map and geographical components"
  },
  {
    name: "sidebar",
    components: [
      "sidebar"
    ],
    description: "Sidebar and dashboard components"
  },
  {
    name: "container",
    components: [
      "container-cover", "animated-tabs"
    ],
    description: "Container and tab components"
  },
  {
    name: "text",
    components: [
      "text-generate-effect", "text-hover-effect", "typewriter-effect"
    ],
    description: "Text and content effects"
  },
  {
    name: "card",
    components: [
      "text-reveal-card"
    ],
    description: "Card reveal and animation components"
  },
];
