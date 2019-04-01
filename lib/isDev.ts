const isDev = () => {
  // 旧版本脚手架
  if ((process as any).env.PACKAGE === 'production') {
    return false
  }

  // 新版本(旧版的PACKAGE变量所有环境都会存在，所以只要没有PACKAGE，就认为是新版本)
  if (!(process as any).env.PACKAGE && (process as any).env.REACT_APP_PACKAGE !== 'dev') {
    return false
  }

  return true
}

export default isDev()
