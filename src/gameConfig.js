// Enhanced Game Configuration File
// Comprehensive configuration for the advanced game shell

export const gameConfig = {
  // Application Title and Branding
  title: "Game Shell",
  subtitle: "Your Ultimate Gaming Experience",
  slogan: "Play, Compete, Win",
  
  // Default Layout (1, 2, or 4 columns)
  defaultLayout: "4",
  
  // Corner Buttons Configuration
  cornerButtons: {
    topLeft: {
      type: "profile",
      icon: "user",
      action: "openProfile",
      tooltip: "Profile"
    },
    topRight: {
      type: "hamburger",
      icon: "menu",
      action: "toggleHamburgerMenu",
      tooltip: "Menu",
      menu: {
        coins: { label: "Coins", value: 1250, icon: "coins" },
        profile: { label: "Profile", action: "openProfile", icon: "user" },
        auctions: { label: "Auctions", action: "openAuctions", icon: "gavel" },
        settings: { label: "Settings", action: "openSettings", icon: "settings" },
        music: { label: "Music", action: "toggleMusic", icon: "music" },
        watchAds: { label: "Watch Ads", action: "watchAds", icon: "play-circle" }
      }
    },
    bottomLeft: {
      type: "chatbot",
      icon: "message-circle",
      action: "toggleChatbot",
      tooltip: "AI Assistant"
    },
    bottomRight: {
      type: "minislots",
      icon: "dice-6",
      action: "openMiniSlots",
      tooltip: "Mini Slots"
    }
  },
  
  // Main Menu Buttons Configuration (16 buttons)
  buttons: [
    {
      id: 1,
      label: "Live",
      description: "Join live games",
      action: "live",
      type: "modal",
      color: "bg-gradient-to-r from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700"
    },
    {
      id: 2,
      label: "Shop",
      description: "Browse game items",
      action: "shop",
      type: "modal",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      id: 3,
      label: "Auctions",
      description: "Bid on rare items",
      action: "auctions",
      type: "newWindow",
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700"
    },
    {
      id: 4,
      label: "Variations",
      description: "Game variations",
      action: "variations",
      type: "dropdown",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      dropdownItems: [
        { label: "Classic", action: "variationClassic" },
        { label: "Speed", action: "variationSpeed" },
        { label: "Tournament", action: "variationTournament" }
      ]
    },
    {
      id: 5,
      label: "Players",
      description: "Find players",
      action: "players",
      type: "dropdown",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      dropdownItems: [
        { label: "Online Players", action: "onlinePlayers" },
        { label: "Friends", action: "friends" },
        { label: "Find Players", action: "findPlayers" }
      ]
    },
    {
      id: 6,
      label: "Single Player",
      description: "Play alone",
      action: "singlePlayer",
      type: "newWindow",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700"
    },
    {
      id: 7,
      label: "Multiplayer",
      description: "Play with others",
      action: "multiplayer",
      type: "newWindow",
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
      hoverColor: "hover:from-pink-600 hover:to-pink-700"
    },
    {
      id: 8,
      label: "Campaign",
      description: "Story mode",
      action: "campaign",
      type: "newWindow",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700"
    },
    {
      id: 9,
      label: "Rules Guide",
      description: "Learn the rules",
      action: "rulesGuide",
      type: "modal",
      color: "bg-gradient-to-r from-teal-500 to-teal-600",
      hoverColor: "hover:from-teal-600 hover:to-teal-700"
    },
    {
      id: 10,
      label: "Themes",
      description: "Customize appearance",
      action: "themes",
      type: "modal",
      color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      hoverColor: "hover:from-cyan-600 hover:to-cyan-700"
    },
    {
      id: 11,
      label: "Leaderboard",
      description: "Top players",
      action: "leaderboard",
      type: "modal",
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700"
    },
    {
      id: 12,
      label: "Achievements and awards",
      description: "Your achievements",
      action: "achievements",
      type: "modal",
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      hoverColor: "hover:from-amber-600 hover:to-amber-700"
    },
    {
      id: 13,
      label: "Profile",
      description: "Your profile",
      action: "profile",
      type: "newWindow",
      color: "bg-gradient-to-r from-rose-500 to-rose-600",
      hoverColor: "hover:from-rose-600 hover:to-rose-700"
    },
    {
      id: 14,
      label: "Music",
      description: "Audio settings",
      action: "music",
      type: "modal",
      color: "bg-gradient-to-r from-violet-500 to-violet-600",
      hoverColor: "hover:from-violet-600 hover:to-violet-700"
    },
    {
      id: 15,
      label: "Settings",
      description: "Game settings",
      action: "settings",
      type: "modal",
      color: "bg-gradient-to-r from-slate-500 to-slate-600",
      hoverColor: "hover:from-slate-600 hover:to-slate-700"
    },
    {
      id: 16,
      label: "FAQ",
      description: "Frequently asked questions",
      action: "faq",
      type: "dropdown",
      color: "bg-gradient-to-r from-gray-500 to-gray-600",
      hoverColor: "hover:from-gray-600 hover:to-gray-700",
      dropdownItems: [
        { label: "Game Rules", action: "faqRules" },
        { label: "Technical Support", action: "faqTech" },
        { label: "Account Help", action: "faqAccount" }
      ]
    }
  ],
  
  // Game Actions
  actions: {
    // Corner button actions
    openProfile: () => console.log("Opening profile..."),
    toggleHamburgerMenu: () => console.log("Toggling hamburger menu..."),
    openAuctions: () => console.log("Opening auctions..."),
    openSettings: () => console.log("Opening settings..."),
    toggleMusic: () => console.log("Toggling music..."),
    watchAds: () => console.log("Opening ads..."),
    toggleChatbot: () => console.log("Toggling chatbot..."),
    openMiniSlots: () => console.log("Opening mini slots..."),
    
    // Main menu actions
    live: () => console.log("Opening live games..."),
    shop: () => console.log("Opening shop..."),
    auctions: () => window.open("/auctions", "_blank"),
    singlePlayer: () => window.open("/single-player", "_blank"),
    multiplayer: () => window.open("/multiplayer", "_blank"),
    campaign: () => window.open("/campaign", "_blank"),
    profile: () => window.open("/profile", "_blank"),
    rulesGuide: () => console.log("Opening rules guide modal..."),
    themes: () => console.log("Opening themes modal..."),
    leaderboard: () => console.log("Opening leaderboard modal..."),
    achievements: () => console.log("Opening achievements modal..."),
    music: () => console.log("Opening music modal..."),
    settings: () => console.log("Opening settings modal..."),
    
    // Dropdown actions
    variationClassic: () => console.log("Classic variation selected"),
    variationSpeed: () => console.log("Speed variation selected"),
    variationTournament: () => console.log("Tournament variation selected"),
    onlinePlayers: () => console.log("Showing online players"),
    friends: () => console.log("Showing friends"),
    findPlayers: () => console.log("Finding players"),
    faqRules: () => console.log("FAQ: Game Rules"),
    faqTech: () => console.log("FAQ: Technical Support"),
    faqAccount: () => console.log("FAQ: Account Help")
  },
  
  // Chatbot Configuration
  chatbot: {
    enabled: true,
    position: "bottom-left",
    multilingual: true,
    multimodal: true,
    defaultLanguage: "en",
    supportedLanguages: ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ko"],
    features: {
      imageUnderstanding: true,
      contextualSuggestions: true,
      gameHelp: true,
      ruleExplanations: true,
      technicalSupport: true,
      playerMatching: true
    }
  },
  
  // Footer Configuration
  footer: {
    enabled: true,
    odometer: {
      onlineNow: 0514,
      allTimeVisitors: 015014,
      animationSpeed: 1000
    },
    sections: {
      accessibility: {
        title: "ACCESSIBILITY",
        links: [
          { label: "Accessibility Options", action: "accessibilityOptions" },
          { label: "Suggestions", action: "suggestions" }
        ]
      },
      company: {
        title: "COMPANY",
        links: [
          { label: "About Us", action: "aboutUs" },
          { label: "Careers", action: "careers" },
          { label: "Press Room", action: "pressRoom" },
          { label: "Newsletter", action: "newsletter" }
        ]
      },
      competitions: {
        title: "COMPETITIONS",
        links: [
          { label: "Tournaments", action: "tournaments" },
          { label: "Registration", action: "registration" },
          { label: "Prizes", action: "prizes" },
          { label: "Awards", action: "awards" },
          { label: "Player of the Month", action: "playerOfMonth" },
          { label: "Hall of Fame", action: "hallOfFame" },
          { label: "Credits & Credibility", action: "credits" }
        ]
      },
      legal: {
        title: "LEGAL",
        links: [
          { label: "Terms of Service", action: "termsOfService" },
          { label: "Privacy Policy", action: "privacyPolicy" },
          { label: "Cookie Policy", action: "cookiePolicy" },
          { label: "Community Guidelines", action: "communityGuidelines" }
        ]
      },
      support: {
        title: "SUPPORT",
        links: [
          { label: "Contact Us", action: "contactUs" },
          { label: "Help Center", action: "helpCenter" },
          { label: "FAQs", action: "faqs" },
          { label: "Report a Bug", action: "reportBug" },
          { label: "Feature Request", action: "featureRequest" }
        ]
      }
    },
    socialMedia: {
      title: "SOCIAL MEDIA",
      links: [
        { label: "Facebook", url: "https://facebook.com", icon: "facebook" },
        { label: "Twitter", url: "https://twitter.com", icon: "twitter" },
        { label: "Instagram", url: "https://instagram.com", icon: "instagram" },
        { label: "YouTube", url: "https://youtube.com", icon: "youtube" },
        { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" }
      ]
    },
    language: {
      title: "LANGUAGE",
      current: "English",
      options: ["English", "Español", "Français", "Deutsch", "Italiano", "Português", "Русский", "中文", "日本語", "한국어"]
    },
    mobileDownloads: {
      enabled: true,
      apps: [
        { platform: "iOS", url: "https://apps.apple.com", icon: "smartphone" },
        { platform: "Android", url: "https://play.google.com", icon: "smartphone" }
      ]
    }
  },
  
  // UI Configuration
  ui: {
    showLayoutControls: true,
    buttonHeight: "h-16",
    buttonTextSize: "text-base",
    maxWidth: "max-w-6xl",
    gap: "gap-4",
    cornerButtonSize: "w-16 h-16",
    mainButtonBorderRadius: "rounded-xl"
  }
}

