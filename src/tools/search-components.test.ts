import { jest } from '@jest/globals';
import { searchComponents } from './search-components.js';
import { ACETERNITY_COMPONENTS } from '../utils/components-data.js';

// Define types for the mocks
type MockSearchComponents = jest.MockedFunction<any>;
type MockFormatComponentInfo = jest.MockedFunction<any>;

// Mock the utility functions
jest.mock('../utils/index.js', () => ({
  searchComponents: jest.fn(),
  formatComponentInfo: jest.fn(),
}));

// Import the mocked functions
const mockSearchUtil = (jest.requireMock('../utils/index.js') as {
  searchComponents: MockSearchComponents;
}).searchComponents;

const mockFormatComponentInfo = (jest.requireMock('../utils/index.js') as {
  formatComponentInfo: MockFormatComponentInfo;
}).formatComponentInfo;

describe('searchComponents', () => {
  const mockComponent = {
    name: 'Test Component',
    description: 'A test component description',
    category: 'UI',
    installCommand: 'npm install test-component',
    isPro: false,
    tags: ['test', 'component'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted search results when query matches components', async () => {
    // Arrange
    const mockResults = [mockComponent];
    (mockSearchUtil as jest.MockedFunction<any>).mockReturnValue(mockResults);
    (mockFormatComponentInfo as jest.MockedFunction<any>).mockReturnValue('Formatted component info');

    // Act
    const result = await searchComponents({ query: 'test' });

    // Assert
    expect(mockSearchUtil).toHaveBeenCalledWith(ACETERNITY_COMPONENTS, 'test', undefined);
    // Verify that formatComponentInfo was called with the component as the first argument
    // The map function passes (element, index, array) to the callback
    expect(mockFormatComponentInfo).toHaveBeenNthCalledWith(1, mockComponent, 0, [mockComponent]);
    expect(result).toEqual({
      message: 'Found 1 components matching your search',
      components: [
        {
          name: 'Test Component',
          description: 'A test component description',
          category: 'UI',
          installCommand: 'npm install test-component',
          isPro: false,
          tags: ['test', 'component'],
        }
      ],
      formattedResults: 'Formatted component info'
    });
  });

  it('should handle multiple components in search results', async () => {
    // Arrange
    const mockResults = [mockComponent, { ...mockComponent, name: 'Another Component' }];
    (mockSearchUtil as jest.MockedFunction<any>).mockReturnValue(mockResults);
    (mockFormatComponentInfo as jest.MockedFunction<any>)
      .mockReturnValueOnce('Formatted component info 1')
      .mockReturnValueOnce('Formatted component info 2');

    // Act
    const result = await searchComponents({ query: 'test' });

    // Assert
    expect(mockSearchUtil).toHaveBeenCalledWith(ACETERNITY_COMPONENTS, 'test', undefined);
    expect(mockFormatComponentInfo).toHaveBeenCalledTimes(2);
    expect(result.message).toBe('Found 2 components matching your search');
    expect(result.components).toHaveLength(2);
    expect(result.formattedResults).toBe('Formatted component info 1\nFormatted component info 2');
  });

  it('should pass category parameter to search utility', async () => {
    // Arrange
    const mockResults = [mockComponent];
    (mockSearchUtil as jest.MockedFunction<any>).mockReturnValue(mockResults);
    (mockFormatComponentInfo as jest.MockedFunction<any>).mockReturnValue('Formatted component info');

    // Act
    const result = await searchComponents({ query: 'test', category: 'UI' });

    // Assert
    expect(mockSearchUtil).toHaveBeenCalledWith(ACETERNITY_COMPONENTS, 'test', 'UI');
  });

  it('should return empty results when no components match', async () => {
    // Arrange
    (mockSearchUtil as jest.MockedFunction<any>).mockReturnValue([]);
    
    // Act
    const result = await searchComponents({ query: 'nonexistent' });

    // Assert
    expect(mockSearchUtil).toHaveBeenCalledWith(ACETERNITY_COMPONENTS, 'nonexistent', undefined);
    expect(result).toEqual({
      message: 'Found 0 components matching your search',
      components: [],
      formattedResults: ''
    });
  });

  it('should properly format each component in the results', async () => {
    // Arrange
    const mockResults = [
      { ...mockComponent, name: 'Component 1' },
      { ...mockComponent, name: 'Component 2' }
    ];
    (mockSearchUtil as jest.MockedFunction<any>).mockReturnValue(mockResults);
    (mockFormatComponentInfo as jest.MockedFunction<any>)
      .mockReturnValueOnce('Formatted Component 1')
      .mockReturnValueOnce('Formatted Component 2');

    // Act
    const result = await searchComponents({ query: 'test' });

    // Assert
    // The map function passes (element, index, array) to the callback
    expect(mockFormatComponentInfo).toHaveBeenNthCalledWith(1, mockResults[0], 0, mockResults);
    expect(mockFormatComponentInfo).toHaveBeenNthCalledWith(2, mockResults[1], 1, mockResults);
    expect(result.formattedResults).toBe('Formatted Component 1\nFormatted Component 2');
  });
});