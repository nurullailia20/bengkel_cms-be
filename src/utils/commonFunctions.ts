import moment from 'moment'

export const calculateAgeInMonths = (birthDate: string | Date | undefined) => {
  const currentDate = moment()
  const formattedBirthDate = moment(birthDate)
  const ageInMonths = currentDate.diff(formattedBirthDate, 'months')
  return ageInMonths
}

export const dateFormatter = (date: any, format: string = 'DD MMM YYYY') => {
  return moment(date).format(format)
}

export const getMonth = (date: Date | string) => moment(date).month()
