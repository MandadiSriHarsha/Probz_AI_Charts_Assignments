const generatedData = () => {
  const data = []
  const startDate = new Date('2023-01-01T00:00:00Z')
  for (let i = 0; i < 100; i += 1) {
    const currentDate = new Date(startDate.getTime())
    currentDate.setDate(startDate.getDate() + i)
    const timestamp = currentDate.toISOString()
    const value = Math.ceil(Math.random() * 100)
    data.push({timestamp, value})
  }
  return JSON.stringify(data)
}
export default generatedData
