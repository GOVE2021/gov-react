import moment from 'moment';

export const getYearList = () => {
  const startYear = moment().year() - 100;
  let yearList = new Array(102).fill(0).map((k,i) => i+startYear);
  let monthList = new Array(12).fill(0).map((k,i) => i+1);
  return {
    yearList,
    monthList
  };
}
/**
 * 获取某月的日期list
 * @param {string} year 
 * @returns 
 */
export const getMonthDayList = (yearMoth) => {
  const endDay = moment(yearMoth + '-01').endOf('month').format("DD"); //某月的最后一天
  let monthList = new Array(Number(endDay)).fill(0).map((k,i) => i+1);
  return monthList;
}