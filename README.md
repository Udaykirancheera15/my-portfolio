# Portfolio Website

A modern, interactive portfolio website showcasing Blockchain/Web3, AI/ML, and Cybersecurity skills.

## Features

- **Interactive UI/UX**: Modern design with smooth animations and responsive layout
- **Muscat AI Assistant**: An AI character that can respond to voice input and provide information
- **Blockchain Integration**: Connect your Web3 wallet and interact with blockchain features
- **Speech Recognition & Synthesis**: Advanced voice processing with auto-correction
- **Cybersecurity Demonstrations**: Interactive security tools and visualizations

## Technologies Used

- React.js (with Vite)
- Web3/Ethereum (ethers.js)
- Framer Motion for animations
- AI/ML demonstrations
- Voice processing and recognition
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Web3 wallet (MetaMask, etc.) for blockchain features

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
portfolio-website/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── contexts/       # Context providers
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   └── index.jsx       # Entry point
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production-ready build.

## Customization

- Update your personal information in the components
- Add your own projects to the Projects component
- Customize the color scheme in the CSS variables
- Connect to your own AI service endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Ethers.js](https://docs.ethers.io/v5/) for Ethereum interactions
- [React Router](https://reactrouter.com/) for navigation
- [Framer Motion](https://www.framer.com/motion/) for animations
