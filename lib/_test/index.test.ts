import { WX, AS, http } from '../index'

WX.share()

WX.share({
  shareTitle: 'test'
})

AS({
  pageNo: 1
})

http.request({})
