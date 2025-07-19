import { COMPONENT_CATEGORIES } from "../utils/components-data.js";

export async function listCategories() {
  return {
    categories: COMPONENT_CATEGORIES,
    formattedCategories: COMPONENT_CATEGORIES.map(cat => 
      `**${cat.name}**\n- ${cat.description}\n- Components: ${cat.components.join(", ")}`
    ).join("\n\n")
  };
}
