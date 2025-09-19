

// DOM 요소
const phoneList = document.getElementById("phoneList");
const noteList = document.getElementById("noteList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let notePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) { //data는 과일 또는 야채의 배열 -  (data, list)
  console.log(data)
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}

// 과일 출력
//이렇게 하면 2개의 작업을 동시에 하지는 못한다. (그렇기에 같이 사용할 수 있도록 묶는 것을 추천)
function filterAndSortPhones() {
    const ss = document.getElementById("sortSelect").value;
    const sb = document.getElementById("searchBox").value;

    //filter 사용 가능
    if(sb !== ""){
      let phonesD = [];
      for(let i = 0; i < phones.length; i++)
      {
        console.log(sb);
        console.log(phones[i].name.includes(sb));
        if(phones[i].name.includes(sb))
        {
          phonesD.push(phones[i]);
        }
      }
      renderProducts(phonesD, phoneList);
      return;
    }

    if(ss === "name")
    {
      phones.sort((a, b) => a.name.localeCompare(b.name, "ko", { sensitivity: "base" }));
      renderProducts(phones, phoneList);
      return;
    } else if(ss === "low")
    {
      phones.sort((a, b) => a.price - b.price);
      renderProducts(phones, phoneList);
      return;
    } else if(ss === "high")
    {
      phones.sort((a, b) => b.price - a.price);
      renderProducts(phones, phoneList);
      return;
    }

}

// 채소 출력 (3개씩 증가)
function loadNotes() {
  let count = 0;
  let maxcount = notes.length;

  return () => {
    let notesD = [];
    for(let i = 0; i < count + 3; i++){
      if(notes[i]){
        notesD.push(notes[i]);
      }
    }
    renderProducts(notesD, noteList);

    count += 3;
    if(count > maxcount - 1){
      loadMoreBtn.style.display = "none";
    }
  }
}

const load = loadNotes();

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortPhones);
sortSelect.addEventListener("change", filterAndSortPhones);
loadMoreBtn.addEventListener("click", load);

// 초기 실행
filterAndSortPhones();
load();
