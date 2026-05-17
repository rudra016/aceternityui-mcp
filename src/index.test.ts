import { jest, describe, expect, beforeEach, afterEach, it } from '@jest/globals';

// Create a helper function to isolate and set up modules for testing
async function setupTest() {
  // Reset modules to ensure clean state
  jest.resetModules();
  
  // Create mocks
  const mockSetRequestHandler = jest.fn();
  const mockConnect = jest.fn();
  const mockServerInstance = {
    setRequestHandler: mockSetRequestHandler,
    connect: mockConnect,
  };
  
  const mockServer = jest.fn().mockImplementation(() => mockServerInstance);
  const mockStdioTransport = jest.fn().mockImplementation(() => ({}));
  
  // Mock the external dependencies
  jest.doMock("@modelcontextprotocol/sdk/server/index.js", () => ({
    Server: mockServer
  }));

  jest.doMock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
    StdioServerTransport: mockStdioTransport
  }));
  
  // Mock the tools module
  const mockSearchComponents = jest.fn();
  const mockGetComponentInfo = jest.fn();
  const mockGetInstallationInfo = jest.fn();
  const mockListCategories = jest.fn();
  const mockGetAllComponents = jest.fn();
  
  jest.doMock('./tools/definitions.js', () => ({
    toolHandlers: {
      search_components: {
        schema: { parse: jest.fn() },
        handler: mockSearchComponents,
      },
      get_component_info: {
        schema: { parse: jest.fn() },
        handler: mockGetComponentInfo,
      },
      get_installation_info: {
        schema: { parse: jest.fn() },
        handler: mockGetInstallationInfo,
      },
      list_categories: {
        schema: { parse: jest.fn() },
        handler: mockListCategories,
      },
      get_all_components: {
        schema: { parse: jest.fn() },
        handler: mockGetAllComponents,
      },
    },
    tools: [
      {
        name: "search_components",
        description: "Search for Aceternity UI components by name, description, or tags",
        inputSchema: { type: "object", properties: { query: { type: "string", description: "Search query for components" } }, required: ["query"] }
      },
      {
        name: "get_component_info",
        description: "Get detailed information about a specific Aceternity UI component",
        inputSchema: { type: "object", properties: { componentName: { type: "string", description: "Name of the component to get info for" } }, required: ["componentName"] }
      },
      {
        name: "get_installation_info",
        description: "Get installation commands and setup instructions for a component",
        inputSchema: { type: "object", properties: { componentName: { type: "string", description: "Name of the component to get installation info for" } }, required: ["componentName"] }
      },
      {
        name: "list_categories",
        description: "List all available component categories",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "get_all_components",
        description: "Get a list of all available Aceternity UI components",
        inputSchema: { type: "object", properties: { includeProOnly: { type: "boolean", description: "Include pro-only components (default: false)" } } }
      }
    ]
  }));

  // Import the actual module after mocks are in place
  const { CallToolRequestSchema, ListToolsRequestSchema } = await import("@modelcontextprotocol/sdk/types.js");
  const module = await import('./index.js');
  
  return {
    mockServer,
    mockStdioTransport,
    mockServerInstance,
    CallToolRequestSchema,
    ListToolsRequestSchema,
    module
  };
}

describe('index.ts - MCP Server', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    // Spy on console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('Server Configuration', () => {
    it('should create server with correct configuration', async () => {
      const { mockServer } = await setupTest();

      expect(mockServer).toHaveBeenCalledWith(
        {
          name: "aceternity-ui-mcp",
          version: "1.0.0",
          title: "Aceternity UI MCP Server",
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );
    });

    it('should register both request handlers', async () => {
      const { mockServerInstance, CallToolRequestSchema, ListToolsRequestSchema } = await setupTest();

      expect(mockServerInstance.setRequestHandler).toHaveBeenCalledTimes(2);

      // Verify that both handlers were registered by checking the schemas
      const setRequestHandlerCalls = mockServerInstance.setRequestHandler.mock.calls as [any, any][];
      const handlerSchemas = setRequestHandlerCalls.map(call => call[0]);

      expect(handlerSchemas).toContain(ListToolsRequestSchema);
      expect(handlerSchemas).toContain(CallToolRequestSchema);
    });
  });

  describe('ListTools Request Handler', () => {
    it('should return the tools when ListTools request is handled', async () => {
      const { mockServerInstance, ListToolsRequestSchema } = await setupTest();
      const { tools } = await import("./tools/definitions.js");

      // Find the ListTools handler callback
      const listToolsCall = mockServerInstance.setRequestHandler.mock.calls
        .find((call: any[]) => call[0] === ListToolsRequestSchema);

      expect(listToolsCall).toBeDefined();
      if (!listToolsCall) {
        throw new Error('ListTools handler not found');
      }

      const listToolsHandler: any = listToolsCall[1];
      const result = await listToolsHandler();

      expect(result).toEqual({ tools });
    });
  });

  describe('CallTool Request Handler', () => {
    it('should execute a valid tool with correct arguments', async () => {
      const { mockServerInstance, CallToolRequestSchema } = await setupTest();
      const { toolHandlers } = await import("./tools/definitions.js");

      // Find the CallTool handler callback
      const callToolCall = mockServerInstance.setRequestHandler.mock.calls
        .find((call: any[]) => call[0] === CallToolRequestSchema);

      expect(callToolCall).toBeDefined();
      if (!callToolCall) {
        throw new Error('CallTool handler not found');
      }

      const callToolHandler: any = callToolCall[1];

      const mockHandler = {
        schema: { parse: jest.fn().mockReturnValue({ query: 'test' }) },
        handler: jest.fn(() => Promise.resolve({ result: 'success' })) as any,
      };

      // Temporarily replace the search_components handler for this test
      const originalHandler = toolHandlers.search_components;
      (toolHandlers as any).search_components = mockHandler;

      const result = await callToolHandler({
        params: {
          name: 'search_components',
          arguments: { query: 'test' },
        },
      });

      expect(mockHandler.schema.parse).toHaveBeenCalledWith({ query: 'test' });
      expect(mockHandler.handler).toHaveBeenCalledWith({ query: 'test' });
      expect(result).toEqual({
        content: [
          {
            type: "text",
            text: JSON.stringify({ result: 'success' }, null, 2),
          },
        ],
      });

      // Restore original handler
      (toolHandlers as any).search_components = originalHandler;
    });

    it('should return error for unknown tool', async () => {
      const { mockServerInstance, CallToolRequestSchema } = await setupTest();

      // Find the CallTool handler callback
      const callToolCall = mockServerInstance.setRequestHandler.mock.calls
        .find((call: any[]) => call[0] === CallToolRequestSchema);

      expect(callToolCall).toBeDefined();
      if (!callToolCall) {
        throw new Error('CallTool handler not found');
      }

      const callToolHandler: any = callToolCall[1];

      const result = await callToolHandler({
        params: {
          name: 'unknownTool',
          arguments: {},
        },
      });

      expect(result).toEqual({
        content: [
          {
            type: "text",
            text: 'Error calling tool unknownTool: Unknown tool: unknownTool',
          },
        ],
        isError: true,
      });
    });

    it('should handle validation errors', async () => {
      const { mockServerInstance, CallToolRequestSchema } = await setupTest();
      const { toolHandlers } = await import("./tools/definitions.js");

      // Find the CallTool handler callback
      const callToolCall = mockServerInstance.setRequestHandler.mock.calls
        .find((call: any[]) => call[0] === CallToolRequestSchema);

      expect(callToolCall).toBeDefined();
      if (!callToolCall) {
        throw new Error('CallTool handler not found');
      }

      const callToolHandler: any = callToolCall[1];

      const mockHandler = {
        schema: { parse: jest.fn().mockImplementation(() => {
          throw new Error('Validation error');
        }) },
        handler: jest.fn() as any,
      };

      // Temporarily replace the search_components handler for this test
      const originalHandler = toolHandlers.search_components;
      (toolHandlers as any).search_components = mockHandler;

      const result = await callToolHandler({
        params: {
          name: 'search_components',
          arguments: { query: 'test' },
        },
      });

      expect(result).toEqual({
        content: [
          {
            type: "text",
            text: 'Error calling tool search_components: Validation error',
          },
        ],
        isError: true,
      });

      // Restore original handler
      (toolHandlers as any).search_components = originalHandler;
    });

    it('should handle execution errors', async () => {
      const { mockServerInstance, CallToolRequestSchema } = await setupTest();
      const { toolHandlers } = await import("./tools/definitions.js");

      // Find the CallTool handler callback
      const callToolCall = mockServerInstance.setRequestHandler.mock.calls
        .find((call: any[]) => call[0] === CallToolRequestSchema);

      expect(callToolCall).toBeDefined();
      if (!callToolCall) {
        throw new Error('CallTool handler not found');
      }

      const callToolHandler: any = callToolCall[1];

      const mockHandler = {
        schema: { parse: jest.fn().mockReturnValue({ query: 'test' }) },
        handler: jest.fn(() => Promise.reject(new Error('Execution failed'))) as any,
      };

      // Temporarily replace the search_components handler for this test
      const originalHandler = toolHandlers.search_components;
      (toolHandlers as any).search_components = mockHandler;

      const result = await callToolHandler({
        params: {
          name: 'search_components',
          arguments: { query: 'test' },
        },
      });

      expect(result).toEqual({
        content: [
          {
            type: "text",
            text: 'Error calling tool search_components: Execution failed',
          },
        ],
        isError: true,
      });

      // Restore original handler
      (toolHandlers as any).search_components = originalHandler;
    });

    it('should handle generic execution errors', async () => {
      const { mockServerInstance, CallToolRequestSchema } = await setupTest();
      const { toolHandlers } = await import("./tools/definitions.js");

      // Find the CallTool handler callback
      const callToolCall = mockServerInstance.setRequestHandler.mock.calls
        .find((call: any[]) => call[0] === CallToolRequestSchema);

      expect(callToolCall).toBeDefined();
      if (!callToolCall) {
        throw new Error('CallTool handler not found');
      }

      const callToolHandler: any = callToolCall[1];

      const mockHandler = {
        schema: { parse: jest.fn().mockReturnValue({ query: 'test' }) },
        handler: jest.fn(() => Promise.reject('Plain string error')) as any,
      };

      // Temporarily replace the search_components handler for this test
      const originalHandler = toolHandlers.search_components;
      (toolHandlers as any).search_components = mockHandler;

      const result = await callToolHandler({
        params: {
          name: 'search_components',
          arguments: { query: 'test' },
        },
      });

      expect(result).toEqual({
        content: [
          {
            type: "text",
            text: 'Error calling tool search_components: An unknown error occurred.',
          },
        ],
        isError: true,
      });

      // Restore original handler
      (toolHandlers as any).search_components = originalHandler;
    });
  });

  describe('Main Function', () => {
    it('should initialize StdioServerTransport and connect server', async () => {
      const { mockStdioTransport, mockServerInstance } = await setupTest();

      expect(mockStdioTransport).toHaveBeenCalled();
      expect(mockServerInstance.connect).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should log that the server is running', async () => {
      await setupTest();

      // Verify the log was called
      expect(console.log).toHaveBeenCalledWith('Aceternity UI MCP server is running...');
    });
  });
});