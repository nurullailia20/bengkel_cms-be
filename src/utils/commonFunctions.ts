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

export const convertToRupiah = (input: string) => {
  const number = parseInt(input, 10)
  if (isNaN(number)) {
    return 'Invalid number'
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}
