$.ajax({
    url: '/api/v1/bilhetagens-disponiveis',
    type: 'GET',
    success: function (data) {
        $('#importado >#file').append(data)
    }
})

$.ajax({
    url: '/api/v1/bilhetagens-digitadas',
    type: 'GET',
    success: function (data) {
        $('#digitado > #file').append(data)
    }
})

$('#digitado').on('submit', function (e) {
    e.preventDefault()
    let file = $(`#digitado > #file`).val()
    $.ajax({
        url: '/api/v1/delete-digitado',
        type: 'POST',
        data: {
            file: file
        }
    })
})
$('#importado').on('submit', function (e) {
    e.preventDefault()
    let file = $(`#importado > #file`).val()
    $.ajax({
        url: '/api/v1/delete-importado',
        type: 'POST',
        data: {
            file: file
        }
    })
})