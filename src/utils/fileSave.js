var RNFS = require('react-native-fs');
import XLSX from 'xlsx';

const exportDataToExcel = (data, fileName) => {
  // Created Sample data
  // let sample_data_to_export = [{id: '1', name: 'First User'},{ id: '2', name: 'Second User'}];
  let sample_data_to_export = data;

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
  XLSX.utils.book_append_sheet(wb, ws, 'Users');
  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

  // Write generated excel to Storage
  RNFS.writeFile(
    RNFS.ExternalStorageDirectoryPath + '/' + fileName + '.xlsx',
    wbout,
    'ascii',
  )
    .then(r => {
      console.log('Success');
    })
    .catch(e => {
      console.log('Error', e);
    });
};

module.exports = {
  exportDataToExcel,
};
