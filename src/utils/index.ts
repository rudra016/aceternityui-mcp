import { AceternityComponent, InstallationInfo} from "../types/index.js";

export const formatComponentInfo = (component: AceternityComponent): string => {
  return `
**${component.name}**
- Description: ${component.description}
- Category: ${component.category}
- Install Command: ${component.installCommand}
- Dependencies: ${component.dependencies.join(", ")}
- Tags: ${component.tags.join(", ")}
- Pro Component: ${component.isPro ? "Yes" : "No"}

`;
};

export const formatInstallationSteps = (info: InstallationInfo): string => {
  return `
**Installation Steps for ${info.component}:**

1. Basic Installation:
   ${info.command}

2. Install with Example:
   ${info.withExample}

3. Dependencies:
   ${info.dependencies.join(", ")}

4. Setup Steps:
${info.steps.map(step => `   - ${step}`).join("\n")}
`;
};

export const searchComponents = (
  components: AceternityComponent[],
  query: string,
  category?: string
): AceternityComponent[] => {
  return components.filter(component => {
    const matchesQuery = query === "" || 
      component.name.toLowerCase().includes(query.toLowerCase()) ||
      component.description.toLowerCase().includes(query.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCategory = !category || component.category === category;
    
    return matchesQuery && matchesCategory;
  });
};
