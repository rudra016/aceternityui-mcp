import { getComponentInfo } from './get-component-info.js';
import { ACETERNITY_COMPONENTS } from '../utils/components-data.js';
import { formatComponentInfo } from '../utils/index.js';

// Create a mock for formatComponentInfo to track calls
jest.mock('../utils/index.js', () => ({
  ...jest.requireActual('../utils/index.js'),
  formatComponentInfo: jest.fn(),
}));

describe('getComponentInfo', () => {
  const mockFormatComponentInfo = formatComponentInfo as jest.MockedFunction<typeof formatComponentInfo>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return component info when component exists', async () => {
    // Choose a component from the actual data
    const testComponent = ACETERNITY_COMPONENTS[0]; // bento-grid
    mockFormatComponentInfo.mockReturnValue(`**${testComponent.name}**\n- Description: ${testComponent.description}\n- Category: ${testComponent.category}\n- Install Command: ${testComponent.installCommand}\n- Dependencies: ${testComponent.dependencies.join(", ")}\n- Tags: ${testComponent.tags.join(", ")}\n- Pro Component: ${testComponent.isPro ? "Yes" : "No"}\n`);

    const result = await getComponentInfo({ componentName: testComponent.name });

    expect(result).toEqual({
      component: testComponent,
      formattedInfo: `**${testComponent.name}**\n- Description: ${testComponent.description}\n- Category: ${testComponent.category}\n- Install Command: ${testComponent.installCommand}\n- Dependencies: ${testComponent.dependencies.join(", ")}\n- Tags: ${testComponent.tags.join(", ")}\n- Pro Component: ${testComponent.isPro ? "Yes" : "No"}\n`
    });

    expect(mockFormatComponentInfo).toHaveBeenCalledWith(testComponent);
  });

  it('should be case-insensitive when searching for component', async () => {
    const testComponent = ACETERNITY_COMPONENTS[1]; // background-beams
    
    mockFormatComponentInfo.mockReturnValue(`**${testComponent.name}**\n- Description: ${testComponent.description}\n- Category: ${testComponent.category}\n- Install Command: ${testComponent.installCommand}\n- Dependencies: ${testComponent.dependencies.join(", ")}\n- Tags: ${testComponent.tags.join(", ")}\n- Pro Component: ${testComponent.isPro ? "Yes" : "No"}\n`);

    // Test with uppercase
    const resultUpper = await getComponentInfo({ componentName: testComponent.name.toUpperCase() });
    expect(resultUpper.component).toEqual(testComponent);

    // Test with mixed case
    const resultMixed = await getComponentInfo({ componentName: testComponent.name.charAt(0).toUpperCase() + testComponent.name.slice(1).toLowerCase() });
    expect(resultMixed.component).toEqual(testComponent);

    expect(mockFormatComponentInfo).toHaveBeenCalledTimes(2);
  });

  it('should throw an error when component does not exist', async () => {
    const nonExistentComponent = 'non-existent-component';

    await expect(getComponentInfo({ componentName: nonExistentComponent })).rejects.toThrow(
      `Component "${nonExistentComponent}" not found`
    );

    expect(mockFormatComponentInfo).not.toHaveBeenCalled();
  });

  it('should return correct formatted info for a known component', async () => {
    const testComponent = ACETERNITY_COMPONENTS.find(comp => comp.name === 'bento-grid')!;
    const expectedFormattedInfo = `**${testComponent.name}**
- Description: ${testComponent.description}
- Category: ${testComponent.category}
- Install Command: ${testComponent.installCommand}
- Dependencies: ${testComponent.dependencies.join(", ")}
- Tags: ${testComponent.tags.join(", ")}
- Pro Component: ${testComponent.isPro ? "Yes" : "No"}

`;

    mockFormatComponentInfo.mockReturnValue(expectedFormattedInfo);

    const result = await getComponentInfo({ componentName: 'bento-grid' });

    expect(result.component).toEqual(testComponent);
    expect(result.formattedInfo).toBe(expectedFormattedInfo);
    expect(mockFormatComponentInfo).toHaveBeenCalledWith(testComponent);
  });

  it('should work with a component that has documentation property', async () => {
    // Find a component that has documentation
    const componentWithDocs = ACETERNITY_COMPONENTS.find(comp => comp.documentation !== undefined)!;
    if (!componentWithDocs) {
      // If no component with documentation is found, create a mock for the test
      const mockComponent = {
        ...ACETERNITY_COMPONENTS[0],
        documentation: "https://example.com/docs"
      };
      
      mockFormatComponentInfo.mockReturnValue(`**${mockComponent.name}**\n- Description: ${mockComponent.description}\n- Category: ${mockComponent.category}\n- Install Command: ${mockComponent.installCommand}\n- Dependencies: ${mockComponent.dependencies.join(", ")}\n- Tags: ${mockComponent.tags.join(", ")}\n- Pro Component: ${mockComponent.isPro ? "Yes" : "No"}\n`);

      const result = await getComponentInfo({ componentName: mockComponent.name });

      expect(result.component).toBeTruthy();
      expect(mockFormatComponentInfo).toHaveBeenCalledWith(result.component);
    } else {
      mockFormatComponentInfo.mockReturnValue(`**${componentWithDocs.name}**\n- Description: ${componentWithDocs.description}\n- Category: ${componentWithDocs.category}\n- Install Command: ${componentWithDocs.installCommand}\n- Dependencies: ${componentWithDocs.dependencies.join(", ")}\n- Tags: ${componentWithDocs.tags.join(", ")}\n- Pro Component: ${componentWithDocs.isPro ? "Yes" : "No"}\n`);

      const result = await getComponentInfo({ componentName: componentWithDocs.name });

      expect(result.component).toEqual(componentWithDocs);
      expect(mockFormatComponentInfo).toHaveBeenCalledWith(componentWithDocs);
    }
  });
});