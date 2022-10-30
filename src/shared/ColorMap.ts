export const getColorForTypeOfProduct = (productType?: string) => {
  switch (productType) {
    case 'cleanser':
      return 'skyblue'
    case 'cream':
      return '#20B2AA'
    case 'exfoliant':
    case 'retinol':
      return 'pink'
    case 'ointment':
      return '#5c6bc0'
    default:
      return 'grey'
  }
}
