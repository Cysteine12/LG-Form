export default {
  times: (n, block) => {
    let accum = ''
    for (let i = 0; i < n; i++) {
      accum += block.fn(i + 1)
    }
    return accum
  },
}
