const trimTitle = (title) => {
  let ind = title.indexOf(".") - 1;
  return title.substring(0, ind);
};

const cleanData = (dta) => {
  let ind = dta.indexOf(")") + 1;
  return dta.substring(ind);
};



module.exports = {
    trimTitle:trimTitle,
    cleanData:cleanData,
    
}
