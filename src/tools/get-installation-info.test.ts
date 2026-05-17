import { getInstallationInfo } from "./get-installation-info.js";
import { ACETERNITY_COMPONENTS } from "../utils/components-data.js";

describe("getInstallationInfo", () => {
  it("should return installation info for a valid component", async () => {
    const componentName = "bento-grid";
    const result = await getInstallationInfo({ componentName });

    // Check that result has the expected structure
    expect(result).toHaveProperty("installationInfo");
    expect(result).toHaveProperty("formattedSteps");

    // Check installation info properties
    expect(result.installationInfo).toHaveProperty("component");
    expect(result.installationInfo).toHaveProperty("command");
    expect(result.installationInfo).toHaveProperty("withExample");
    expect(result.installationInfo).toHaveProperty("dependencies");
    expect(result.installationInfo).toHaveProperty("steps");

    // Verify the component name matches
    expect(result.installationInfo.component).toBe(componentName);

    // Verify the command matches
    const component = ACETERNITY_COMPONENTS.find(comp => comp.name === componentName);
    expect(result.installationInfo.command).toBe(component?.installCommand);

    // Verify the withExample format
    expect(result.installationInfo.withExample).toBe(`${component?.installCommand} -e`);

    // Verify the dependencies match
    expect(result.installationInfo.dependencies).toEqual(component?.dependencies);

    // Verify the steps array
    expect(Array.isArray(result.installationInfo.steps)).toBe(true);
    expect(result.installationInfo.steps.length).toBeGreaterThan(0);

    // Check the formatted steps contains the component name
    expect(result.formattedSteps).toContain(componentName);
  });

  it("should be case insensitive when finding a component", async () => {
    const componentName = "BENTO-GRID"; // uppercase version
    const result = await getInstallationInfo({ componentName });

    expect(result.installationInfo.component).toBe("bento-grid");
  });

  it("should throw an error when component is not found", async () => {
    const componentName = "non-existent-component";

    await expect(getInstallationInfo({ componentName })).rejects.toThrow(
      `Component "${componentName}" not found`
    );
  });

  it("should return correct installation info for different valid components", async () => {
    const testComponent = ACETERNITY_COMPONENTS[1]; // Use second component as test
    const result = await getInstallationInfo({ componentName: testComponent.name });

    expect(result.installationInfo.component).toBe(testComponent.name);
    expect(result.installationInfo.command).toBe(testComponent.installCommand);
    expect(result.installationInfo.withExample).toBe(`${testComponent.installCommand} -e`);
    expect(result.installationInfo.dependencies).toEqual(testComponent.dependencies);
    expect(result.installationInfo.steps).toHaveLength(5); // 5 steps should be returned
  });

  it("should format installation steps correctly", async () => {
    const componentName = "background-beams";
    const result = await getInstallationInfo({ componentName });

    // Check that formatted steps contain expected information
    expect(result.formattedSteps).toContain(`Installation Steps for ${componentName}`);
    expect(result.formattedSteps).toContain(result.installationInfo.command);
    expect(result.formattedSteps).toContain(result.installationInfo.withExample);
    expect(result.formattedSteps).toContain(result.installationInfo.dependencies.join(", "));

    // Should include the 4 sections: Basic Installation, Install with Example, Dependencies, Setup Steps
    expect(result.formattedSteps).toContain("1. Basic Installation:");
    expect(result.formattedSteps).toContain("2. Install with Example:");
    expect(result.formattedSteps).toContain("3. Dependencies:");
    expect(result.formattedSteps).toContain("4. Setup Steps:");
  });

  it("should return installation info with exactly 5 steps", async () => {
    const componentName = "bento-grid";
    const result = await getInstallationInfo({ componentName });

    expect(result.installationInfo.steps).toHaveLength(5);
    expect(result.installationInfo.steps[0]).toBe("Run the installation command");
    expect(result.installationInfo.steps[1]).toBe("Import the component in your React/Next.js project");
    expect(result.installationInfo.steps[2]).toBe("Ensure Tailwind CSS is configured");
    expect(result.installationInfo.steps[3]).toBe("Add Framer Motion to your project if not already present");
    expect(result.installationInfo.steps[4]).toBe("Customize the component as needed");
  });
});