import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import LanguageContext from '../../context/LanguageContext'
import './index.css'

const daysList = [
  {
    id: '3639dd44-a5d5-11ec-b909-0242ac120002',
    day: 'Sun',
    dayNumber: 1,
  },
  {
    id: '3639e17c-a5d5-11ec-b909-0242ac120002',
    day: 'Mon',
    dayNumber: 2,
  },
  {
    id: '3639e37a-a5d5-11ec-b909-0242ac120002',
    day: 'Tue',
    dayNumber: 3,
  },
  {
    id: '3639e532-a5d5-11ec-b909-0242ac120002',
    day: 'Wed',
    dayNumber: 4,
  },
  {
    id: '3639e8c0-a5d5-11ec-b909-0242ac120002',
    day: 'Thu',
    dayNumber: 5,
  },
  {
    id: '3639ea32-a5d5-11ec-b909-0242ac120002',
    day: 'Fri',
    dayNumber: 6,
  },
  {
    id: '3639eb90-a5d5-11ec-b909-0242ac120002',
    day: 'Sat',
    dayNumber: 0,
  },
]

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

const Home = () => (
  <LanguageContext.Consumer>
    {value => {
      const {
        activeEmoji,
        selectedDay,
        selectedMonthIndex,
        initialMonthsList,
        handleEmojiChange,
        createDaysWithDatesList,
        handlePreviousMonth,
        handleNextMonth,
        handleDayChange,
        calculateFilterCount,
        handleDateClick,
        callLogout,
      } = value

      const onhandleEmojiChange = emojiName => {
        handleEmojiChange(emojiName)
      }
      const onhandleDayChange = day => {
        handleDayChange(day)
      }
      const onhandleDateClick = (monthIndex, dateIndex) => {
        handleDateClick(monthIndex, dateIndex)
      }

      const currentMonth = initialMonthsList[selectedMonthIndex]
      const filterCount = calculateFilterCount()
      console.log(activeEmoji)
      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        return <Redirect to="/login" />
      }

      return (
        <div className="main-back">
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

          <div className="home-body-div">
            <h1 className="home-body-div-h1">Moods in a Month</h1>
            <div className="home-body-div-2">
              <div className="home-Calender-div">
                <div className="home-calender-heading-div">
                  <button
                    type="button"
                    onClick={handlePreviousMonth}
                    className="btn "
                    data-testid="previous-button"
                  >
                    prev
                  </button>

                  <h2>{currentMonth.monthName}</h2>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="btn "
                    data-testid="next-button"
                  >
                    next
                  </button>
                </div>
                <div className="calendar-container">
                  <div>
                    <ul className="days-header">
                      {daysList.map(day => (
                        <li key={day.id} className="day">
                          <p>{day.day}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="dates-grid">
                      {currentMonth.dates.map((dateData, dateIndex) => (
                        <li key={dateData.id} className="dates-grid-li">
                          <button
                            type="button"
                            onClick={() =>
                              onhandleDateClick(selectedMonthIndex, dateIndex)
                            }
                            className="date-btn"
                          >
                            <p>{dateData.date}</p>
                            {dateData.emojiUrl && (
                              <img
                                src={dateData.emojiUrl}
                                alt={dateData.date}
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="home-container">
                <div className="home-emojis-div">
                  <ul className="home-emojis-ul">
                    {emojisList.map(emoji => (
                      <li key={emoji.id}>
                        <p>{emoji.emojiName}</p>

                        <img
                          onClick={() => onhandleEmojiChange(emoji.emojiName)}
                          src={emoji.emojiUrl}
                          alt={emoji.emojiName}
                          className={
                            activeEmoji === emoji.emojiName
                              ? 'active'
                              : 'notactive'
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="home-filters-div">
                  <ul className="home-filters-div-ul">
                    <li>
                      <select
                        className="home-filters-select"
                        id="emojiFilter"
                        value={activeEmoji}
                        onChange={e => onhandleEmojiChange(e.target.value)}
                      >
                        {emojisList.map(emoji => (
                          <option key={emoji.id} value={emoji.emojiName}>
                            {emoji.emojiName}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li>
                      <select
                        className="home-filters-select"
                        id="dayFilter"
                        value={selectedDay}
                        onChange={e => onhandleDayChange(e.target.value)}
                      >
                        {daysList.map(day => (
                          <option key={day.id} value={day.day}>
                            {day.day}
                          </option>
                        ))}
                      </select>
                    </li>
                  </ul>
                  <h1>{filterCount}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </LanguageContext.Consumer>
)

export default Home
