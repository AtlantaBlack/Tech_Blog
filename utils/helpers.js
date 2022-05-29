module.exports = {
  format_date: (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en-GB', options);
  }
};