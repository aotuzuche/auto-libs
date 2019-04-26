import at from 'at-js-sdk';
import qs from 'qs';
/* tslint:disable:no-magic-numbers */

const token = '_app_token_'
const openId = '_app_openId_'
const unionId = '_app_unionId_'
const virtualNo = '_app_virtualNo_'
const memNo = '_app_memNo_'

const ls = window.localStorage
const ss = window.sessionStorage

// token的操作方法
const getToken = () => ls.getItem(token)
const setToken = (e: string) => ls.setItem(token, e)
const clearToken = () => ls.removeItem(token)

// openId 操作方法
const getOpenId = () => ss.getItem(openId)
const setOpenId = (e: string) => ss.setItem(openId, e)
const clearOpenId = () => ss.removeItem(openId)

// unionId 操作方法
const getUnionId = () => ss.getItem(unionId)
const setUnionId = (e: string) => ss.setItem(unionId, e)
const clearUnionId = () => ss.removeItem(unionId)

// virtualNo 操作方法
const getVirtualNo = () => ss.getItem(virtualNo)
const setVirtualNo = (e: string) => ss.setItem(virtualNo, e)
const clearVirtualNo = () => ss.removeItem(virtualNo)

// memNo 操作方法
const getMemNo = () => ss.getItem(memNo)
const setMemNo = (e: string) => ss.setItem(memNo, e)
const clearMemNo = () => ss.removeItem(memNo)

const initToken = async (ignore?: () => boolean) => {
  if (ignore && ignore()) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    if ((window as any).isApp) {
      at.getToken({
        callback(result: {token: string}) {
          if (result.token && String(result.token).length > 20) {
            setToken(result.token)
            resolve()
          } else {
            clearToken()
            reject(new Error('token is empty'))
          }
        }
      })
    } else {
      const token = getToken()
      if (token && String(token).length > 20) {
        resolve()
      } else {
        clearToken()
        reject(new Error('token is empty'))
      }
    }
  })
}

/**
 * 跳转到登录页面
 * app: 打开原生登录模块
 * h5: 跳转到通用登录页面
 */
interface ItoLogin {
  success?: () => void
  cancel?: () => void
  isBind?: boolean
}

const toLogin = (appParams?: ItoLogin) => {
  clearToken()
  if ((window as any).isApp) {
    at.openLogin({
      success(res: any) {
        setToken(res.token)
        if (appParams && appParams.success) appParams.success()
        else window.location.reload()
      },
      cancel() {
        if (appParams && appParams.cancel) appParams.cancel()
        else at.closeWindow()
      }
    })
  } else {
    const search = {
      redirect: window.location.href
    }
    window.location.href = '/m/login/?' + qs.stringify(search)
  }
}

export {getToken, setToken, clearToken, initToken, toLogin, getOpenId, setOpenId, clearOpenId, getUnionId, setUnionId, clearUnionId, getVirtualNo, setVirtualNo, clearVirtualNo, getMemNo, setMemNo, clearMemNo}
