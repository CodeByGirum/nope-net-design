# NopeNet - Intrusion Detection, Reinvented

![NopeNet Logo](public/nopenet-logo.png)

NopeNet is a modern web application for network intrusion detection with an intuitive user interface. It analyzes network data to detect potential threats and attacks, providing detailed visualizations and actionable recommendations.

## Features

- **Interactive UI**: Modern, responsive design with smooth animations and transitions
- **Data Analysis**: Process network data in KDD format to identify potential threats
- **Visualization**: View attack distributions, confidence levels, and temporal patterns
- **AI-Powered Assistant**: Chat with an AI assistant for insights and recommendations
- **Real-time Processing**: Visual feedback during data processing

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful, consistent icons
- **shadcn/ui**: High-quality UI components

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/nopenet.git
   cd nopenet
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Analyzing Network Data

1. Enter your network data in KDD format in the text input or upload a CSV file
2. Click "Detect" to start the analysis
3. View the results in the detection results section
4. Chat with the AI assistant for further insights by clicking the floating assistant button

### Sample Data

You can use the "Try Sample Data" button to populate the input with sample KDD-formatted data for testing.

## Project Structure

\`\`\`
nopenet/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── floating-assistant.tsx  # AI assistant chat interface
│   ├── footer.tsx        # Footer component
│   ├── hero-section.tsx  # Hero section with data input
│   ├── results-section.tsx  # Results visualization
│   └── ui/               # UI components from shadcn/ui
├── public/               # Static assets
└── README.md             # Project documentation
\`\`\`

## Customization

### Theming

The application uses a dark theme with blue accents by default. You can customize the colors in the `tailwind.config.ts` file.

### Adding New Features

To add new features or components:

1. Create a new component in the `components` directory
2. Import and use the component in the appropriate section
3. Add any necessary state management in the parent component

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern AI interfaces
- Icons provided by [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

Built with ❤️ using Next.js and React
