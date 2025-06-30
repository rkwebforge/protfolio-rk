# RK Prasad Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fast Navigation**: Client-side routing with React Router
- **Type Safety**: Full TypeScript support with strict configuration
- **Code Quality**: ESLint, Prettier, and pre-commit hooks
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- **Accessibility**: WCAG compliant with semantic HTML
- **SEO Friendly**: Meta tags and structured data

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd prot_v2
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your information.

## 🔧 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📦 Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧪 Code Quality

### Linting

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors automatically
```

### Type Checking

```bash
npm run type-check    # Run TypeScript compiler checks
```

### Formatting

```bash
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

### Pre-commit Checks

```bash
npm run pre-commit    # Run all checks before committing
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── routes/             # Route components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── index.css           # Global styles
├── main.tsx            # Application entry point
└── App.tsx             # Main App component
```

## 🎨 Customization

### Colors

Modify the color palette in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      // ...
    }
  }
}
```

### Typography

Update fonts in `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

### Content

Update your information in:

- `.env` file for environment variables
- Component files for content
- `src/types/index.ts` for data structures

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**RK Prasad**

- Website: [Your Website](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
