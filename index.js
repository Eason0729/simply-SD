var list_number = 0;
var split_val = new RegExp(" ");
var split_str = " ";
function setAmount(a) {
  document.querySelector("#amount_").innerHTML = a || 0;
}
NodeList.prototype.map = Array.prototype.map;
var inp_ele = document.querySelector("#input_val");
var end_ele = document.querySelector("#end_val");
document.querySelector("#input_val").oninput = () => {
  if (split_val.test(inp_ele.value)) {
    //console.log(inp_ele.value);
    if (inp_ele.value != split_str) {
      //refresh with innerHTML
      list_number++;
      document.querySelector("#refresh_").innerHTML += `
          <span>
            <div class="thin-a alert alert-dismissible fade show" role="alert">
              <span class="value_cap">
                <cou class="count" data-n_val="${inp_ele.value}"></cou>
                第${list_number}項
                <span class="badge badge-info">${inp_ele.value}</span>
              </span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          </span>
            `;
      document.querySelector("#result_btn").innerHTML = `
        <button type="button" class="btn btn-warning" onclick="sum_all()">結算</button>
        `;
      setAmount(list_number);
    }

    //empty
    inp_ele.value = null;
  }
};
document.querySelector("#end_val").oninput = () => {
  console.log(end_ele.value);
  split_val = new RegExp(end_ele.value || " ");
  split_str = end_ele.value || " ";
};

//#mod_inp
function sum_all() {
  var arr_val = document
    .querySelectorAll(".count")
    .map((x) => x.getAttribute("data-n_val"))
    .map(parseFloat);
  var avg = arr_val.reduce((a, b) => a + b) / arr_val.length;
  var bgx = Math.sqrt(
    arr_val
      .map((x) => {
        return Math.pow(x - avg, 2);
      })
      .reduce((a, b) => a + b) / arr_val.length
  );
  document.querySelector("#mod_inp").innerHTML = `
        <p>標準差:${bgx}</p>
        <p>平均值:${avg}</p>
    `;
  $("#result_mod").modal("show");
}
//document.querySelectorAll(".count").map((x)=>(x.getAttribute('data-n_val')))
