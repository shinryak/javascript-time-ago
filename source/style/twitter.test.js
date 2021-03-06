import twitterStyle from './twitter'
import JavascriptTimeAgo from '../JavascriptTimeAgo'
import { day, month, year } from '../gradation'

describe('"twitter" style', () =>
{
	it('should fallback from "tiny" to "narrow" for Twitter style for autogenerated locales', () =>
	{
		const timeAgo = new JavascriptTimeAgo('it')
		timeAgo.format(Date.now() - 3 * 60 * 60 * 1000, 'twitter').should.equal('3 h fa')
	})

	it('should format Twitter style relative time (English)', () =>
	{
		const timeAgo = new JavascriptTimeAgo('en')

		const now = new Date(2016, 3, 10, 22, 59).getTime()
		const elapsed = (time) => timeAgo.format(now - time * 1000, { now, ...twitterStyle })

		elapsed(0).should.equal('')
		elapsed(59.4).should.equal('')
		elapsed(59.6).should.equal('1m')
		elapsed(1.49 * 60).should.equal('1m')
		elapsed(1.51 * 60).should.equal('2m')
		elapsed(2.49 * 60).should.equal('2m')
		elapsed(2.51 * 60).should.equal('3m')
		// …
		elapsed(59.49 * 60).should.equal('59m')
		elapsed(59.51 * 60).should.equal('1h')
		elapsed(1.49 * 60 * 60).should.equal('1h')
		elapsed(1.51 * 60 * 60).should.equal('2h')
		elapsed(2.49 * 60 * 60).should.equal('2h')
		elapsed(2.51 * 60 * 60).should.equal('3h')
		// …
		elapsed(23.49 * 60 * 60).should.equal('23h')
		elapsed(day + 2 * 60 + 60 * 60).should.equal('Apr 9')
		// …
		// "month" is an approximation.
		elapsed(month * 3).should.equal('Jan 10')
		elapsed(month * 4).should.equal('Dec 11, 2015')
		elapsed(year).should.equal('Apr 11, 2015')

		// Test future dates.
		// "month" is an approximation.
		elapsed(-1 * month * 8).should.equal('Dec 10')
		elapsed(-1 * month * 9).should.equal('Jan 9, 2017')
	})

	it('should format Twitter style relative time (Russian)', () =>
	{
		const timeAgo = new JavascriptTimeAgo('ru')

		const now = new Date(2016, 3, 10, 22, 59).getTime()
		const elapsed = time => timeAgo.format(now - time * 1000, { now, ...twitterStyle })

		elapsed(0).should.equal('')
		elapsed(59.51).should.equal('1 мин')
		elapsed(59.51 * 60).should.equal('1 ч')
		elapsed(day + 62 * 60).should.equal('9 апр.')
		elapsed(year).should.equal('11 апр. 2015 г.')
	})

	it('should format Twitter style relative time (Korean)', () =>
	{
		const timeAgo = new JavascriptTimeAgo('ko')

		const now = new Date(2016, 3, 10, 22, 59).getTime()
		const elapsed = time => timeAgo.format(now - time * 1000, { now, ...twitterStyle })

		elapsed(59.51).should.equal('1분')
		elapsed(59.51 * 60).should.equal('1시간')
		elapsed(day + 62 * 60).should.equal('4월 9일')
		elapsed(year).should.equal('2015년 4월 11일')
	})

	it('should format Twitter style relative time (German)', () =>
	{
		const timeAgo = new JavascriptTimeAgo('de')

		const now = new Date(2016, 3, 10, 22, 59).getTime()
		const elapsed = time => timeAgo.format(now - time * 1000, { now, ...twitterStyle })

		elapsed(59.51).should.equal('1 Min.')
		elapsed(59.51 * 60).should.equal('1 Std.')
		elapsed(day + 62 * 60).should.equal('9. Apr.')
		elapsed(year).should.equal('11. Apr. 2015')
	})

	it('should format Twitter style relative time (French)', () =>
	{
		const timeAgo = new JavascriptTimeAgo('fr')

		const now = new Date(2016, 3, 10, 22, 59).getTime()
		const elapsed = time => timeAgo.format(now - time * 1000, { now, ...twitterStyle })

		elapsed(59.51).should.equal('1 min')
		elapsed(59.51 * 60).should.equal('1 h')
		elapsed(day + 62 * 60).should.equal('9 avr.')
		elapsed(year).should.equal('11 avr. 2015')
	})

	it('should format Twitter style relative time (Chinese)', () =>
	{
		const timeAgo = new JavascriptTimeAgo('zh')

		const now = new Date(2016, 3, 10, 22, 59).getTime()
		const elapsed = time => timeAgo.format(now - time * 1000, { now, ...twitterStyle })

		elapsed(59.51).should.equal('1分钟')
		elapsed(59.51 * 60).should.equal('1小时')
		elapsed(day + 62 * 60).should.equal('4月9日')
		elapsed(year).should.equal('2015年4月11日')
	})
})