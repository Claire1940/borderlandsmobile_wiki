'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  AlertTriangle,
  Anchor,
  ArrowRight,
  BarChart2,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardList,
  Download,
  ExternalLink,
  Gift,
  Hammer,
  Keyboard,
  Map,
  MessageCircle,
  Package,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Unlock,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined
  children: React.ReactNode
  className?: string
  locale: string
}) {
  if (linkData) {
    const href = locale === 'en' ? linkData.url : `/${locale}${linkData.url}`
    return (
      <Link
        href={href}
        className={`${className || ''} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  moduleLinkMap: ModuleLinkMap
  locale: string
}

export default function HomePageClient({ latestArticles, moduleLinkMap, locale }: HomePageClientProps) {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://borderlandsmobile.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "Borderlands Mobile Wiki",
        description: "Borderlands Mobile hub for iOS download steps, release date, gameplay basics, weapons, missions, and Android status for new Vault Hunters.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Borderlands Mobile - Free-to-Play iPhone Looter Shooter",
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: "Borderlands Mobile Wiki",
        alternateName: "Borderlands Mobile",
        url: siteUrl,
        description: "Borderlands Mobile Wiki resource hub for iOS download, release date, Vault Hunters, weapons, missions, and Android status guides",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Borderlands Mobile Wiki - Free-to-Play iPhone Looter Shooter",
        },
        sameAs: [
          'https://apps.apple.com/us/app/borderlands-mobile/id6756075968',
          'https://borderlands.2k.com/',
          'https://www.reddit.com/r/Borderlands/',
          'https://www.youtube.com/@BorderlandsGame',
        ],
      },
      {
        '@type': 'VideoGame',
        name: "Borderlands Mobile",
        gamePlatform: ['iOS', 'iPhone'],
        applicationCategory: 'Game',
        genre: ['Looter Shooter', 'Action RPG', 'Mobile'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 4,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: '0',
          availability: 'https://schema.org/InStock',
          url: 'https://apps.apple.com/us/app/borderlands-mobile/id6756075968',
        },
      },
    ],
  }

  // FAQ accordion states
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null)

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('beginner-guide')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://borderlands.2k.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="BZKTJiIRhwA"
              title="Borderlands Mobile | Official Overview"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'download-device-requirements', 'beginner-guide', 'summoner-class-guide', 'controls-guide',
                'borderlands-mobile-leveling-guide', 'borderlands-mobile-power-score-guide',
                'borderlands-mobile-skills-guide', 'borderlands-mobile-gear-upgrade-guide',
                'borderlands-mobile-mods-guide', 'borderlands-mobile-campaign-guide',
                'borderlands-mobile-vaughns-adventure-guide', 'borderlands-mobile-marcus-munitions-guide'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border border-border
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Download and Device Requirements */}
      <section id="download-device-requirements" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileDownloadAndDeviceRequirements.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileDownloadAndDeviceRequirements']} locale={locale}>
                {t.modules.borderlandsMobileDownloadAndDeviceRequirements.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileDownloadAndDeviceRequirements.subtitle}
            </p>
          </div>

          {/* Specs table */}
          <div className="scroll-reveal overflow-hidden rounded-xl border border-border bg-white/5">
            <div className="hidden md:grid md:grid-cols-2 gap-0">
              {t.modules.borderlandsMobileDownloadAndDeviceRequirements.items.map((item: any, i: number) => (
                <div key={i} className={`flex gap-4 px-6 py-4 border-b border-border ${i % 2 === 0 ? 'border-r' : ''} hover:bg-white/5 transition-colors`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    <Download className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:hidden divide-y divide-border">
              {t.modules.borderlandsMobileDownloadAndDeviceRequirements.items.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    <Download className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div className="flex-1 flex justify-between items-center gap-4">
                    <span className="text-xs font-semibold text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 scroll-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apps.apple.com/us/app/borderlands-mobile/id6756075968"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                         bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                         text-white font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Download on App Store
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileBeginnerGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileBeginnerGuide']} locale={locale}>
                {t.modules.borderlandsMobileBeginnerGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileBeginnerGuide.subtitle}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal relative pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 mb-10">
            {t.modules.borderlandsMobileBeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[2.2rem] w-8 h-8 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <h3 className="font-bold text-lg mb-2">
                    <LinkedTitle linkData={moduleLinkMap[`borderlandsMobileBeginnerGuide::steps::${index}`]} locale={locale}>
                      {step.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.borderlandsMobileBeginnerGuide.quickTips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 3: Summoner Class Guide */}
      <section id="summoner-class-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileSummonerClassGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileSummonerClassGuide']} locale={locale}>
                {t.modules.borderlandsMobileSummonerClassGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileSummonerClassGuide.subtitle}
            </p>
          </div>

          {/* Class cards */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.borderlandsMobileSummonerClassGuide.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.15)] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-[hsl(var(--nav-theme-light))]">
                      <LinkedTitle linkData={moduleLinkMap[`borderlandsMobileSummonerClassGuide::items::${index}`]} locale={locale}>
                        {item.title}
                      </LinkedTitle>
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Controls Guide */}
      <section id="controls-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileControlsGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileControlsGuide']} locale={locale}>
                {t.modules.borderlandsMobileControlsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileControlsGuide.subtitle}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal relative pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 mb-10">
            {t.modules.borderlandsMobileControlsGuide.steps.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[2.2rem] w-8 h-8 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <h3 className="font-bold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Keyboard className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">Controls Quick Reference</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.borderlandsMobileControlsGuide.quickTips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: Leveling Guide */}
      <section id="borderlands-mobile-leveling-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileLevelingGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileLevelingGuide']} locale={locale}>
                {t.modules.borderlandsMobileLevelingGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileLevelingGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileLevelingGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-reveal">
            {t.modules.borderlandsMobileLevelingGuide.items.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--nav-theme))] flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rewards callout */}
          <div className="mt-8 scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">Vaughn's Adventure Timers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--nav-theme-light))]" />
                <span className="text-sm"><span className="font-semibold">10 min</span> — XP &amp; Cash chest</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-sm"><span className="font-semibold">18 hr</span> — Legendary Chest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 6: Power Score Guide */}
      <section id="borderlands-mobile-power-score-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobilePowerScoreGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobilePowerScoreGuide']} locale={locale}>
                {t.modules.borderlandsMobilePowerScoreGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobilePowerScoreGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobilePowerScoreGuide.intro}
          </p>

          {/* Desktop table */}
          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)] border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">Factor</th>
                  <th className="text-left px-5 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">Value</th>
                  <th className="text-left px-5 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">Details</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.borderlandsMobilePowerScoreGuide.items.map((item: any, i: number) => (
                  <tr key={i} className={`border-b border-border hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="px-5 py-4 font-medium">{item.factor}</td>
                    <td className="px-5 py-4 text-[hsl(var(--nav-theme-light))] font-semibold">{item.value}</td>
                    <td className="px-5 py-4 text-muted-foreground">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="scroll-reveal md:hidden space-y-3">
            {t.modules.borderlandsMobilePowerScoreGuide.items.map((item: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                  <span className="font-semibold text-sm">{item.factor}</span>
                </div>
                <p className="text-[hsl(var(--nav-theme-light))] font-medium text-sm mb-1">{item.value}</p>
                <p className="text-muted-foreground text-xs">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Skills Guide */}
      <section id="borderlands-mobile-skills-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileSkillsGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileSkillsGuide']} locale={locale}>
                {t.modules.borderlandsMobileSkillsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileSkillsGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileSkillsGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal">
            {t.modules.borderlandsMobileSkillsGuide.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                {item.bullets && (
                  <ul className="space-y-1.5">
                    {item.bullets.map((bullet: string, bi: number) => (
                      <li key={bi} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Gear Upgrade Guide */}
      <section id="borderlands-mobile-gear-upgrade-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileGearUpgradeGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileGearUpgradeGuide']} locale={locale}>
                {t.modules.borderlandsMobileGearUpgradeGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileGearUpgradeGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileGearUpgradeGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-reveal mb-8">
            {t.modules.borderlandsMobileGearUpgradeGuide.items.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--nav-theme))] flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Materials checklist */}
          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Hammer className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">Upgrade Materials Quick Reference</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { gear: 'Grenades', material: 'Fillers', source: 'Missions, Rewards, scrapping Grenades' },
                { gear: 'Weapons', material: 'Components', source: 'Missions, Rewards, scrapping Gear' },
                { gear: 'Shields', material: 'Cells', source: 'Missions, Rewards, scrapping Shields' },
              ].map((row, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg border border-border">
                  <p className="font-semibold text-[hsl(var(--nav-theme-light))] mb-1">{row.gear}</p>
                  <p className="text-sm font-medium mb-1">{row.material} + Coins</p>
                  <p className="text-xs text-muted-foreground">{row.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 9: Mods Guide */}
      <section id="borderlands-mobile-mods-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileModsGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileModsGuide']} locale={locale}>
                {t.modules.borderlandsMobileModsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileModsGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileModsGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 scroll-reveal">
            {t.modules.borderlandsMobileModsGuide.items.map((item: any, index: number) => {
              const modsIcons = [Package, ClipboardList, RefreshCw, AlertTriangle, Target, BarChart2]
              const Icon = modsIcons[index % modsIcons.length]
              return (
                <div
                  key={index}
                  className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.15)] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 10: Campaign Guide */}
      <section id="borderlands-mobile-campaign-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileCampaignGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileCampaignGuide']} locale={locale}>
                {t.modules.borderlandsMobileCampaignGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileCampaignGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileCampaignGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-reveal">
            {t.modules.borderlandsMobileCampaignGuide.items.map((item: any, index: number) => (
              <details
                key={index}
                className="group p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold pr-4 text-sm">{item.question}</span>
                  <ChevronDown className="w-5 h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Module 11: Vaughn's Adventure Guide */}
      <section id="borderlands-mobile-vaughns-adventure-guide" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileVaughnsAdventureGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileVaughnsAdventureGuide']} locale={locale}>
                {t.modules.borderlandsMobileVaughnsAdventureGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileVaughnsAdventureGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileVaughnsAdventureGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 scroll-reveal">
            {t.modules.borderlandsMobileVaughnsAdventureGuide.items.map((item: any, index: number) => {
              const vaughnIcons = [Unlock, Timer, Trophy, Gift, TrendingUp, Anchor]
              const Icon = vaughnIcons[index % vaughnIcons.length]
              return (
                <div
                  key={index}
                  className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.08)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.15)] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 12: Marcus Munitions Guide */}
      <section id="borderlands-mobile-marcus-munitions-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--nav-theme-light))] mb-3">
              {t.modules.borderlandsMobileMarcusMunitionsGuide.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <LinkedTitle linkData={moduleLinkMap['borderlandsMobileMarcusMunitionsGuide']} locale={locale}>
                {t.modules.borderlandsMobileMarcusMunitionsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.borderlandsMobileMarcusMunitionsGuide.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto scroll-reveal">
            {t.modules.borderlandsMobileMarcusMunitionsGuide.intro}
          </p>

          {/* Desktop table */}
          <div className="scroll-reveal hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                <tr>
                  <th className="text-left p-4 font-semibold">Chest / Feature</th>
                  <th className="text-left p-4 font-semibold">Cost</th>
                  <th className="text-left p-4 font-semibold">Guaranteed Reward</th>
                  <th className="text-left p-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.borderlandsMobileMarcusMunitionsGuide.rows.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className={`border-t border-border ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} hover:bg-white/5 transition-colors`}
                  >
                    <td className="p-4 font-medium">{row.name}</td>
                    <td className="p-4 text-[hsl(var(--nav-theme-light))] font-medium">{row.cost}</td>
                    <td className="p-4">{row.reward}</td>
                    <td className="p-4 text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden space-y-4 scroll-reveal">
            {t.modules.borderlandsMobileMarcusMunitionsGuide.rows.map((row: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold">{row.name}</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Cost: </span>
                    <span className="text-[hsl(var(--nav-theme-light))] font-medium">{row.cost}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Reward: </span>
                    {row.reward}
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">{row.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://borderlands.2k.com/community/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/GearboxOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/Borderlands/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://apps.apple.com/us/app/borderlands-mobile/id6756075968"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
