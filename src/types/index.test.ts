import {
  AceternityComponent,
  ComponentSearchResult,
  ComponentCategory,
  InstallationInfo,
} from './index.js';

describe('Types', () => {
  describe('AceternityComponent', () => {
    it('should have the required properties', () => {
      const component: AceternityComponent = {
        name: 'Test Component',
        description: 'A test component',
        category: 'UI',
        installCommand: 'npm install test-component',
        dependencies: ['react', 'styled-components'],
        tags: ['button', 'interactive'],
        isPro: false,
      };

      expect(component.name).toBe('Test Component');
      expect(component.description).toBe('A test component');
      expect(component.category).toBe('UI');
      expect(component.installCommand).toBe('npm install test-component');
      expect(component.dependencies).toEqual(['react', 'styled-components']);
      expect(component.tags).toEqual(['button', 'interactive']);
      expect(component.isPro).toBe(false);
    });

    it('should support optional documentation property', () => {
      const componentWithDocs: AceternityComponent = {
        name: 'Test Component',
        description: 'A test component',
        category: 'UI',
        installCommand: 'npm install test-component',
        dependencies: [],
        tags: [],
        isPro: true,
        documentation: 'https://example.com/docs',
      };

      const componentWithoutDocs: AceternityComponent = {
        name: 'Test Component',
        description: 'A test component',
        category: 'UI',
        installCommand: 'npm install test-component',
        dependencies: [],
        tags: [],
        isPro: true,
      };

      expect(componentWithDocs.documentation).toBe('https://example.com/docs');
      expect(componentWithoutDocs.documentation).toBeUndefined();
    });

    it('should have all required properties with correct types', () => {
      const component: AceternityComponent = {
        name: 'Test',
        description: 'Description',
        category: 'Category',
        installCommand: 'command',
        dependencies: ['dep1', 'dep2'],
        tags: ['tag1', 'tag2'],
        isPro: true,
      };

      expect(typeof component.name).toBe('string');
      expect(typeof component.description).toBe('string');
      expect(typeof component.category).toBe('string');
      expect(typeof component.installCommand).toBe('string');
      expect(Array.isArray(component.dependencies)).toBe(true);
      expect(Array.isArray(component.tags)).toBe(true);
      expect(typeof component.isPro).toBe('boolean');
    });
  });

  describe('ComponentSearchResult', () => {
    it('should have components and total properties', () => {
      const searchResult: ComponentSearchResult = {
        components: [
          {
            name: 'Component 1',
            description: 'A test component',
            category: 'UI',
            installCommand: 'npm install comp1',
            dependencies: [],
            tags: [],
            isPro: false,
          },
        ],
        total: 1,
      };

      expect(Array.isArray(searchResult.components)).toBe(true);
      expect(searchResult.components.length).toBe(1);
      expect(searchResult.total).toBe(1);
      expect(searchResult.components[0].name).toBe('Component 1');
    });

    it('should have correct types for properties', () => {
      const searchResult: ComponentSearchResult = {
        components: [],
        total: 0,
      };

      expect(Array.isArray(searchResult.components)).toBe(true);
      expect(typeof searchResult.total).toBe('number');
    });
  });

  describe('ComponentCategory', () => {
    it('should have name, components, and description properties', () => {
      const category: ComponentCategory = {
        name: 'Buttons',
        components: ['button1', 'button2'],
        description: 'Button components',
      };

      expect(category.name).toBe('Buttons');
      expect(category.components).toEqual(['button1', 'button2']);
      expect(category.description).toBe('Button components');
    });

    it('should have correct types for properties', () => {
      const category: ComponentCategory = {
        name: 'Category Name',
        components: [],
        description: 'Category description',
      };

      expect(typeof category.name).toBe('string');
      expect(Array.isArray(category.components)).toBe(true);
      expect(typeof category.description).toBe('string');
    });
  });

  describe('InstallationInfo', () => {
    it('should have all required properties', () => {
      const installationInfo: InstallationInfo = {
        component: 'Test Component',
        command: 'npm install test-component',
        withExample: 'npm install test-component example',
        dependencies: ['react', 'typescript'],
        steps: ['Step 1', 'Step 2'],
      };

      expect(installationInfo.component).toBe('Test Component');
      expect(installationInfo.command).toBe('npm install test-component');
      expect(installationInfo.withExample).toBe('npm install test-component example');
      expect(installationInfo.dependencies).toEqual(['react', 'typescript']);
      expect(installationInfo.steps).toEqual(['Step 1', 'Step 2']);
    });

    it('should have correct types for properties', () => {
      const installationInfo: InstallationInfo = {
        component: 'Component',
        command: 'Command',
        withExample: 'Example',
        dependencies: [],
        steps: [],
      };

      expect(typeof installationInfo.component).toBe('string');
      expect(typeof installationInfo.command).toBe('string');
      expect(typeof installationInfo.withExample).toBe('string');
      expect(Array.isArray(installationInfo.dependencies)).toBe(true);
      expect(Array.isArray(installationInfo.steps)).toBe(true);
    });
  });
});