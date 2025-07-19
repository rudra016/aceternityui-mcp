import { ACETERNITY_COMPONENTS } from "../utils/components-data.js";
import { formatInstallationSteps } from "../utils/index.js";
import { InstallationInfo } from "../types/index.js";

export async function getInstallationInfo(args: { componentName: string }) {
  const { componentName } = args;
  
  const component = ACETERNITY_COMPONENTS.find(
    comp => comp.name.toLowerCase() === componentName.toLowerCase()
  );
  
  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }
  
  const installInfo: InstallationInfo = {
    component: component.name,
    command: component.installCommand,
    withExample: `${component.installCommand} -e`,
    dependencies: component.dependencies,
    steps: [
      "Run the installation command",
      "Import the component in your React/Next.js project",
      "Ensure Tailwind CSS is configured",
      "Add Framer Motion to your project if not already present",
      "Customize the component as needed"
    ]
  };
  
  return {
    installationInfo: installInfo,
    formattedSteps: formatInstallationSteps(installInfo)
  };
}
