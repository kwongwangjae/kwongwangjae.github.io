let mockData = [
    {id:0, isDone:false, content:"React study", date: new Date().getTime()},
    {id:1, isDone:true, content:"친구만나기", date: new Date().getTime()},
    {id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()}
    ,
];

let day =["일","월","화","수","목","금","토"];

/* mock data 추가 */
onload = () => {
    initData(mockData);
    const today = new Date();
    document.getElementById("today").innerHTML = 
        `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`
}

const initData = (printData) => {
    const wrapper = document.getElementById("todos_wrapper");
    wrapper.innerHTML = "";
    printData.forEach(element => {
        wrapper.innerHTML += `
        <div class="TodoItem">
            <input type="checkbox"
                ${element.isDone ? "checked" : ""}
                onchange="onUpdate(${element.id})">
            <div class="content">
                ${element.content}</div>
            <div class="date">
            ${new Date(element.date).toLocaleDateString()}</div>
            <button 
                name="delBtn" value="${element.id}"
                onclick="todoDel(this)">
                삭제
            </button>
        </div>`
    });
}

/* data 추가 */
let idIndex= 3; 
document.querySelector(".Editor > button").onclick =(e) =>{
    e.preventDefault();
    let todo = document.querySelector(".Editor > input").value;
    const mock = {
        id: idIndex++,
        isDone: false,
        content: todo,
        date: new Date().getTime()
        ,
    }
    mockData.push(mock);
    initData(mockData);
}

/* checkbox 변경 */
const onUpdate = (targetId)=>{
    mockData.map(t => {
        if(t.id === targetId){
            if(t.isDone === true){
                t.isDone = false;
                return;
            } else if(t.isDone === false){
                t.isDone = true;
                return;
            }
        }
    })
    console.log(mockData);
    initData(mockData); 
}

/* data 삭제 */
const todoDel = (th)=>{
    let value = th.value;
    mockData = mockData.filter(t => 
        t.id != value);
    initData(mockData); 
}

/* 검색 */
document.querySelector("#keyword").onkeyup = (e)=>{
    let searchedTodos = getFilterData(e.target.value); 
    initData(searchedTodos);
    }

const getFilterData = (search) =>{
    if(search===""){ 
        return mockData;
    }

    return mockData.filter(t =>
        t.content.includes(search));
}