/*
 * @Author: linkenzone
 * @Date: 2022-04-18 12:19:32
 * @Descripttion: Do not edit
 */
import React, { useEffect, useState } from 'react';
import style from '../style.less';

interface AnonymousType {
  useAnonymous?: any;
  originValue: string;
  anonymousValue: string;
  style?: any;
}

const Anonymous: React.FC<AnonymousType> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { useAnonymous, originValue, anonymousValue } = props;
  const [show, setShow] = useState(useAnonymous);

  useEffect(() => {
    setShow(useAnonymous);
  }, [useAnonymous]);

  return (
    <>
      {show ? (
        <span style={props.style} className={props.style ? null : style.custom_table_ellipsis}>
          {anonymousValue}
        </span>
      ) : (
        <span style={props.style} className={props.style ? null : style.custom_table_ellipsis}>
          {originValue}
        </span>
      )}
    </>
  );
};

export default Anonymous;
