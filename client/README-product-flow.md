# Product Data Flow Builder

A Next.js application that allows companies to create visual workflows for their product data, including images, guides, common issues, and solutions. The data is exported to CSV format for AI model training.

## Features

- **Visual Flow Builder**: Drag-and-drop interface using React Flow
- **Product Nodes**: Add product information, images, and documentation
- **Issues Tracking**: Define common product issues with severity levels
- **Solution Management**: Create step-by-step solutions for problems
- **File Upload**: Support for images and documents with Azure Blob Storage
- **CSV Export**: Export all data to CSV format for AI model consumption
- **Real-time Updates**: Live data synchronization across connected nodes

## Setup

### Prerequisites

- Node.js 18+
- pnpm package manager
- Azure Storage Account (for file uploads)

### Installation

1. Clone the repository and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your Azure Storage connection string:
```
NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING=your_connection_string_here
NEXT_PUBLIC_BLOB_CONTAINER_NAME=product-data
```

### Running the Application

1. Start the development server:
```bash
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Click "Product Flow Builder" to access the main application

## Usage

### Creating Product Workflows

1. **Add Product Information**:
   - Click "Add Product" to create a new product node
   - Fill in product name and description
   - Upload product images and documentation guides

2. **Define Issues**:
   - Click "Add Issues" to create an issues node
   - Add common problems with descriptions and severity levels
   - Connect issues to relevant products

3. **Create Solutions**:
   - Click "Add Solutions" to create a solutions node
   - Add step-by-step solutions for each issue
   - Link solutions to corresponding issues

4. **Connect Nodes**:
   - Drag from connection points to link related nodes
   - Create logical flows between products, issues, and solutions

5. **Publish Data**:
   - Click "Publish Data" to export everything to CSV
   - Files are uploaded to Azure Blob Storage
   - CSV data is ready for AI model training

### Node Types

- **Product Node** (Blue): Contains product information, images, and guides
- **Issues Node** (Red): Lists common problems and their severity
- **Solutions Node** (Green): Provides step-by-step problem resolutions

## File Structure

```
src/
├── app/
│   ├── api/publish/          # API endpoint for data publishing
│   ├── product-flow/         # Main flow builder page
│   └── xyflow.tsx           # Core React Flow component
├── components/ui/            # Reusable UI components
├── lib/
│   ├── blob-storage.ts      # Azure Blob Storage utilities
│   └── utils.ts             # General utilities
└── hooks/                   # Custom React hooks
```

## API Endpoints

- `POST /api/publish` - Publishes workflow data and uploads files to blob storage

## Technologies Used

- **Next.js 15** - React framework
- **React Flow** - Interactive node-based interface
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Azure Blob Storage** - File storage
- **React Dropzone** - File upload handling

## Configuration

The application requires Azure Blob Storage for file uploads. Make sure to:

1. Create an Azure Storage Account
2. Create a container named "product-data" (or customize in env variables)
3. Add the connection string to your environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for internal company use.
