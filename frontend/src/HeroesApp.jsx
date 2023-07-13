import { AuthProvider } from './auth';
import { ScrollToTop } from './heroes/components';
import { AppRouter } from './router/AppRouter';

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <AppRouter /> 
    </AuthProvider>
  )
}
