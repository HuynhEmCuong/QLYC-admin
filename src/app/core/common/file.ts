
// Format Name file 
export function formatNameFile(fileName: string) {
    if (fileName) {
      let fileExtension = fileName.split('.').pop();
      if (fileName.length > 20) {
        fileName = fileName.slice(0, 20) + '....' + fileExtension;
      }
    }
    return fileName;
  }