#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { toolHandlers, tools } from "./tools/definitions.js";

const server = new Server(
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

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const toolDefinition = toolHandlers[name as keyof typeof toolHandlers];
    if (!toolDefinition) {
      throw new Error(`Unknown tool: ${name}`);
    }

    // Validate arguments with Zod schema
    const validatedArgs = toolDefinition.schema.parse(args);

    // Call the handler with validated arguments
    const result = await toolDefinition.handler(validatedArgs as any);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      content: [
        {
          type: "text",
          text: `Error calling tool ${name}: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Aceternity UI MCP server is running...");
}

main().catch((error) => {
  console.error("Fatal error starting server:", error);
  process.exit(1);
});
