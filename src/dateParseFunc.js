const dateParseFunc = (string) => {
    let date = new Date( Date.parse(string) )
    return (date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    )
}

export default dateParseFunc