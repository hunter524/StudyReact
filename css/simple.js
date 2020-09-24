function modifyUI() {
    try {
        document.getElementsByClassName('pageHeader')[0].style.display                   = 'none';
        document.getElementsByClassName('ui-grid-2 ui_unfold iconfont')[0].style.display = 'none';
        document.getElementsByClassName('ui-grid-6')[0].style.display                    = 'none';
        document.getElementsByClassName('ui-grid-4')[0].style.display                    = 'none';
        document.getElementById('safeButton').style.display                              = 'none';
        document.getElementsByClassName('ui-grid-10')[4].style.display                   = 'none';
        document.getElementsByTagName('ul')[1].style.display                             = 'none';

        //按钮移位
        var btnbase  = document.getElementsByClassName('ui-row-inner')[0];
        var leftbtn  = document.getElementById('openBtn');
        var rightbtn = document.getElementById('loginbtn');
        btnbase.removeChild(leftbtn.parentNode);
        rightbtn.parentNode.style.width                     = '100%';
        document.getElementById('loginbtn').style.transform = 'translateX(0px)';

        //区域设置
        document.getElementById('accounts').style.margin = '50px 0px 0px 0px';
        btnbase.parentNode.style.margin                  = '0px 0px 100px 0px';
    } catch (e) {

    }
}

window.bEvaluateLoginParams = false;

function evaluateLoginParams() {

    var accountInput = document.getElementById('codenumber');
    if (!accountInput || bEvaluateLoginParams) {
        return;
    }

    function tryEvaluate() {
        try {
            var u = "$hexin_stock_username$";
            if (u.indexOf("$hexin_stock") < 0) {
                accountInput.value    = u;
                accountInput.readOnly = true;
            }
            window.bEvaluateLoginParams = true;

        } catch (e) {

        }
    }

    setTimeout(tryEvaluate, 500);
}

function domNodeInsert() {
    modifyUI();
    evaluateLoginParams();
}

document.addEventListener("DOMNodeInserted", domNodeInsert);//监听所有页面元素变动
domNodeInsert();