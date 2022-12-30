import PropTypes from "prop-types";
import React from "react";

/**
 * Typechecking with PropTypes (dev 模式下如果参数类型不匹配会报错）
 * console 控制台报错，但是页面依旧可以正常展示
 * Warning: Failed prop type: Invalid prop `name` of type `number` supplied to `TypeCheckComponent`, expected `string`.
 *     at TypeCheckComponent (http://localhost:3000/static/js/bundle.js:51873:13)
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TypeCheckComponent(props) {
  return (
    <div>
      TypeCheckingComponent!
      <a>{props.name}</a>
    </div>
  );
}

TypeCheckComponent.propTypes = {
  name: PropTypes.string,
};
//prop-types 使用默认的值
TypeCheckComponent.defaultProps = {
  name: "default Name!",
};

export default TypeCheckComponent
