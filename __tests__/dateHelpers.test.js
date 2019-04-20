const dateHelpers = require('../lib/dateHelpers')

describe('Date Helpers functions', () => {
  describe('getYesterdaysDate', () => {
    it('should return the date of yesterday', async () => {
      expect(dateHelpers.getYesterdaysDate('December 17, 1995 03:24:00')).toBe(
        '1995-12-16'
      )
    })
  })

  describe('getFirstDateOfThePreviousMonth', () => {
    it('should return the first date of the previous month', async () => {
      expect(
        dateHelpers.getFirstDateOfThePreviousMonth('December 17, 1995 03:24:00')
      ).toBe('1995-11-1')
    })
  })
})
