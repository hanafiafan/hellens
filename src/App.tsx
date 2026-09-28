import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { LegacyHomePage } from './pages/LegacyHomePage'
const ProjectPage=lazy(()=>import('./pages/ProjectPage').then(module=>({default:module.ProjectPage})))
export default function App(){const location=useLocation();return <LanguageProvider><AnimatePresence mode="wait"><Suspense fallback={<div style={{minHeight:'100vh',background:'#050505'}}/>}><Routes location={location} key={location.pathname}><Route path="/" element={<LegacyHomePage/>}/><Route path="/projects/:slug" element={<ProjectPage/>}/><Route path="*" element={<LegacyHomePage/>}/></Routes></Suspense></AnimatePresence></LanguageProvider>}
