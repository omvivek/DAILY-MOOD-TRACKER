import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import LanguageContext from '../../context/LanguageContext'

import './index.css'

const emojisList = [
  {
    id: '380e6284-a454-11ec-b909-0242ac120002',
    emojiName: 'Very Happy',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-very-happy.png',
  },
  {
    id: '380e64f0-a454-11ec-b909-0242ac120002',
    emojiName: 'Happy',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-happy.png',
  },
  {
    id: '380e6626-a454-11ec-b909-0242ac120002',
    emojiName: 'Neutral',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-neutral.png',
  },
  {
    id: '380e6748-a454-11ec-b909-0242ac120002',
    emojiName: 'Sad',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-sad.png',
  },
  {
    id: '380e69c8-a454-11ec-b909-0242ac120002',
    emojiName: 'Very Sad',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-very-sad.png',
  },
]

const Reports = () => (
  <LanguageContext.Consumer>
    {value => {
      const {
        activeEmoji,
        selectedMonth,
        callLogout,
        handleMonthChange,
        daysWithDatesList,
      } = value

      const onhandleMonthChange = event => {
        handleMonthChange(event.target.value)
      }

      const emojiCounts = e => {
        let count = 0
        daysWithDatesList.forEach(month => {
          month.dates.forEach(date => {
            if (date.emojiName === e) {
              count += 1
            }
          })
        })
        return count
      }

      const selectedMonthData = daysWithDatesList.find(
        month => month.monthName === selectedMonth,
      ) || {
        dates: [],
      }

      const emojiCountss = {}
      emojisList.forEach(emoji => {
        emojiCountss[emoji.emojiName] = 0
      })

      selectedMonthData.dates.forEach(data => {
        emojiCountss[data.emojiName] += 1
      })

      const labels = Object.keys(emojiCountss)
      const counts = Object.values(emojiCountss)
      const dataList = []
      for (let i = 0; i < labels.length; i += 1) {
        const emoji = emojisList.find(
          emojifg => emojifg.emojiName === labels[i],
        )
        if (emoji) {
          dataList.push({label: emoji.emojiUrl, count: counts[i]})
        }
      }

      const CustomXAxisTick = ({x, y, payload}) => (
        <g transform={`translate(${x},${y})`}>
          <image
            xlinkHref={payload.value}
            x={-10}
            y={20}
            width={20}
            height={20}
            alt="emoji"
          />
        </g>
      )

      const DataFormatter = number => {
        if (number > 1000) {
          return `${(number / 1000).toString()}k`
        }
        return number.toString()
      }

      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        return <Redirect to="/login" />
      }

      return (
        <div className="reports-div">
          <nav className="home-nav">
            <h1 className="home-nav-h1">Daily Mood Tracker</h1>
            <div className="home-nav-div">
              <Link to="/" className="home-nav-Link">
                Home
              </Link>
              <Link to="/reports" className="home-nav-Link">
                Reports
              </Link>
              <button
                type="button"
                className="home-nav-button"
                onClick={callLogout}
              >
                Logout
              </button>
            </div>
          </nav>

          <div className="main-back">
            <p className="main-back-p">Overall Emoji Report</p>
            <ul className="main-back-ul">
              {emojisList.map(each => (
                <li key={each.id} className="main-back-li">
                  <p>{each.emojiName}</p>
                  <img
                    src={each.emojiUrl}
                    key={each.emojiName}
                    alt={each.emojiName}
                    className={
                      activeEmoji === each.emojiName ? 'active' : 'notactive'
                    }
                  />
                  <p>{emojiCounts(each.emojiName) || 0}</p>
                </li>
              ))}
            </ul>

            <div className="main-second-div">
              <p className="main-back-p ">Monthly Reports</p>
              <select
                className="main-back-select"
                value={selectedMonth}
                onChange={onhandleMonthChange}
              >
                {daysWithDatesList.map(month => (
                  <option
                    className="main-back-select"
                    key={month.monthName}
                    value={month.monthName}
                  >
                    {month.monthName}
                  </option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="92%" height={250}>
              <BarChart
                data={dataList}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis
                  dataKey="label"
                  tick={<CustomXAxisTick />}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={DataFormatter}
                  tick={{stroke: 'gray', strokeWidth: 0}}
                />
                <Legend wrapperStyle={{padding: 5}} />
                <Bar dataKey="count" fill="#FFBE38" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }}
  </LanguageContext.Consumer>
)

export default Reports
