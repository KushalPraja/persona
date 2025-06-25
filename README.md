# Persona - AI Agent Knowledge Base Platform



https://github.com/user-attachments/assets/f9c1894c-e447-4a3d-8456-22e78a5ac565


Transform your business operations with intelligent AI agents that serve as dynamic knowledge bases. Scale operations 24/7 with autonomous agents that instantly access company data, answer questions, and automate workflows.

## 🚀 Features

### AI Agent Automation
- **Intelligent Knowledge Bases**: Deploy AI agents that serve as dynamic repositories of business intelligence
- **24/7 Operations**: Continuous automation and knowledge access
- **Instant Data Access**: Real-time retrieval of company information and insights
- **Workflow Automation**: Knowledge-driven process automation

### Visual Product Modeling
- **Interactive Flow Builder**: Create connected knowledge bases with visual node-based interface
- **Flexible Component System**: Overview, Features, Use Cases, Personas, Capabilities, Limitations, and Media nodes
- **Custom Fields**: Add arbitrary key-value pairs for specific business needs
- **CSV Export**: Export structured data for external use

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Clean Interface**: Modern, professional design with intuitive navigation
- **Real-time Chat**: Interactive AI-powered chat interface with graph visualizations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Flow**: Interactive node-based UI components
- **Shadcn/ui**: Modern component library

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web application framework
- **Google Gemini AI**: Advanced language model integration
- **RESTful APIs**: Clean API architecture

### Database & Infrastructure
- **MongoDB**: NoSQL database for flexible data storage
- **Supabase**: Authentication and real-time features
- **Docker**: Containerized development and deployment
- **Local Storage**: Client-side data persistence
- **SVG Graphics**: Scalable vector graphics for branding

## 📁 Project Structure

```
persona/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── page.tsx                    # Landing page
│   │   │   ├── (dashboard)/home/           # Dashboard
│   │   │   ├── product/[id]/               # Product flow builder
│   │   │   └── bot/[id]/                   # Chat interface
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # Shadcn/ui components
│   │   │   └── app-sidebar.tsx             # Main navigation
│   │   └── lib/           # Utilities and helpers
│   ├── public/            # Static assets
│   │   ├── logo.svg       # Main logo
│   │   ├── favicon.svg    # Browser favicon
│   │   └── icon-192.svg   # High-res app icon
│   ├── Dockerfile         # Frontend container configuration
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── src/
│   │   ├── index.js       # Main server file
│   │   ├── db.js          # MongoDB connection
│   │   └── services/      # Business logic
│   ├── Dockerfile         # Backend container configuration
│   └── package.json       # Backend dependencies
├── docker-compose.yml     # Multi-container orchestration
└── README.md             # Project documentation
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MongoDB (or use Docker container)
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd persona
   ```

2. **Start with Docker (Recommended)**
   ```bash
   # Start all services (MongoDB, backend, frontend)
   docker-compose up -d
   ```

3. **Or install manually**

   **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   # or
   pnpm install
   ```

   **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../client
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   MONGODB_URI=mongodb://localhost:27017/persona
   ```

5. **Start the development servers (if not using Docker)**

   **Start MongoDB:**
   ```bash
   # Option 1: Use Docker
   docker run -d -p 27017:27017 --name persona-mongo mongo:latest

   # Option 2: Use local MongoDB installation
   mongod
   ```

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm start
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

### Creating AI Knowledge Bases

1. **Start a New Project**
   - Navigate to the dashboard
   - Choose a quick start template or create custom
   - Define your product name and documentation tone

2. **Build Your Knowledge Structure**
   - Use the visual flow builder to create connected nodes
   - Add Overview, Features, Use Cases, Personas, and more
   - Connect nodes to show relationships
   - Add custom fields for specific business data

3. **Deploy Your AI Agent**
   - Publish your knowledge base
   - Generate an AI chat interface
   - Share with your team or customers

### Chat Interface Features

- **Multi-view Navigation**: Switch between Chat, Graph, and FAQ views
- **3D Graph Visualization**: Interactive exploration of knowledge connections
- **Mobile-Responsive**: Optimized for all device sizes
- **QR Code Sharing**: Easy sharing across devices

## 🔧 Configuration

### Tone Options
- **Professional**: Clear, formal, business-focused
- **Friendly**: Warm, approachable, conversational
- **Technical**: Detailed, precise, expert-level
- **Casual**: Relaxed, informal, easy-going
- **Authoritative**: Confident, decisive, commanding
- **Empathetic**: Understanding, supportive, caring

### Component Types
- **Overview**: Core product information
- **Features**: Key functionality and capabilities
- **Use Cases**: Real-world applications and scenarios
- **Personas**: Target user profiles and segments
- **Capabilities**: What the product can accomplish
- **Limitations**: Known constraints and boundaries
- **Media**: Images, videos, and visual content
- **Custom Fields**: Flexible key-value data

## 🎨 Branding

The Persona brand uses a modern, organized design system:

- **Logo**: Multi-colored component grid representing organized knowledge
- **Colors**: Professional dark theme with colorful accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: Consistent iconography throughout the interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🔮 Roadmap

- [ ] Advanced AI model customization
- [ ] Multi-language support
- [ ] Advanced analytics and insights
- [ ] Team collaboration features
- [ ] API integrations
- [ ] Enterprise security features
- [ ] Kubernetes deployment support
- [ ] Advanced MongoDB indexing and optimization
- [ ] Supabase real-time collaboration features

## 🐳 Docker Support

The project includes full Docker support for easy development and deployment:

### Development with Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild containers
docker-compose build --no-cache
```

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

---

**Powered by Persona** - Scale Your Business with AI Agent Automation
