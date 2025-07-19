# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of Aceternity UI MCP server
- MCP tools for:
  - Searching Aceternity UI components (`search_components`)
  - Getting detailed component info (`get_component_info`)
  - Getting installation commands and setup (`get_installation_info`)
  - Listing all available categories (`list_categories`)
  - Listing all available components (`get_all_components`)
- Grouped component/category system for easy discovery
- Full support for Aceternity UI component metadata, install commands, and documentation links
- Integration with Model Context Protocol (MCP) for AI assistants and applications

### Technical
- Built with TypeScript and @modelcontextprotocol/sdk
- Input validation using Zod schemas
- Organized component and category data for extensibility
- CLI entry point for server usage
- Easy extensibility for new components and categories

### Documentation
- Complete README with setup and usage instructions
- API documentation for all MCP tools
- Example usage for AI assistants and MCP clients

---

## Release Notes

### Version 1.0.0
This is the initial stable release of Aceternity UI MCP, providing seamless integration between MCP-compatible AI assistants and the Aceternity UI component registry. The package offers comprehensive search, info, installation, and category management for UI components.

**Key Features:**
- 5 MCP tools covering all major Aceternity UI component operations
- Type-safe implementation with full TypeScript support
- Comprehensive input validation with Zod
- Support for multiple MCP clients (Claude Desktop, Cursor, Warp, etc.)
- Easy integration for AI assistants and applications

**Getting Started:**
1. Install with `npm install aceternityui-mcp`
2. Run the server with `npm start` or `npx aceternityui-mcp`
3. Connect your MCP-compatible AI assistant or client
4. Start searching, discovering, and installing Aceternity UI components via AI!

For detailed setup instructions, see the README file.