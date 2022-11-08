export const errorLogger = (message: string, data: any) => {
  console.error(message, data)
  // this would typically be writing to a logger like AWS's CloudWatch for proper Observability rather than just console logging
}

export const infoLogger = (message: string, data?: any) => {
  if (data) {
    console.log(message, data)
  } else {
    console.log(message)
  }
  // as above
}
