import { z } from "zod";
import { searchComponents } from "./search-components.js";
import { getComponentInfo } from "./get-component-info.js";
import { getInstallationInfo } from "./get-installation-info.js";
import { listCategories } from "./list-categories.js";
import { getAllComponents } from "./get-all-components.js";

export const tools = [
  {
    name: "search_components",
    description: "Search for Aceternity UI components by name, description, or tags",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query for components"
        },
        category: {
          type: "string",
          description: "Filter by category (optional)"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "get_component_info",
    description: "Get detailed information about a specific Aceternity UI component",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: "Name of the component to get info for"
        }
      },
      required: ["componentName"]
    }
  },
  {
    name: "get_installation_info",
    description: "Get installation commands and setup instructions for a component",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: "Name of the component to get installation info for"
        }
      },
      required: ["componentName"]
    }
  },
  {
    name: "list_categories",
    description: "List all available component categories",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "get_all_components",
    description: "Get a list of all available Aceternity UI components",
    inputSchema: {
      type: "object",
      properties: {
        includeProOnly: {
          type: "boolean",
          description: "Include pro-only components (default: false)"
        }
      }
    }
  }
];

export const toolHandlers = {
  search_components: {
    schema: z.object({
      query: z.string(),
      category: z.string().optional()
    }),
    handler: searchComponents
  },
  get_component_info: {
    schema: z.object({
      componentName: z.string()
    }),
    handler: getComponentInfo
  },
  get_installation_info: {
    schema: z.object({
      componentName: z.string()
    }),
    handler: getInstallationInfo
  },
  list_categories: {
    schema: z.object({}),
    handler: listCategories
  },
  get_all_components: {
    schema: z.object({
      includeProOnly: z.boolean().optional()
    }),
    handler: getAllComponents
  }
};
