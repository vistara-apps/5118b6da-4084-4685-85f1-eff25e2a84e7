'use client'

import { useState } from 'react'
import { 
  Wallet, 
  ConnectWallet, 
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { 
  Avatar, 
  Name, 
  Identity, 
  Address 
} from '@coinbase/onchainkit/identity'
import { 
  Languages, 
  ArrowRight, 
  Globe, 
  Users, 
  Sparkles,
  BookOpen,
  MessageSquare,
  Copy,
  Check,
} from 'lucide-react'

export default function HomePage() {
  const [sourceText, setSourceText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!sourceText.trim()) return
    
    setIsTranslating(true)
    // Simulate translation API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setTranslatedText(`[${targetLanguage.toUpperCase()}] ${sourceText}`)
    setIsTranslating(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ko', name: 'Korean' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-surface/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
                <Languages className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LinguaFrame
                </h1>
                <p className="text-xs text-fg/60 hidden sm:block">Social Language Learning</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Wallet>
                <ConnectWallet className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                  <Avatar className="h-6 w-6" />
                  <Name className="text-sm font-medium" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 py-2 hover:bg-surface/50" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                  </Identity>
                  <WalletDropdownLink 
                    icon="wallet" 
                    href="https://keys.coinbase.com"
                  >
                    Wallet
                  </WalletDropdownLink>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Base & Farcaster</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Context-Aware Translation
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                for Social Learning
              </span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-fg/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Break language barriers in your Farcaster conversations with AI-powered translations 
              that understand context, culture, and community.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="glass-effect hover:bg-surface/80 text-fg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: Globe,
                title: 'Multi-Language Support',
                description: 'Translate between 50+ languages with cultural context awareness',
              },
              {
                icon: Users,
                title: 'Social Learning',
                description: 'Learn from community translations and improve together',
              },
              {
                icon: MessageSquare,
                title: 'Farcaster Native',
                description: 'Seamlessly integrated with your Farcaster experience',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-xl p-6 hover:bg-surface/70 transition-all hover:scale-105 group"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-fg/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Translation Interface */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Try It Now
              </h3>
              <p className="text-fg/60 text-sm sm:text-base">
                Experience instant, context-aware translations
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Source Text */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-fg/80">Your Text</label>
                    <span className="text-xs text-fg/50">English</span>
                  </div>
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="w-full h-40 sm:h-48 bg-bg/50 border border-white/10 rounded-lg p-4 text-fg placeholder:text-fg/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Translated Text */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-fg/80">Translation</label>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="text-xs bg-surface border border-white/10 rounded-md px-2 py-1 text-fg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <textarea
                      value={translatedText}
                      readOnly
                      placeholder="Translation will appear here..."
                      className="w-full h-40 sm:h-48 bg-bg/50 border border-white/10 rounded-lg p-4 text-fg placeholder:text-fg/40 resize-none"
                    />
                    {translatedText && (
                      <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-2 bg-surface/80 hover:bg-surface rounded-md transition-all"
                        title="Copy translation"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4 text-fg/60" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || isTranslating}
                  className="bg-primary hover:bg-primary/90 disabled:bg-primary/30 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg shadow-primary/20 flex items-center space-x-2 min-w-[160px] justify-center"
                >
                  {isTranslating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Translating...</span>
                    </>
                  ) : (
                    <>
                      <Languages className="w-5 h-5" />
                      <span>Translate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-12 mt-12 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5 text-primary" />
              <span className="text-sm text-fg/60">
                ? 2024 LinguaFrame. Built on Base.
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-fg/60">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Docs</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
