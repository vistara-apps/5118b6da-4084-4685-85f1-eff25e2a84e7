# LinguaFrame

**Context-specific translations and collaborative language learning for Farcaster**

A Base Mini App built with Next.js 15, OnchainKit, and modern Web3 technologies.

## ?? Features

- **Multi-Language Translation**: Support for 10+ languages with context-aware translations
- **Wallet Integration**: Seamless wallet connection using OnchainKit
- **Social Learning**: Built for the Farcaster ecosystem
- **Modern UI/UX**: Beautiful glassmorphic design with smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **PWA Ready**: Progressive Web App with offline capabilities

## ?? Getting Started

### Prerequisites

- Node.js 18+ and npm
- A web3 wallet (e.g., Coinbase Wallet)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## ??? Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: OnchainKit, Wagmi, Viem
- **Icons**: Lucide React
- **Chain**: Base (Coinbase L2)

## ?? Project Structure

```
/workspace
??? app/
?   ??? components/
?   ?   ??? Providers.tsx      # OnchainKit & React Query providers
?   ?   ??? ThemeProvider.tsx  # Theme management
?   ?   ??? LoadingSpinner.tsx # Reusable loading component
?   ??? globals.css            # Global styles and animations
?   ??? layout.tsx             # Root layout with metadata
?   ??? page.tsx               # Main homepage
??? public/
?   ??? icon-256x256.png       # App icon
?   ??? icon-512x512.png       # App icon (large)
?   ??? manifest.json          # PWA manifest
??? [config files]
```

## ?? UI/UX Improvements

### Key Enhancements Made:

1. **Complete Homepage Design**
   - Hero section with compelling value proposition
   - Feature showcase with interactive cards
   - Translation interface with real-time feedback
   - Professional footer

2. **Wallet Integration**
   - OnchainKit wallet components
   - Avatar and identity display
   - Seamless connection flow

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints for all screen sizes
   - Touch-friendly interactions

4. **Accessibility**
   - ARIA labels and roles
   - Keyboard navigation
   - Focus management
   - Reduced motion support

5. **Visual Polish**
   - Glassmorphic design system
   - Smooth animations and transitions
   - Custom scrollbar
   - Loading states
   - Hover effects

6. **Performance**
   - Optimized bundle size
   - Static page generation
   - Proper image handling
   - Efficient re-renders

## ?? Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

### Metadata

Update the deployment URL in:
- `app/layout.tsx` (metadataBase)
- `public/manifest.json` (external_url)

## ?? Theme & Branding

The app uses a Coinbase-inspired color scheme:

- **Primary**: #0052ff (Coinbase Blue)
- **Accent**: #1976d2 (Light Blue)
- **Background**: #0a1929 (Dark Navy)
- **Surface**: #132f4c (Navy)
- **Success**: #2e7d32 (Green)

Customize colors in `app/globals.css` (CSS variables).

## ?? Progressive Web App

The app is PWA-ready with:
- Offline support
- Install prompt
- App icons
- Splash screens
- Theme color

## ?? Testing

```bash
# Type checking
npm run type-check

# Build test
npm run build
```

## ?? Deployment

The app is deployed on Vercel:
- **Production**: https://app-5e2a84e7-s961.vercel.app

### Deploy Your Own

```bash
npm run build
```

Then deploy to Vercel, Netlify, or any Next.js-compatible platform.

## ?? Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## ?? License

This project is private and proprietary.

## ?? Links

- [GitHub Repository](https://github.com/vistara-apps/5118b6da-4084-4685-85f1-eff25e2a84e7)
- [Deployed App](https://app-5e2a84e7-s961.vercel.app)
- [OnchainKit Docs](https://onchainkit.xyz)
- [Base Network](https://base.org)

## ?? Notes

- The translation feature currently uses a mock implementation. Integrate with a real translation API for production use.
- Wallet connection requires a web3-enabled browser or wallet extension.
- The app is optimized for the Base network.

---

Built with ?? for the Farcaster community
