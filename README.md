# testStudio

A comprehensive React Native testing studio for mobile app UI components and interactions. This app serves as a development and QA tool for testing various mobile interface scenarios, including button interactions, scrolling behaviors, OCR simulations, and UI validation challenges.

## 🚀 Features

### Card Testing Suite
- **20+ Interactive Cards**: Test various UI elements and scenarios
- **Button Interactions**: Regular buttons, misleading buttons, lag buttons
- **Input Validation**: Multi-element validation, input variations
- **Scrolling**: Partial scroll containers, combined scroll directions
- **UI Challenges**: Flicker effects, misleading interfaces, resolution scaling

### OCR Simulation
- **Text Recognition**: Mock OCR functionality with confidence scores
- **Document Types**: Invoices, receipts, business cards
- **Multi-language Support**: English, Hindi, symbols, mixed scripts
- **Text Analysis**: Character recognition, text block extraction

### Scroll & Swipe Interactions
- **List Management**: Add, delete, select, and reorder items
- **Swipe Actions**: Swipe-to-delete, swipe-to-edit functionality
- **Dynamic Content**: Randomized list generation
- **Performance Testing**: Large list handling

### Additional Features
- **Theme System**: Consistent colors, spacing, typography
- **Navigation**: Structured flow between testing screens
- **Cross-platform**: Android and iOS support
- **TypeScript**: Full TypeScript implementation

## 📱 Screenshots

*(Add screenshots of key screens here)*

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd testStudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the App

1. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android**
   ```bash
   npm run android
   # or
   yarn android
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📖 Usage

### Navigation
The app features a structured navigation system with multiple testing categories:

- **Cards**: Access different UI testing scenarios
- **OCR**: Test optical character recognition features
- **Scroll/Swipe**: Experiment with list interactions

### Testing Scenarios
Each card represents a different testing scenario:
- Card 1-5: Basic UI interactions
- Card 6-10: Advanced interactions and validation
- Card 11-15: Performance and visual challenges
- Card 16-20: Specialized testing features

## 🏗️ Development

### Project Structure
```
testStudio/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature-specific modules
│   │   ├── cards/      # Card testing suite
│   │   ├── ocr/        # OCR simulation
│   │   └── scrollSwipe/# Scroll/swipe interactions
│   ├── navigation/     # App navigation
│   ├── theme/          # Styling and theming
│   └── utils/          # Utility functions
├── android/            # Android native code
├── ios/               # iOS native code
└── __tests__/         # Test files
```

### Key Technologies
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **Jest**: Testing framework
- **ESLint**: Code linting

### Development Scripts
```bash
# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for navigation flows
- E2E tests using Detox (if configured)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility

## 📄 License

This project is part of the mozark ecosystem. See the main project license for details.

## 🔗 Related Projects

- [mozark](https://github.com/mozark) - Main project repository
- [React Native](https://reactnative.dev/) - React Native documentation
- [React Navigation](https://reactnavigation.org/) - Navigation library

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the [troubleshooting guide](https://reactnative.dev/docs/troubleshooting)
- Review the [React Native documentation](https://reactnative.dev/docs/getting-started)

---

*Built with ❤️ using React Native**: Test optical character recognition features
- **Scroll/Swipe**: Experiment with list interactions

### Testing Scenarios
Each card represents a different testing scenario:
- Card 1-5: Basic UI interactions
- Card 6-10: Advanced interactions and validation
- Card 11-15: Performance and visual challenges
- Card 16-20: Specialized testing features

## 🏗️ Development

### Project Structure
```
testStudio/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature-specific modules
│   │   ├── cards/      # Card testing suite
│   │   ├── ocr/        # OCR simulation
│   │   └── scrollSwipe/# Scroll/swipe interactions
│   ├── navigation/     # App navigation
│   ├── theme/          # Styling and theming
│   └── utils/          # Utility functions
├── android/            # Android native code
├── ios/               # iOS native code
└── __tests__/         # Test files
```

### Key Technologies
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **Jest**: Testing framework
- **ESLint**: Code linting

### Development Scripts
```bash
# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for navigation flows
- E2E tests using Detox (if configured)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility

## 📄 License

This project is part of the mozark ecosystem. See the main project license for details.

## 🔗 Related Projects

- [mozark](https://github.com/mozark) - Main project repository
- [React Native](https://reactnative.dev/) - React Native documentation
- [React Navigation](https://reactnavigation.org/) - Navigation library

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the [troubleshooting guide](https://reactnative.dev/docs/troubleshooting)
- Review the [React Native documentation](https://reactnative.dev/docs/getting-started)

---

*Built with ❤️ using React Native*
