var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.lengtd; i++) {
    dropdown[i].addEventListener("click", function () {
        tdis.classList.toggle("active");
        var dropdownContent = tdis.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}
const deletethis = (v) => {
    let [pai] = $(v).parent();
    let [vo] = $(pai).parent();
    $(vo).remove()
}

$('form').on('submit', (e) => {
    e.preventDefault()
    const dados = $(document.forms[0]).serialize()
    $.ajax({
        url: '/api/v1/novo-transbordo',
        type: 'POST',
        data: dados,
        success: function () {}
    })


    $('.submit').hide()
    $('.spin-footer').show()
    setTimeout(() => {

        $('.submit').show()
        $('.spin-footer').hide()
        alert('Dados salvos com sucesso!')
    }, 3000)
})

function addLine() {
    $('.content').css('overflow', 'hidden')
    $('.content').css('overflow', 'auto')
    $('tbody').append(`
    <tr>
                                <td class="hd">
                                    <a href="#" onclick="deletethis(this)"><i class="bi bi-trash-fill" style="color: #000; font-size: 24px"></i></a>
                                </td>
                                <td class="hd">
                                    <input type="text" placeholder="Prefixo" name="prefixo" autocomplete="off" value="">
                                </td>
                                <td class="hd">
                                    <input type="text" name="sentido" value="">
                                </td>
                                <td class="hd">
                                    <input type="text" name="ponto" value="">
                                </td>
                                <td class="hd">
                                    <input type="time" placeholder="Chegada" name="hora_ini" autocomplete="off"
                                        value="">
                                </td>
                                <td class="hd">
                                    <input type="time" placeholder="Saída" name="hora_fim" autocomplete="off" value="">
                                </td>
                                <td class="hd">
                                    <input type="number" placeholder="Qtd. Pass." name="qtd_pax" autocomplete="off"
                                        min="1" value="">
                                </td>

                                <td class="hd">
                                    <input type="text" placeholder="Observações" name="obs" autocomplete="off" value="">
                                </td>
                            </tr>`)
}


function imprimir() {
    document.querySelectorAll('input').forEach(input => {
        input.removeAttribute('placeholder')
    })
    printJS('table', 'html')
}

$('#download').on('click', function () {
    let date = $('#date').val()
    let sentido = $('#sentido').val()
    let linha = $('#linha').val()

    window.location.href = `/download-one?date=${date}&sentido=${sentido}&linha=${linha}`

})