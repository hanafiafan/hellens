import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { LegacyHomePage } from './pages/LegacyHomePage'
const ServicesPage=lazy(()=>import('./pages/ServicesPage').then(module=>({default:module.ServicesPage})))
const WorkPage=lazy(()=>import('./pages/WorkPage').then(module=>({default:module.WorkPage})))
const AboutPage=lazy(()=>import('./pages/AboutPage').then(module=>({default:module.AboutPage})))
const ProjectPage=lazy(()=>import('./pages/ProjectPage').then(module=>({default:module.ProjectPage})))
const MorePage=lazy(()=>import('./pages/MorePage').then(module=>({default:module.MorePage})))
const PricingPage=lazy(()=>import('./pages/PricingPage').then(module=>({default:module.PricingPage})))
const PricingServiceDetailPage=lazy(()=>import('./pages/PricingServiceDetailPage').then(module=>({default:module.PricingServiceDetailPage})))
export default function App(){const location=useLocation();return <LanguageProvider><AnimatePresence mode="wait"><Suspense fallback={<div style={{minHeight:'100vh',background:'#050505'}}/>}><Routes location={location} key={location.pathname}><Route path="/" element={<LegacyHomePage/>}/><Route path="/services" element={<ServicesPage/>}/><Route path="/work" element={<WorkPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/more" element={<MorePage/>}/><Route path="/pricing" element={<PricingPage/>}/><Route path="/pricing/detail/:slug" element={<PricingServiceDetailPage/>}/><Route path="/pricing/:slug" element={<PricingServiceDetailPage/>}/><Route path="/projects/:slug" element={<ProjectPage/>}/><Route path="*" element={<LegacyHomePage/>}/></Routes></Suspense></AnimatePresence></LanguageProvider>}
