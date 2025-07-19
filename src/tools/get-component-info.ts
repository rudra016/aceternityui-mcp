import { ACETERNITY_COMPONENTS } from "../utils/components-data.js";
import { formatComponentInfo } from "../utils/index.js";

export async function getComponentInfo(args: { componentName: string }) {
  const { componentName } = args;
  
  const component = ACETERNITY_COMPONENTS.find(
    comp => comp.name.toLowerCase() === componentName.toLowerCase()
  );
  
  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }
  
  return {
    component,
    formattedInfo: formatComponentInfo(component)
  };
}
