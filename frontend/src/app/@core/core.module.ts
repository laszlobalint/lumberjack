import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { of as observableOf } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserData } from './data/users';
import { MockDataModule } from './mock/mock-data.module';
import { UserService } from './mock/users.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils';

const DATA_SERVICES = [{ provide: UserData, useClass: UserService }];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiUrl,
        token: {
          class: NbAuthJWTToken,
          key: 'access_token',
        },
        login: {
          endpoint: '/auth/login',
          method: 'post',
          redirect: {
            success: '/pages',
            failure: '/auth/login',
          },
        },
        register: false,
      }),
    ],
    forms: {
      login: {
        strategy: 'email',
        rememberMe: false,
      },
      register: {},
      validation: {
        email: {
          required: false,
        },
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    } as ModuleWithProviders;
  }
}
