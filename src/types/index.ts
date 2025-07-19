export interface AceternityComponent {
    name: string;
    description: string;
    category: string;
    installCommand: string;
    dependencies: string[];
    tags: string[];
    isPro: boolean;
    documentation?: string;
  }
  
  export interface ComponentSearchResult {
    components: AceternityComponent[];
    total: number;
  }
  
  export interface ComponentCategory {
    name: string;
    components: string[];
    description: string;
  }
  
  export interface InstallationInfo {
    component: string;
    command: string;
    withExample: string;
    dependencies: string[];
    steps: string[];
  }
  