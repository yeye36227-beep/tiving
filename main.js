// 1. 가상 가짜 데이터 생성
const movieData = [
    { id: 1, title: "리락쿠마", img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMjJfMjA2%2FMDAxNzYzODE3MjYzMjk3.whsdMb68A-Re1-0wc3FGK1JKwehuq72Siq3naRR-cH0g.ICT-54mUsjAhYZVmmshRmpE2M-e2xJB7eLZkhVr5a8gg.JPEG%2Foutput_1845484977.jpg&type=a340" },
    { id: 2, title: "먼가 작고 귀여운 녀석들", img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMTNfMjcy%2FMDAxNzM0MDYwMTk4ODky.dDx1TeRy2_mX1MBiYr4rINQdjd2CqcUChaL_KzNcdgYg.Toa1SH_V5MRnjMXD1PvbQcEMBY2yhNALmj86-LUn8iAg.JPEG%2F%25C4%25A1%25C0%25CC%25C4%25AB%25BF%25CD_%2528245%2529.jpg&type=a340" },
    { id: 3, title: "헬로키티", img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAzMjRfOTAg%2FMDAxNzQyODE3NjM5MTA0.U1j9v9pVSJKVTQu7w0mnQ8VPlOHnD4MjvSEeiskTnawg.coI-fp8fkzfSxZZREvKeQY_AnkSJFaYKbyNI6JvjK0Mg.JPEG%2Foutput_1731633348.jpg&type=a340" },
    
];

// 2. DOM이 로드되면 실행되는 함수
document.addEventListener("DOMContentLoaded", () => {
    renderPosters();//html 로드될때 실행, 페이지 준비완료시 실행
    checkLoginStatus();
});

// 3. 포스터를 그리드에 동적으로 삽입하는 함수
function renderPosters() {
    const grid = document.querySelector(".poster-grid");
    if(!grid) return; //그리드 없을시 종료, 오류 방지

    grid.innerHTML = movieData.map(movie => `
        <div class="poster-card" onclick="goToDetail(${movie.id})">
            <img src="${movie.img}" alt="${movie.title}">
            <div class="poster-title">${movie.title}</div>
        </div> 
    `).join(''); //문자열 하나로 합쳐줌
}

// 4. 클릭 시 상세페이지로 이동 (실제로는 어떤 아이디인지 던져줄 수 있음)
function goToDetail(id) {
    // 프로젝트 확장성을 위해 세션스토리지에 id를 임시 저장 후 이동 가능
    sessionStorage.setItem("selectedMovie", id);
    location.href = "detail.html";
}

// 5. 로그인 상태 확인 후 헤더 UI 바꾸기 
function checkLoginStatus() {
    const loginBtn = document.getElementById("login-nav-btn");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        loginBtn.innerText = "로그아웃";
        loginBtn.style.backgroundColor = "#444";
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            alert("로그아웃 되었습니다.");
            window.location.reload();
        });
    }
}