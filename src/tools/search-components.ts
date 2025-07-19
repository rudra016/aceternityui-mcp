import { ACETERNITY_COMPONENTS } from "../utils/components-data.js";
import { searchComponents as searchUtil, formatComponentInfo } from "../utils/index.js";

export async function searchComponents(args: { query: string; category?: string }) {
  const { query, category } = args;
  
  const results = searchUtil(ACETERNITY_COMPONENTS, query, category);
  
  return {
    message: `Found ${results.length} components matching your search`,
    components: results.map(component => ({
      name: component.name,
      description: component.description,
      category: component.category,
      installCommand: component.installCommand,
      isPro: component.isPro,
      tags: component.tags
    })),
    formattedResults: results.map(formatComponentInfo).join("\n")
  };
}
