// 获取病人的pid
export const getPid = () => {
  const { pathname, hash } = window.location;
  if (hash) {
    const path_list = hash.split('/');
    return parseInt(path_list[path_list.indexOf('detail') + 1], 10);
  }
  const path_list = pathname.split('/');
  return parseInt(path_list[path_list.indexOf('detail') + 1], 10);
};
