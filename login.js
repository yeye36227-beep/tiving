// ----------------------------------------------------
// [기능 1] 탭 전환 (로그인 <=> 회원가입)
// ----------------------------------------------------
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
});

tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
});


// ----------------------------------------------------
// [기능 2] 회원가입 처리 (데이터 저장)
// ----------------------------------------------------
registerForm.addEventListener("submit", function(e) {
    e.preventDefault(); /* 새로고침 창 막음 */

    const regId = document.getElementById("reg-id").value;
    const regPw = document.getElementById("reg-pw").value;
    const regPwConfirm = document.getElementById("reg-pw-confirm").value;

    const idError = document.getElementById("reg-id-error");
    const pwError = document.getElementById("reg-pw-error");
    const confirmError = document.getElementById("reg-pw-confirm-error");

    // 에러문구 초기화
    idError.innerText = ""; pwError.innerText = ""; confirmError.innerText = "";

    let isValid = true;

    if(regId.length < 4) {
        idError.innerText = "아이디는 4자리 이상이어야 합니다.";
        isValid = false;
    }
    if(regPw.length < 6) {
        pwError.innerText = "비밀번호는 6자리 이상이어야 합니다.";
        isValid = false;
    }
    if(regPw !== regPwConfirm) {
        confirmError.innerText = "비밀번호가 일치하지 않습니다.";
        isValid = false;
    }

    if(isValid) {
        // localStorage에 회원정보 저장하기
        localStorage.setItem("savedId", regId);
        localStorage.setItem("savedPw", regPw);
        
        alert("회원가입이 완료되었습니다! 로그인해 주세요.");
        
        // 회원가입 성공 후 로그인 탭으로 강제 이동시키기
        tabLogin.click();
    }
});


// ----------------------------------------------------
// [기능 3] 로그인 처리 (가입된 데이터와 비교하기)
// ----------------------------------------------------
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const loginId = document.getElementById("login-id").value;
    const loginPw = document.getElementById("login-pw").value;

    const idError = document.getElementById("login-id-error");
    const pwError = document.getElementById("login-pw-error");

    idError.innerText = ""; pwError.innerText = "";

    // 회원가입할 때 저장했던 아이디, 비밀번호 가져오기
    const savedId = localStorage.getItem("savedId");
    const savedPw = localStorage.getItem("savedPw");

    // 만약 회원가입을 한 적이 없다면?
    if(!savedId) {
        alert("가입된 회원 정보가 없습니다. 회원가입을 먼저 해주세요.");
        return;
    }

    // 입력한 값과 저장된 값이 똑같은지 검사하기
    if(loginId !== savedId) {
        idError.innerText = "존재하지 않는 아이디입니다.";
    } else if(loginPw !== savedPw) {
        pwError.innerText = "비밀번호가 틀렸습니다.";
    } else {
        // 둘 다 맞으면 로그인 성공 증표 남기고 메인페이지로 이동!
        localStorage.setItem("isLoggedIn", "true");
        alert(`${loginId}님 환영합니다!`);
        location.href = "index.html";
    }
});