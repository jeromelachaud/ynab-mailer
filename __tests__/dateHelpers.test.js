const dateHelpers = require('../lib/dateHelpers')

describe('Date Helpers functions', () => {
  describe('getYesterdaysDate', () => {
    // eslint-disable-next-line quotes
    it("should return yesterday's death", () => {
      expect(dateHelpers.getYesterdaysDate('December 17, 1995 03:24:00')).toBe(
        '1995-12-16'
      )
    })
  })

  describe('getFirstDateOfThePreviousMonth', () => {
    it('should return the first date of the previous month', () => {
      expect(
        dateHelpers.getFirstDateOfThePreviousMonth('December 17, 1995 03:24:00')
      ).toBe('1995-11-1')
    })
  })

  describe('sinceMondayOfThePreviousWeek', () => {
    it('should return the first date of the previous week', () => {
      expect(
        dateHelpers.getMondayOfThePreviousWeek('December 20, 1995 03:24:00')
      ).toBe('1995-12-11')
    })
  })
})
