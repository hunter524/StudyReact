import React from "react";

function LowComponent(props) {
  return (
    <button
      onClick={function () {
        LowComponent.staticMethod("button");
      }}
    >
      I am Low Component!Name is {props.name}
    </button>
  );
}

//定义在类上的方法 而不是定义在类的内部的方法
//定义在类的{}内部的方法为对象的方法
//定义在类的引用上的方法 为类的方法
LowComponent.staticMethod = function (message) {
  alert("hello:" + message);
};

export default LowComponent;
