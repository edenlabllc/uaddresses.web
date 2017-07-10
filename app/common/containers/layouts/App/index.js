import React from 'react';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';

export default translate()(({ children, t }) => (<div>
  <Helmet
    htmlAttributes={{ lang: 'ru', amp: undefined }} // amp takes no value
    titleTemplate="%s | UAddresses"
    defaultTitle="UAddresses"
    meta={[
      { charset: 'utf-8' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: t('OAuth2 flow, validation, proxy') },
      { name: 'description', content: t('Authentication, client and role management service. Token verification service.') },
      { property: 'og:title', content: 'UAddresses' },
      { property: 'og:site_name', content: 'UAddresses' },
      { property: 'og:description', content: t('Authentication, client and role management service. Token verification service.') },
      { name: 'apple-mobile-web-app-title', content: 'UAddresses' },
      { name: 'application-name', content: 'UAddresses' },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      { name: 'theme-color', content: '#ffffff' },
    ]}
  />
  { children }
</div>));
