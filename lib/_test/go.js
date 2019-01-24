import go from '../go'

const { address, pay } = go

address({
  redirectParam: 'get',
  redirectUrl: 'https://m.atzuche.com'
})

pay({
  token: '122324r34',
  orderNo: '34r34r34r34r34f3ferferv',
  payKind: '232434',
  redirect_url: 'https://m.atzuche.com'
})
