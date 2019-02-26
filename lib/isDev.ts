let isDev = true;
const env = (process as any).env;

if ((env.PACKAGE && env.PACKAGE === 'production') || (env.REACT_APP_PACKAGE && env.REACT_APP_PACKAGE !== 'dev')) {
  isDev = false;
}

export default isDev;
