var NoAmdModule={};

function foo() {
    $("div#bar")[0].innerText = "Set Text From No Amd Module!"
}

NoAmdModule.foo = foo;
