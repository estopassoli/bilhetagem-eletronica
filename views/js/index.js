var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

const newLine = () => {
    $('tbody').append(`
<tr>
<td>
<a disabled style="font-weight: bold; " href="#" onclick="deleteThis(this)"><i class="fa-solid fa-trash-can"></i></a>
</td>
<td class="hd" scope="col">
<input type="text" name="prefixo" autocomplete="off" required>
</td>
<td class="hd" scope="col">
<input type="text" name="linha" autocomplete="off" required>
</td>
<td class="hd" scope="col">
<select name="sentido" id="" required>
<option value="" disabled selected></option>
<option value="I">TP/TS</option>
<option value="V">TS/TP</option>
</select>
</td>
<td class="hd" scope="col">
<input type="time" name="hora_previsto" autocomplete="off" required>
</td>
<td class="hd" scope="col">
<input type="time" name="hora_ini" autocomplete="off" required>
</td>
<td class="hd" scope="col">
<input type="time" name="hora_fim" autocomplete="off" required>
</td>
<td class="hd" scope="col">
<input type="number" name="qtd_pax" autocomplete="off" required min="1">
</td>
<td class="hd" scope="col">
<input type="number" name="encerrante" autocomplete="off" required>
</td>
</tr>`)
    let el = $('#content')
    el.scrollTop(1000000);
}

const deleteThis = (v) => {
    let [pai] = $(v).parent();
    let [vo] = $(pai).parent();
    $(vo).remove()
}


$('form').on('submit', (e) => {
    e.preventDefault()
    const dados = $(document.forms[0]).serialize()
    $.ajax({
        url: '/api/v1/nova-bilhetagem',
        type: 'POST',
        data: dados,
        succes: function () {

        }
    })

    setTimeout(() => {
        alert('Dados enviados com sucesso!')
        window.location.href = '/';
    }, 2000)

})