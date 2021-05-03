import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from '../../environments/environment';

export const getAuthServiceConfigs = (): SocialAuthServiceConfig => ({
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.authProviders.google),
    },
  ],
});
