import Cookies from 'js-cookie';

export const FetchFile = (option: any) => {
  // 获取附件专用
  const headers = {
    Authorization: `Bearer ${Cookies.get('token_7')}`,
    'Content-Type': 'application/json',
  };
  window
    .fetch(option.url, {
      method: option.method ? option.method : 'GET',
      headers: headers,
      body:
        option.method && option.method.toUpperCase() == 'GET' ? null : JSON.stringify(option.data),
      dataType: option.dataType || 'json',
      credentials: 'include',
    })
    .then((response) => {
      // 这里才是下载附件逻辑处理的地方
      response.blob().then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const aElement = document.createElement('a');
        // const filename = option.record.fileName; // 设置文件名称
        aElement.href = blobUrl; // 设置a标签路径
        aElement.download = option.fileName;
        aElement.click();
        window.URL.revokeObjectURL(blobUrl);
      });
    })
    .catch((err) => {
      if (option.error && typeof option.error === 'function') {
        option.error(err);
      }
      // option.dispatch && option.dispatch({ type: 'HIDE_SPAN' })
    });
};
