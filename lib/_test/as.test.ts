// import { AS } from '../index'

// AS()

// AS({
//   pageNo: 3,
//   eventNo: 3,
//   eventContent: {
//     name: 'hello world'
//   }
// })
import qs from 'qs'

console.log(
  qs.stringify({
    a: 1,
    b: 2,
    c: {
      name: 1,
      age: 2
    }
  })
)
