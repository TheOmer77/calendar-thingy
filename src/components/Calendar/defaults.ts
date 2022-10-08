const defaults = {
  onChange: () => {
    return;
  },
  viewedMonth: [new Date().getFullYear(), new Date().getMonth()] as [
    year: number,
    month: number
  ],
  locale: 'en-US',
  yearPickerVisible: false,
};

export default defaults;
