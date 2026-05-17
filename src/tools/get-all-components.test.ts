import { getAllComponents } from "./get-all-components.js";

// Mock the module directly with the components data
jest.mock("../utils/components-data.js", () => ({
  ACETERNITY_COMPONENTS: [
    {
      name: "Button",
      description: "A simple button component",
      category: "Form",
      installCommand: "npm install button-component",
      isPro: false
    },
    {
      name: "Modal",
      description: "A modal dialog component",
      category: "Overlay",
      installCommand: "npm install modal-component",
      isPro: true
    },
    {
      name: "Input",
      description: "An input field component",
      category: "Form",
      installCommand: "npm install input-component",
      isPro: false
    },
    {
      name: "AdvancedChart",
      description: "A complex charting component",
      category: "Data",
      installCommand: "npm install advanced-chart-component",
      isPro: true
    }
  ]
}));

describe("getAllComponents", () => {
  it("should return all components when includeProOnly is true", async () => {
    const result = await getAllComponents({ includeProOnly: true });

    expect(result.total).toBe(4); // Total components in mock
    expect(result.components).toHaveLength(4);
    expect(result.components).toEqual([
      {
        name: "Button",
        description: "A simple button component",
        category: "Form",
        installCommand: "npm install button-component",
        isPro: false
      },
      {
        name: "Modal",
        description: "A modal dialog component",
        category: "Overlay",
        installCommand: "npm install modal-component",
        isPro: true
      },
      {
        name: "Input",
        description: "An input field component",
        category: "Form",
        installCommand: "npm install input-component",
        isPro: false
      },
      {
        name: "AdvancedChart",
        description: "A complex charting component",
        category: "Data",
        installCommand: "npm install advanced-chart-component",
        isPro: true
      }
    ]);
  });

  it("should return only non-pro components when includeProOnly is false", async () => {
    const result = await getAllComponents({ includeProOnly: false });

    expect(result.total).toBe(2); // Only non-pro components
    expect(result.components).toHaveLength(2);
    expect(result.components.every(comp => !comp.isPro)).toBe(true);
    expect(result.components).toEqual([
      {
        name: "Button",
        description: "A simple button component",
        category: "Form",
        installCommand: "npm install button-component",
        isPro: false
      },
      {
        name: "Input",
        description: "An input field component",
        category: "Form",
        installCommand: "npm install input-component",
        isPro: false
      }
    ]);
  });

  it("should correctly format the list when includeProOnly is true", async () => {
    const result = await getAllComponents({ includeProOnly: true });

    expect(result.formattedList).toContain("- **Button** (Form): A simple button component");
    expect(result.formattedList).toContain("- **Modal** (Overlay): A modal dialog component");
    expect(result.formattedList).toContain("- **Input** (Form): An input field component");
    expect(result.formattedList).toContain("- **AdvancedChart** (Data): A complex charting component");
  });

  it("should correctly format the list when includeProOnly is false", async () => {
    const result = await getAllComponents({ includeProOnly: false });

    expect(result.formattedList).toContain("- **Button** (Form): A simple button component");
    expect(result.formattedList).toContain("- **Input** (Form): An input field component");
    expect(result.formattedList).not.toContain("- **Modal** (Overlay): A modal dialog component");
    expect(result.formattedList).not.toContain("- **AdvancedChart** (Data): A complex charting component");
  });

  it("should default to includeProOnly: false when no arguments are provided", async () => {
    const result = await getAllComponents({});

    expect(result.total).toBe(2); // Only non-pro components
    expect(result.components).toHaveLength(2);
    expect(result.components.every(comp => !comp.isPro)).toBe(true);
  });

  it("should default to includeProOnly: false when undefined is passed", async () => {
    const result = await getAllComponents({ includeProOnly: undefined });

    expect(result.total).toBe(2); // Only non-pro components
    expect(result.components).toHaveLength(2);
    expect(result.components.every(comp => !comp.isPro)).toBe(true);
  });
});