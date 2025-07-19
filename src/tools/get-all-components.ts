import { ACETERNITY_COMPONENTS } from "../utils/components-data.js";

export async function getAllComponents(args: { includeProOnly?: boolean }) {
  const { includeProOnly = false } = args;
  
  const components = includeProOnly 
    ? ACETERNITY_COMPONENTS 
    : ACETERNITY_COMPONENTS.filter(comp => !comp.isPro);
  
  return {
    total: components.length,
    components: components.map(comp => ({
      name: comp.name,
      description: comp.description,
      category: comp.category,
      installCommand: comp.installCommand,
      isPro: comp.isPro
    })),
    formattedList: components.map(comp => 
      `- **${comp.name}** (${comp.category}): ${comp.description}`
    ).join("\n")
  };
}
