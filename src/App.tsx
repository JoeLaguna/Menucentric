
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './layouts/MainLayout';

// Pages
import { LandingPage } from './pages/LandingPage';


import { TinderModePage } from './pages/TinderModePage';
import { MenuDraftPage } from './pages/MenuDraftPage';
import { ActiveMenuPage } from './pages/ActiveMenuPage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { MealListsPage } from './pages/MealListsPage';
import { PageTransition } from './components/PageTransition';
import { PlanPreviewPage } from './pages/PlanPreviewPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <PageTransition>
            <LandingPage />
          </PageTransition>
        } />

        <Route path="/onboarding" element={<Navigate to="/tinder-mode" replace />} />

        {/* Protected/App Routes (Wrapped in MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/lists" element={
            <PageTransition>
              <MealListsPage />
            </PageTransition>
          } />
          <Route path="/home" element={
            <PageTransition>
              <ActiveMenuPage />
            </PageTransition>
          } />
          <Route path="/plan-preview" element={
            <PageTransition>
              <PlanPreviewPage />
            </PageTransition>
          } />
          <Route path="/tinder-mode" element={
            <PageTransition>
              <TinderModePage />
            </PageTransition>
          } />
          <Route path="/menu/draft" element={
            <PageTransition>
              <MenuDraftPage />
            </PageTransition>
          } />
          <Route path="/shopping-list" element={
            <PageTransition>
              <ShoppingListPage />
            </PageTransition>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AnimatedRoutes />
  )
}

export default App;
