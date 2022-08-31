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
    //console.log(dados)
    $.ajax({
        url: '/api/v1/nova-bilhetagem',
        type: 'POST',
        data: dados,
        success: function () {

        }
    })
    setTimeout(() => {
        alert('Dados enviados com sucesso!')
        window.location.href = '/';
    }, 2000)
})

$('#bring_data').on('click', function () {
    let linha = $('#linha').val();
    let sentido = $('#sentido').val();
    let date = $('#date').val();
    if (linha == undefined || sentido == undefined) {
        alert('Selecione linha e sentido!')
    } else {
        $('tbody').empty()
        $('.spinner').html('<div class="spinner-border"></div>')
        $('.content').css('overflow', 'hidden')

        setTimeout(() => {
            $('.spinner-border').hide()
            $('.content').css('overflow', 'auto')

            $.ajax({
                url: '/api/v1/get-bilhetagem',
                type: 'POST',
                data: {
                    linha: linha,
                    sentido: sentido,
                    date: date
                },
                success: function (data) {
                    for (let i in data) {
                        let hh = data[i].programado.split(':')[0]
                        let mm = data[i].programado.split(':')[1]
                        if (hh == 24) {
                            hh = "00"
                        }
                        if (hh == 25) {
                            hh = "01"
                        }
                        if (hh == 26) {
                            hh = "02"
                        }
                        if (hh == 27) {
                            hh = "03"
                        }



                        let hora = hh + ':' + mm
                        //console.log(hora)
                        $('tbody').append(`
                    <tr>
                    <td class="hd">
                        <input type="text" placeholder="Prefixo" name="prefixo" autocomplete="off" value="${data[i].prefixo ? data[i].prefixo : ''}">
                    </td>
                    <td class="hd">
                        <input type="text" name="tabela" style="width: 60px;text-align: center;background-color: #ccc; border: none; " value="${data[i].tabela ? data[i].tabela : ''}" 
                            readonly>
                    </td>
                    <td class="hd">
                        <input type="text" name="programado" style="width: 60px;text-align: center;background-color: #ccc; border: none" value="${hora}" 
                            readonly>
                    </td>
                    <td class="hd">
                        <input type="time" placeholder="Chegada" name="hora_ini" autocomplete="off"  value="${data[i].hora_ini ?data[i].hora_ini : ''}">
                    </td>
                    <td class="hd">
                        <input type="time" placeholder="Saída" name="hora_fim" autocomplete="off"  value="${data[i].hora_fim ? data[i].hora_fim : ''}">
                    </td>
                    <td class="hd">
                        <input type="number" placeholder="Qtd. Pass." name="qtd_pax" autocomplete="off"  min="1" value="${data[i].qtd ? data[i].qtd : ''}">
                    </td>
                    <td class="hd">
                        <input type="number" placeholder="Encerrante" name="encerrante" autocomplete="off"  min="1" value="${data[i].encerrante ? data[i].encerrante : ''}">
                    </td>
                    <td class="hd">
                        <input type="text" placeholder="Observações" name="obs" autocomplete="off"  value="${data[i].obs ? data[i].obs : ''}">
                    </td>
                </tr>`)
                    }
                }
            })
        }, 500)
    }
})

$.ajax({
    url: '/api/v1/bilhetagens-disponiveis',
    type: 'GET',
    success: function (data) {
        $('#linha').append(data)
    }
})