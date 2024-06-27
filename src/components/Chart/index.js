import {useState, useEffect} from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
} from 'recharts'
import generatedData from '../../data/dataGenerator'
import '../../styles/chart.css'

const modifiedData = () => {
  const stringifiedData = JSON.parse(generatedData())
  const tempData = stringifiedData.map(eachitem => ({
    timestamp: new Date(eachitem.timestamp),
    value: eachitem.value,
  }))
  return tempData
}

const monthNames = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

const timeframekeys = ['Monthly', 'Weekly', 'Daily']

const chartData = modifiedData()
const availableMonths = []
chartData.forEach(eachitem => {
  const month = new Date(eachitem.timestamp)
  if (availableMonths.includes(month.getMonth()) === false) {
    availableMonths.push(month.getMonth())
  }
})
const months = availableMonths.map(eachitem => [eachitem, monthNames[eachitem]])

const ProbzAIChart = () => {
  const [defaultTimeFrame, setTimeFrame] = useState('Monthly')
  const [defaultMonth, setMonth] = useState(months[0][0])
  const [chartsData, setChartData] = useState(
    chartData.filter(
      eachitem => new Date(eachitem.timestamp).getMonth() === months[0][0],
    ),
  )

  const changeTimeFrame = event => {
    if (event.target.value === 'Monthly') {
      setTimeFrame(event.target.value)
      setMonth(months[0][0])
    } else {
      setTimeFrame(event.target.value)
    }
  }

  const changeMonth = event => {
    const number = event.target.value
    setMonth(Number(number))
  }

  useEffect(() => {
    let newChartData
    if (defaultTimeFrame === 'Weekly') {
      newChartData = chartData
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 7)
    } else if (defaultTimeFrame === 'Daily') {
      newChartData = chartData
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 2)
    } else if (defaultTimeFrame === 'Monthly') {
      newChartData = chartData
        .filter(
          eachitem => new Date(eachitem.timestamp).getMonth() === defaultMonth,
        )
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    }
    setChartData(newChartData)
  }, [defaultMonth, defaultTimeFrame])

  const formatData = receivedData => {
    let formattedData
    if (defaultTimeFrame === 'Monthly') {
      formattedData = receivedData.map(eachitem => ({
        timestamp: new Date(eachitem.timestamp).getDate(),
        value: eachitem.value,
      }))
    } else {
      formattedData = receivedData.map(eachitem => ({
        timestamp: `${new Date(eachitem.timestamp).getMonth() + 1}/${new Date(
          eachitem.timestamp,
        ).getDate()}`,
        value: eachitem.value,
      }))
    }
    return formattedData
  }

  const generateColor = check => {
    let color
    if (check === 'Monthly') {
      if (defaultMonth === 0) {
        color = '#f79605'
      } else if (defaultMonth === 1) {
        color = '#25ba37'
      } else if (defaultMonth === 2) {
        color = '#f54b07'
      } else if (defaultMonth === 3) {
        color = '#c507f5'
      } else if (defaultMonth === 4) {
        color = '#fa1414'
      }
    } else if (check === 'Daily') {
      color = '#e61074'
    } else if (check === 'Weekly') {
      color = '#0e5df0'
    }
    return color
  }

  return (
    <div className="home-page-bg-container">
      <h1 className="home-page-container-heading">Probz AI Charts</h1>
      <p className="home-page-container-description">
        Here you can view chart`s built using react recharts where the chart`s
        display`s the data of no of views in monthly or weekly or daily basis
        from January 2024 to May 2024.
      </p>
      <div className="dropdown-bg-container">
        <select onChange={changeTimeFrame} className="dropdown">
          {timeframekeys.map(eachitem => (
            <option value={eachitem} key={eachitem}>
              {eachitem}
            </option>
          ))}
        </select>
        {defaultTimeFrame === 'Monthly' && (
          <select onChange={changeMonth} className="dropdown">
            {months.map(eachitem => (
              <option value={eachitem[0]} key={eachitem[0]}>
                {eachitem[1]}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="charts-bg-container">
        <AreaChart
          width={1500}
          height={500}
          data={formatData(chartsData)}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={generateColor(defaultTimeFrame)}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={generateColor(defaultTimeFrame)}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            axisLine={{stroke: generateColor(defaultTimeFrame), strokeWidth: 2}}
            tickLine={{stroke: '#000000'}}
            tick={{fill: '#000000'}}
          />
          <YAxis
            dataKey="value"
            axisLine={{stroke: generateColor(defaultTimeFrame), strokeWidth: 2}}
            tickLine={{stroke: '#000000'}}
            tick={{fill: '#000000'}}
          />
          <CartesianGrid strokeDasharray="solid" strokeWidth="1 1" />
          <Tooltip cursor={{stroke: '#0a10c4', strokeWidth: 2}} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={generateColor(defaultTimeFrame)}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="#0a10c4"
            margin={{top: 20, left: 0, bottom: 0, right: 0}}
          />
        </AreaChart>
      </div>
    </div>
  )
}

export default ProbzAIChart
