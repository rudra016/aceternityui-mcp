[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/rudra016-aceternityui-mcp-badge.png)](https://mseep.ai/app/rudra016-aceternityui-mcp)

# Aceternity UI MCP

A **Model Context Protocol (MCP)** server that provides seamless integration with the Aceternity UI component registry. This package enables AI assistants and applications to search, discover, and install Aceternity UI components programmatically.

[![NPM Version](https://img.shields.io/npm/v/aceternityui-mcp)](https://www.npmjs.com/package/aceternityui-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- Search Aceternity UI components by name, description, or tags
- Get detailed information about any component
- Get installation commands and setup instructions
- List all available component categories
- List all available components
- Grouped category system for easy discovery
- TypeScript implementation with Zod validation
- Full Model Context Protocol (MCP) compliance for AI assistants and applications

## ⚙️ Setup

### MCP Configuration

#### For Claude Desktop

Add to your Claude Desktop configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "aceternityui": {
      "command": "npx",
      "args": ["aceternityui-mcp"]
    }
  }
}
```

#### For Cursor

Add the configuration to your Cursor settings:

```json
{
  "mcpServers": {
    "aceternityui": {
        "command": "npx aceternityui-mcp"
      }
  }
}
```

#### For Windsurf

Add the configuration to your Windsurf settings:

```json
{
  "mcpServers": {
    "aceternityui": {
      "command": "npx",
      "args": ["aceternityui-mcp"]
    }
  }
}
```

#### For Warp

Add the following to your Warp session setup:

```json
{
  "aceternityui": {
    "command": "npx",
    "args": ["aceternityui-mcp"],
    "working_directory": null,
    "start_on_launch": true
  }
}
```

#### For Other MCP Clients

Use the standard MCP server connection with:

- **Command**: `npx aceternityui-mcp` or `node path/to/aceternityui-mcp/dist/index.js`
- **Transport**: stdio

No API key or special configuration is required.

## 🔍 Available MCP Tools

- `search_components` - Search for Aceternity UI components by name, description, or tags
- `get_component_info` - Get detailed information about a specific component
- `get_installation_info` - Get installation commands and setup for a component
- `list_categories` - List all available component categories
- `get_all_components` - Get a list of all available components

## 💡 Usage Examples

### Search for Components
```javascript
const results = await mcp.callTool("search_components", { query: "grid" });
```

### Get Component Info
```javascript
const info = await mcp.callTool("get_component_info", { componentName: "bento-grid" });
```

### Get Installation Info
```javascript
const install = await mcp.callTool("get_installation_info", { componentName: "bento-grid" });
```

### List Categories
```javascript
const categories = await mcp.callTool("list_categories", {});
```

### List All Components
```javascript
const all = await mcp.callTool("get_all_components", {});
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rudra016/aceternityui-mcp.git
   cd aceternityui-mcp
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```
4. **Run in development mode**:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Aceternity UI Components](https://ui.aceternity.com/)
- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)

## 📞 Support

- Create an issue for bug reports or feature requests
- Check existing issues before creating new ones
- Provide detailed information including error messages and environment details

---

Made with ❤️ for the developer community