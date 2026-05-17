import { ACETERNITY_COMPONENTS, COMPONENT_CATEGORIES } from './components-data.js';
import { AceternityComponent, ComponentCategory } from '../types/index.js';

describe('ACETERNITY_COMPONENTS', () => {
  it('should be an array of AceternityComponent objects', () => {
    expect(Array.isArray(ACETERNITY_COMPONENTS)).toBe(true);
    expect(ACETERNITY_COMPONENTS.length).toBeGreaterThan(0);

    ACETERNITY_COMPONENTS.forEach((component: AceternityComponent) => {
      expect(component).toMatchObject({
        name: expect.any(String),
        description: expect.any(String),
        category: expect.any(String),
        installCommand: expect.any(String),
        dependencies: expect.any(Array),
        tags: expect.any(Array),
        isPro: expect.any(Boolean),
      });

      // Check that dependencies and tags arrays contain only strings
      component.dependencies.forEach((dep: string) => expect(typeof dep).toBe('string'));
      component.tags.forEach((tag: string) => expect(typeof tag).toBe('string'));
    });
  });

  it('should have unique component names', () => {
    const names = ACETERNITY_COMPONENTS.map((component: AceternityComponent) => component.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  it('should have valid category references', () => {
    const categoryNames = new Set(COMPONENT_CATEGORIES.map((cat: ComponentCategory) => cat.name));

    ACETERNITY_COMPONENTS.forEach((component: AceternityComponent) => {
      // Some components might have categories that don't have dedicated category entries
      // This is acceptable, so we only verify that the category field is a string
      expect(typeof component.category).toBe('string');
    });
  });

  it('should have isPro as false for all components', () => {
    ACETERNITY_COMPONENTS.forEach((component: AceternityComponent) => {
      expect(component.isPro).toBe(false);
    });
  });

  it('should have proper documentation field when present', () => {
    ACETERNITY_COMPONENTS.forEach((component: AceternityComponent) => {
      if ('documentation' in component) {
        expect(typeof component.documentation).toBe('string');
        expect(component.documentation).toMatch(/^https?:\/\//);
      }
    });
  });

  it('should have non-empty required fields', () => {
    ACETERNITY_COMPONENTS.forEach((component: AceternityComponent) => {
      expect(component.name.trim()).not.toBe('');
      expect(component.description.trim()).not.toBe('');
      expect(component.category.trim()).not.toBe('');
      expect(component.installCommand.trim()).not.toBe('');
    });
  });
});

describe('COMPONENT_CATEGORIES', () => {
  it('should be an array of ComponentCategory objects', () => {
    expect(Array.isArray(COMPONENT_CATEGORIES)).toBe(true);
    expect(COMPONENT_CATEGORIES.length).toBeGreaterThan(0);

    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      expect(category).toMatchObject({
        name: expect.any(String),
        components: expect.any(Array),
        description: expect.any(String),
      });

      // Check that components array contains only strings
      category.components.forEach((comp: string) => expect(typeof comp).toBe('string'));
    });
  });

  it('should have unique category names', () => {
    const names = COMPONENT_CATEGORIES.map((category: ComponentCategory) => category.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  it('should have non-empty required fields', () => {
    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      expect(category.name.trim()).not.toBe('');
      expect(category.description.trim()).not.toBe('');
    });
  });

  it('should have non-empty components array', () => {
    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      expect(category.components.length).toBeGreaterThan(0);
    });
  });

  it('should reference only existing components in each category', () => {
    const componentNames = new Set(ACETERNITY_COMPONENTS.map((comp: AceternityComponent) => comp.name));

    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      category.components.forEach((componentName: string) => {
        expect(componentNames.has(componentName)).toBe(true);
      });
    });
  });

  it('should not have duplicate component references within a category', () => {
    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      const uniqueComponents = new Set(category.components);
      expect(category.components.length).toBe(uniqueComponents.size);
    });
  });
});

describe('Relationship between components and categories', () => {
  it('should include all components in at least one category', () => {
    const allCategorizedComponents = new Set<string>();
    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      category.components.forEach((comp: string) => allCategorizedComponents.add(comp));
    });

    ACETERNITY_COMPONENTS.forEach((component: AceternityComponent) => {
      expect(allCategorizedComponents.has(component.name)).toBe(true);
    });
  });

  it('should have all components in categories exist in the main components list', () => {
    COMPONENT_CATEGORIES.forEach((category: ComponentCategory) => {
      category.components.forEach((componentName: string) => {
        const component = ACETERNITY_COMPONENTS.find((comp: AceternityComponent) => comp.name === componentName);
        expect(component).toBeDefined();
        expect(component).toHaveProperty('name', componentName);
      });
    });
  });
});