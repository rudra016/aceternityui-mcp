import {
  formatComponentInfo,
  formatInstallationSteps,
  searchComponents
} from './index.js';
import { AceternityComponent, InstallationInfo } from '../types/index.js';

describe('Utils', () => {
  describe('formatComponentInfo', () => {
    it('should format component info correctly', () => {
      const mockComponent: AceternityComponent = {
        name: 'Test Component',
        description: 'A test component',
        category: 'UI',
        installCommand: 'npm install test-component',
        dependencies: ['react', 'react-dom'],
        tags: ['test', 'component'],
        isPro: false
      };

      const result = formatComponentInfo(mockComponent);
      
      expect(result).toContain('**Test Component**');
      expect(result).toContain('- Description: A test component');
      expect(result).toContain('- Category: UI');
      expect(result).toContain('- Install Command: npm install test-component');
      expect(result).toContain('- Dependencies: react, react-dom');
      expect(result).toContain('- Tags: test, component');
      expect(result).toContain('- Pro Component: No');
    });

    it('should show "Yes" for pro component', () => {
      const mockComponent: AceternityComponent = {
        name: 'Pro Component',
        description: 'A pro component',
        category: 'UI',
        installCommand: 'npm install pro-component',
        dependencies: [],
        tags: [],
        isPro: true
      };

      const result = formatComponentInfo(mockComponent);
      
      expect(result).toContain('- Pro Component: Yes');
    });
  });

  describe('formatInstallationSteps', () => {
    it('should format installation steps correctly', () => {
      const mockInfo: InstallationInfo = {
        component: 'Test Component',
        command: 'npm install test-component',
        withExample: 'npm install test-component --example',
        dependencies: ['react', 'react-dom'],
        steps: ['Step 1: Install', 'Step 2: Configure', 'Step 3: Use']
      };

      const result = formatInstallationSteps(mockInfo);
      
      expect(result).toContain('**Installation Steps for Test Component:**');
      expect(result).toContain('1. Basic Installation:');
      expect(result).toContain('   npm install test-component');
      expect(result).toContain('2. Install with Example:');
      expect(result).toContain('   npm install test-component --example');
      expect(result).toContain('3. Dependencies:');
      expect(result).toContain('   react, react-dom');
      expect(result).toContain('4. Setup Steps:');
      expect(result).toContain('   - Step 1: Install');
      expect(result).toContain('   - Step 2: Configure');
      expect(result).toContain('   - Step 3: Use');
    });
  });

  describe('searchComponents', () => {
    const mockComponents: AceternityComponent[] = [
      {
        name: 'Button Component',
        description: 'A beautiful button component',
        category: 'UI',
        installCommand: 'npm install button',
        dependencies: ['react'],
        tags: ['button', 'ui'],
        isPro: false
      },
      {
        name: 'Modal Component',
        description: 'A modal dialog component',
        category: 'Overlay',
        installCommand: 'npm install modal',
        dependencies: ['react'],
        tags: ['modal', 'dialog'],
        isPro: true
      },
      {
        name: 'Input Component',
        description: 'An input field component',
        category: 'Form',
        installCommand: 'npm install input',
        dependencies: ['react'],
        tags: ['input', 'form'],
        isPro: false
      }
    ];

    it('should return all components when query is empty and no category', () => {
      const result = searchComponents(mockComponents, '');
      expect(result).toHaveLength(3);
      expect(result).toEqual(mockComponents);
    });

    it('should return components matching the name query', () => {
      const result = searchComponents(mockComponents, 'Button');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Button Component');
    });

    it('should return components matching the description query', () => {
      const result = searchComponents(mockComponents, 'modal dialog');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Modal Component');
    });

    it('should return components matching the tags query', () => {
      const result = searchComponents(mockComponents, 'button');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Button Component');
    });

    it('should return components matching the category filter', () => {
      const result = searchComponents(mockComponents, '', 'UI');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Button Component');
    });

    it('should return components matching both query and category', () => {
      const result = searchComponents(mockComponents, 'Component', 'UI');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Button Component');
    });

    it('should return empty array when no matches found', () => {
      const result = searchComponents(mockComponents, 'NonExistent', 'NonExistent');
      expect(result).toHaveLength(0);
    });

    it('should be case insensitive in search', () => {
      const result = searchComponents(mockComponents, 'button');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Button Component');
    });
  });
});