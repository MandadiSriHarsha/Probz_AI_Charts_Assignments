const newDate = new Date(2024, 0, 1).toISOString()
const generatedData = () => {
  const data = []
  const startDate = new Date(newDate)
  for (let i = 0; i < 152; i += 1) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    const timestamp = currentDate.toISOString()
    const value = Math.ceil(Math.random() * 100)
    data.push({timestamp, value})
  }
  return JSON.stringify(data)
}
export default generatedData
