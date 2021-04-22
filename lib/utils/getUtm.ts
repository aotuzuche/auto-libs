import Cookie from 'js-cookie';

const getUtm = () => {
  const utm_source = Cookie.get('utm_source') || '';
  const utm_medium = Cookie.get('utm_medium') || '';
  const utm_campaign = Cookie.get('utm_campaign') || '';
  const utm_term = Cookie.get('utm_term') || '';

  if (utm_source) {
    return {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
    };
  }

  return void 0;
};

export default getUtm;
