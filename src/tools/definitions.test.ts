import { tools, toolHandlers } from "./definitions.js";

// Mock the handler functions since we're just testing the structure
jest.mock('./search-components.js', () => ({
  searchComponents: jest.fn()
}));

jest.mock('./get-component-info.js', () => ({
  getComponentInfo: jest.fn()
}));

jest.mock('./get-installation-info.js', () => ({
  getInstallationInfo: jest.fn()
}));

jest.mock('./list-categories.js', () => ({
  listCategories: jest.fn()
}));

jest.mock('./get-all-components.js', () => ({
  getAllComponents: jest.fn()
}));

describe('tools', () => {
  it('should have the correct number of tools', () => {
    expect(tools).toHaveLength(5);
  });

  it('should have properly structured tools', () => {
    tools.forEach((tool: any) => {
      expect(tool).toHaveProperty('name');
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(typeof tool.name).toBe('string');
      expect(typeof tool.description).toBe('string');
      expect(typeof tool.inputSchema).toBe('object');
    });
  });

  it('should have unique tool names', () => {
    const names = tools.map((tool: any) => tool.name);
    const uniqueNames = [...new Set(names)];
    expect(names).toHaveLength(uniqueNames.length);
  });

  it('should have valid inputSchema for each tool', () => {
    tools.forEach((tool: any) => {
      expect(tool.inputSchema).toHaveProperty('type');
      if (tool.inputSchema.type === 'object') {
        expect(tool.inputSchema).toHaveProperty('properties');
        expect(typeof tool.inputSchema.properties).toBe('object');
      }
    });
  });

  describe('search_components tool', () => {
    it('should have correct structure', () => {
      const tool = tools.find((t: any) => t.name === 'search_components');
      expect(tool).toBeDefined();
      expect(tool).toEqual({
        name: 'search_components',
        description: 'Search for Aceternity UI components by name, description, or tags',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query for components'
            },
            category: {
              type: 'string',
              description: 'Filter by category (optional)'
            }
          },
          required: ['query']
        }
      });
    });
  });

  describe('get_component_info tool', () => {
    it('should have correct structure', () => {
      const tool = tools.find((t: any) => t.name === 'get_component_info');
      expect(tool).toBeDefined();
      expect(tool).toEqual({
        name: 'get_component_info',
        description: 'Get detailed information about a specific Aceternity UI component',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description: 'Name of the component to get info for'
            }
          },
          required: ['componentName']
        }
      });
    });
  });

  describe('get_installation_info tool', () => {
    it('should have correct structure', () => {
      const tool = tools.find((t: any) => t.name === 'get_installation_info');
      expect(tool).toBeDefined();
      expect(tool).toEqual({
        name: 'get_installation_info',
        description: 'Get installation commands and setup instructions for a component',
        inputSchema: {
          type: 'object',
          properties: {
            componentName: {
              type: 'string',
              description: 'Name of the component to get installation info for'
            }
          },
          required: ['componentName']
        }
      });
    });
  });

  describe('list_categories tool', () => {
    it('should have correct structure', () => {
      const tool = tools.find((t: any) => t.name === 'list_categories');
      expect(tool).toBeDefined();
      expect(tool).toEqual({
        name: 'list_categories',
        description: 'List all available component categories',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      });
    });
  });

  describe('get_all_components tool', () => {
    it('should have correct structure', () => {
      const tool = tools.find((t: any) => t.name === 'get_all_components');
      expect(tool).toBeDefined();
      expect(tool).toEqual({
        name: 'get_all_components',
        description: 'Get a list of all available Aceternity UI components',
        inputSchema: {
          type: 'object',
          properties: {
            includeProOnly: {
              type: 'boolean',
              description: 'Include pro-only components (default: false)'
            }
          }
        }
      });
    });
  });
});

describe('toolHandlers', () => {
  it('should have the correct keys', () => {
    expect(toolHandlers).toHaveProperty('search_components');
    expect(toolHandlers).toHaveProperty('get_component_info');
    expect(toolHandlers).toHaveProperty('get_installation_info');
    expect(toolHandlers).toHaveProperty('list_categories');
    expect(toolHandlers).toHaveProperty('get_all_components');
  });

  it('should have schema and handler properties for each tool', () => {
    const handlerNames = Object.keys(toolHandlers);
    handlerNames.forEach(name => {
      const handler = (toolHandlers as any)[name];
      expect(handler).toHaveProperty('schema');
      expect(handler).toHaveProperty('handler');
      // Verify that schema is a Zod schema (has a _def property)
      expect(handler.schema).toHaveProperty('_def');
    });
  });

  describe('search_components handler', () => {
    it('should have correct schema and handler', () => {
      expect(toolHandlers.search_components).toBeDefined();
      expect(toolHandlers.search_components.schema).toBeDefined();
      expect(toolHandlers.search_components.handler).toBeDefined();
    });
  });

  describe('get_component_info handler', () => {
    it('should have correct schema and handler', () => {
      expect(toolHandlers.get_component_info).toBeDefined();
      expect(toolHandlers.get_component_info.schema).toBeDefined();
      expect(toolHandlers.get_component_info.handler).toBeDefined();
    });
  });

  describe('get_installation_info handler', () => {
    it('should have correct schema and handler', () => {
      expect(toolHandlers.get_installation_info).toBeDefined();
      expect(toolHandlers.get_installation_info.schema).toBeDefined();
      expect(toolHandlers.get_installation_info.handler).toBeDefined();
    });
  });

  describe('list_categories handler', () => {
    it('should have correct schema and handler', () => {
      expect(toolHandlers.list_categories).toBeDefined();
      expect(toolHandlers.list_categories.schema).toBeDefined();
      expect(toolHandlers.list_categories.handler).toBeDefined();
    });
  });

  describe('get_all_components handler', () => {
    it('should have correct schema and handler', () => {
      expect(toolHandlers.get_all_components).toBeDefined();
      expect(toolHandlers.get_all_components.schema).toBeDefined();
      expect(toolHandlers.get_all_components.handler).toBeDefined();
    });
  });
});

describe('tools and toolHandlers consistency', () => {
  it('should have matching entries between tools and toolHandlers', () => {
    const toolNames = tools.map((tool: any) => tool.name);
    const handlerNames = Object.keys(toolHandlers);

    expect(toolNames).toHaveLength(handlerNames.length);

    toolNames.forEach((toolName: string) => {
      expect(handlerNames).toContain(toolName);
    });

    handlerNames.forEach((handlerName: string) => {
      expect(toolNames).toContain(handlerName);
    });
  });
});